# Audit SEO / GEO — villalilyblue.com

**Date** : 12 juillet 2026
**Périmètre** : code source (Next.js 15, fr/en/es) + site en production (https://villalilyblue.com)
**GEO** entendu au double sens : *Generative Engine Optimization* (visibilité dans ChatGPT, Perplexity, AI Overviews) **et** SEO local/géographique.
**Méthodologie** : analyse statique du code, audit de production par 16 agents parallèles (12 pages × 3 locales, infrastructure, performance, crawlers IA, navigateur Playwright), contre-vérifications manuelles systématiques, corrections appliquées puis re-vérifiées sur build local de production, et enfin **revue de code adversariale** (23 agents finders/vérificateurs) sur l'ensemble du diff — dont les constats ont eux-mêmes été corrigés.

---

## 1. Synthèse

| Axe | Avant | Après corrections | Commentaire |
|---|---|---|---|
| SEO technique | 14/20 | **18/20** | Base déjà sérieuse ; failles OG/icônes/robots/404 corrigées |
| Contenu & on-page | 16/20 | **17/20** | Contenu riche et 100 % trilingue ; alts/breadcrumbs localisés |
| SEO local | 11/20 | **13/20** | JSON-LD géo solide ; fiche Google Business et téléphone manquants |
| GEO / moteurs IA | 15/20 | **17/20** | llms.txt riche, bots IA bienvenus ; incohérences Airbnb/prix corrigées |
| Performance | 14/20 | **16/20** | TTFB 111 ms, AVIF, brotli ; cache images réparé, -740 KB d'images |
| Conformité (RGPD) | 5/20 | **5/20** | GA4 sans consentement — hors périmètre code sur ta décision, voir §8 |

Le site part d'un niveau nettement supérieur à la moyenne (métadonnées par page, hreflang, JSON-LD, sitemap, llms.txt étaient déjà en place). L'audit a surtout trouvé des **failles de cohérence** (annonce Airbnb morte dans le JSON-LD, OG incomplet, breadcrumbs non traduits) et des **manques d'infrastructure** (aucune icône, 404 anglaise, cache images à zéro, HTTP/www non redirigés).

---

## 2. Corrections appliquées dans cette session (35 fichiers modifiés, 15 créés, 1 supprimé)

### SEO technique
- **Annonce Airbnb morte dans le JSON-LD** — `sameAs` pointait `airbnb.com/rooms/1164079937498977994`, vérifiée **404 chez Airbnb**. Remplacée par l'annonce active `airbnb.fr/rooms/1313868121596013747` (titre vérifié en ligne). URL désormais centralisée dans `src/lib/site.ts` et importée partout (JsonLd, Footer, Reviews).
- **Open Graph incomplet sur toutes les pages** — chaque page redéclarait `openGraph`, ce qui écrasait le bloc du layout (Next remplace, ne fusionne pas) : `og:site_name`, `og:locale`, `og:type` étaient absents de tout le site (vérifié en prod). Nouveau helper `buildPageMetadata()` (`src/lib/seo.ts`) utilisé par les 9 pages : OG complet + carte Twitter par page (le `twitter:title` affichait le titre de la home sur toutes les sous-pages).
- **Aucun favicon / icônes / manifest** (tous en 404 en prod, erreur console sur chaque visite) — générés depuis le logo : `favicon.ico`, `icon.png` 512², `apple-icon.png` 180², manifest + icônes 192/512/maskable (`scripts/generate-icons.mjs`, réutilisable), `theme_color #3AA6B9`.
- **Règle robots morte** — `Disallow: /lp/` ne matchait jamais les vrais chemins `/fr/lp/…`. `robots.ts` génère maintenant les variantes par locale.
- **404 anglaise par défaut** — les URLs inconnues (`/fr/xyz`) servaient la 404 générique de Next en anglais au lieu du `not-found.tsx` localisé. Ajout du catch-all next-intl `[locale]/[...rest]/page.tsx` + une 404 racine (`src/app/not-found.tsx`). Vérifié : 404 française avec lien retour, statut 404 correct.
- **Breadcrumbs JSON-LD non localisés** — « La Villa », « Gallery »… étaient codés en dur quelle que soit la langue. Désormais tirés des clés `title` existantes : « The Villa » sur /en, etc.
- **`x-powered-by: Next.js`** supprimé (`poweredByHeader: false`).

### GEO / IA
- **`/.well-known/ai-plugin.json` supprimé** — manifest de plugin ChatGPT abandonné (écosystème sunset), techniquement invalide (`llms.txt` déclaré comme spec OpenAPI, `legal_info_url` en 404) et surtout il annonçait « **Rates from 350 EUR/night** » alors que le site ne publie aucun prix : risque réel de citation erronée par les moteurs IA. `llms.txt` (riche et à jour) couvre la découvrabilité.
- **JSON-LD enrichi** — type double `["LodgingBusiness","VacationRental"]` avec `containsPlace: Accommodation` (8 pers., 4 chambres, 5 SdB, 250 m² — satisfait les propriétés attendues du type VacationRental), `knowsLanguage`, `potentialAction: ReserveAction` vers `/{locale}/contact` (signale aux moteurs le parcours de réservation malgré l'absence de prix). À valider après déploiement sur https://validator.schema.org.
- **HTML sémantique** — `<time dateTime>` sur les dates d'avis, `<address>` sur les blocs contact (footer + page contact), `<article>` autour des guides Anse Marcel / Saint Martin, cartes d'avis en `<article>`.

### Localisation (impacte SEO on-page)
- **Alts d'images localisés** — une douzaine d'alts codés en dur en français s'affichaient sur /en et /es (Hero, Welcome, Location, Services, Amenities, Contact, GalleryPreview, landing pages). Nouvelles clés `imageAlts` dans les 3 fichiers messages (parité vérifiée : 292 clés identiques × 3).
- **Bug de dates des avis** — le composant Reviews recevait toujours `locale="fr"` par défaut (dates françaises sur /en, anglaises sur /es). Corrigé avec `useLocale()` + mapping `es-ES`. Vérifié : « diciembre de 2024 » sur /es.
- **Footer** — « © All rights Reserved. Design by » était en anglais sur les 3 langues → localisé.

### Performance
- **Cache des images optimisées réparé** — le header global `Cache-Control: max-age=0` s'appliquait aussi à `/_next/image` (`cf-cache-status: DYNAMIC`, vérifié en prod) : chaque visite retéléchargeait toutes les images et resollicitait l'optimiseur. Règle dédiée `max-age=2678400` (31 j) + `images.minimumCacheTTL`. Cloudflare pourra désormais servir depuis l'edge.
- **Images plage compressées** — 634 KB → 224 KB et 523 KB → 197 KB (-63 %, mozjpeg q72, dimensions inchangées 1440×1080, sauvegardes conservées). Script réutilisable `scripts/compress-images.mjs`.
- Constat positif conservé : AVIF servi (hero 51 KB au lieu de 81 KB JPEG), brotli actif, police auto-hébergée via next/font, TTFB médian **111 ms** (Cloudflare CDG).

### Outillage
- **ESLint réparé** — `npm run lint` était cassé (config flat incompatible avec eslint-config-next@15) : réécrit avec FlatCompat. 3 erreurs préexistantes corrigées au passage. Build + lint verts.
- **Corrections issues de la revue de code adversariale** : `sharp` et `@eslint/eslintrc` déclarés en devDependencies (ils n'étaient que des dépendances transitives — les scripts auraient cassé sur une installation fraîche) ; script de compression rendu **idempotent** (manifeste `scripts/.compressed-images.json` — relancer le script ne dégrade plus les images déjà compressées) ; manifest PWA `start_url: "/"` (respecte la langue du visiteur au lieu de forcer /fr) et description bilingue ; cache 31 j sur `/icons/*` ; couleur de marque centralisée (`BRAND_COLOR` dans `site.ts`) ; constantes du layout centralisées.

> ⚠️ **`scripts/generate-site-report.mjs` (préexistant, non suivi par git)** : la revue a relevé que ce script génère un PDF client contenant des affirmations fausses — une page « Tarifs » avec 4 saisons de prix et un schéma AggregateOffer qui n'existent pas sur le site (et contredisent ta règle « aucun prix affiché »), « ai-plugin.json : FAIT » (désormais supprimé), et une date de génération figée au « 17 février 2026 ». Je ne l'ai volontairement pas réécrit : à mettre à jour ou à retirer avant tout nouvel envoi du PDF à un client.

---

## 3. État de la production (constats vérifiés)

**Sain et confirmé** : sitemap 27 URLs avec hreflang complet (x-default → fr) ; hreflang présent dans le HTML de toutes les pages indexées (sérialisé `hrefLang`, valide) ; canonicals auto-référents corrects ; un seul h1 par page, localisé ; contenu 100 % rendu serveur (aucun risque de contenu invisible) ; statut 404 correct sur URL inconnue ; headers de sécurité (HSTS, XFO, nosniff, Referrer-Policy) ; Search Console vérifiée ; `/legal` et `/lp/*` correctement en noindex (15/15 requêtes vérifiées).

**À corriger côté hébergement/Cloudflare (pas du code)** — voir plan d'action :
1. **HTTP non redirigé vers HTTPS** : `http://villalilyblue.com/fr` sert le site en clair (200). Activer « Always Use HTTPS » dans Cloudflare (SSL/TLS → Edge Certificates). Critique : le HSTS ne protège pas la première visite.
2. **www non redirigé** : `https://www.villalilyblue.com` sert le site entier (contenu dupliqué, hreflang incohérents sur cet hôte). Ajouter une Redirect Rule Cloudflare `www → apex` (301).
3. La racine `/` redirige en **307** vers `/fr` (comportement next-intl standard, atténué par le x-default — non bloquant, à connaître).
4. Obfuscation e-mail Cloudflare active (`email-decode.min.js`) : l'e-mail apparaît « [email protected] » pour les crawlers sans JS. Impact faible (email en clair dans le JSON-LD et llms.txt) ; désactivable dans Scrape Shield si tu préfères.

---

## 4. SEO local (géographique)

**En place** : adresse complète (Anse Marcel, 97150, `addressCountry: MF`), coordonnées GPS dans le JSON-LD et llms.txt, 2 cartes Google intégrées (lazy), distances vers 6 points d'intérêt, 2 pages guides dédiées (Anse Marcel, Saint Martin) — un vrai plus rare.

**Manques (actions pour toi, par priorité)** :
1. **Fiche Google Business Profile** : c'est le levier local n°1 et je ne peux pas vérifier son existence depuis ici. Si absente : créer une fiche « Villa Lily Blue », catégorie *Location de villa / Vacation home rental*, adresse Anse Marcel, lien vers le site, photos (réutiliser les 31 de la galerie), et y répondre aux avis. Si existante : vérifier cohérence nom/adresse/site avec le JSON-LD.
2. **Téléphone absent** (décision confirmée : email uniquement). À savoir : un numéro (même virtuel type OVH/Ringover) renforcerait le NAP, la fiche Google Business et la confiance voyageur. Le jour venu : l'ajouter dans `site.ts`, le footer, la page contact et `telephone` du LodgingBusiness.
3. **Bing Places / Apple Business Connect** : gratuits, rapides, souvent oubliés — pertinents pour la clientèle US (Apple Maps).
4. Requêtes cibles à suivre dans Search Console : « villa anse marcel », « location villa saint martin vue mer », « luxury villa st martin french side » (et variantes EN/ES).

---

## 5. GEO — moteurs génératifs (vérifié en conditions réelles)

**Excellent socle, confirmé en prod** : GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider reçoivent tous un **200 avec le contenu complet** (82 occurrences d'« Anse Marcel » dans le HTML brut, aucun challenge Cloudflare, aucun cloaking). `robots.txt` n'exclut aucun bot IA — cohérent avec l'objectif d'être cité. `llms.txt` riche (chambres lit par lit, distances, conciergerie, contact, guide de l'île, « Contact us for rates » sans prix figé). FAQPage JSON-LD servi avec les 4 Q&R.

**Corrigé** : les deux signaux contradictoires les plus dangereux pour la citation IA (annonce Airbnb morte dans le `sameAs`, prix « 350 EUR/nuit » dans ai-plugin.json).

**Recommandations éditoriales** (aucun code requis) :
- **Étoffer la prose des guides** : ~1 460 caractères de texte principal sur /en/anse-marcel, ~1 940 sur /en/saint-martin. Sous ~2 000, les moteurs IA citent moins volontiers. Viser 3 000-4 000 caractères par guide (ajouter : meilleures périodes, météo par saison, conseils transport, 2-3 anecdotes locales).
- **Étendre la FAQ** (4 questions actuellement) : ajouter les questions que posent réellement les voyageurs — acompte/conditions, animaux, âge minimum, ménage inclus, voiture nécessaire ?, aéroport le plus pratique. La FAQ est le format le plus repris par les moteurs IA.
- **Dater/actualiser les chiffres** : « 5.0/5, 15 avis » est figé dans llms.txt et le JSON-LD, avis datés de 2024 (18 mois). Mettre à jour à chaque nouvelle salve d'avis Airbnb, sinon les IA citeront des chiffres périmés.
- À savoir : Google n'affiche **pas** d'étoiles pour les avis « self-serving » (avis sur son propre site) et le type `VacationRental` ne donne les rich results voyage qu'aux partenaires de connectivité — le balisage sert la compréhension par les moteurs et les IA, pas d'étoiles à attendre dans les SERP.

---

## 6. Contenu & on-page

**Forts** : 9 pages réelles + 2 landings, textes travaillés et intégralement traduits (fr/en/es, 292 clés en parité), titres/descriptions uniques par page et par langue dans les bonnes longueurs, mots-clés de destination présents, maillage interne propre via le composant Link localisé, 28/28 images avec alt via next/image.

**Améliorations possibles** (par impact décroissant) :
1. **Image OG unique** pour tout le site : les partages de /gallery ou /anse-marcel affichent la même image que la home. Générer une OG par page clé (le script `generate-og-image.mjs` existe déjà — le paramétrer par page).
2. **Pas de contenu frais** : aucun blog/actualités. Même 4-6 articles/an (« Que faire à Saint Martin en décembre », « Grand Case : nos 5 restaurants ») nourriraient le SEO longue traîne ET les citations IA.
3. `meta keywords` encore émise (obsolète, ignorée par Google, inoffensive) — supprimable du helper à l'occasion.
4. Landing pages `/lp/*` : canonical/hreflang hérités pointent vers la home (elles sont noindex, impact quasi nul — à nettoyer par cohérence un jour).
5. Legacy WordPress : l'ancien site avait d'autres URLs. Vérifier dans Search Console → Pages → 404 si d'anciennes URLs indexées méritent des redirections 301.

---

## 7. Performance (mesures prod du 12/07/2026)

| Mesure | Valeur | Verdict |
|---|---|---|
| TTFB médian (/fr, Cloudflare CDG) | 111 ms | ✅ excellent |
| HTML /fr sur le fil (brotli) | 19,8 KB | ✅ |
| JS premier chargement (brotli) | ~229 KB (735 KB brut, 14 chunks) | 🟡 correct pour un site vitrine animé (Framer Motion) |
| Hero AVIF | 51 KB (81 KB en JPEG) | ✅ négociation AVIF opérationnelle |
| Cache `/_next/image` | était `max-age=0` → **corrigé 31 j** | ✅ après déploiement |
| Images plage | 1 157 KB → **421 KB** | ✅ corrigé |
| PageSpeed Insights | API en quota 429 (sans clé) | à re-tester : https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fvillalilyblue.com%2Ffr |

Notes : `generateBuildId` unique par build invalide tout le cache JS à chaque déploiement — choix assumé (cache-busting), coût faible vu la fréquence de déploiement. Le srcset du logo monte inutilement à 3840px pour un affichage 48px — micro-optimisation possible via `imageSizes`, non prioritaire.

---

## 8. Conformité RGPD — le point le plus urgent hors SEO

Constaté en conditions réelles (navigateur instrumenté, première visite, aucune interaction) :
1. GA4 (`G-LE74ZXQJ68`) se charge et envoie un `page_view` avec **identifiant client persistant** à Google ;
2. deux requêtes **publicitaires** partent aussi : `stats.g.doubleclick.net` et `google.fr/ads/ga-audiences` (Google Signals/remarketing actif) — ce qui exclut l'exemption CNIL « mesure d'audience » ;
3. aucune bannière de consentement n'existe ;
4. la page légale affirme « *Aucun cookie de tracking ou publicitaire n'est utilisé* » — factuellement faux en l'état.

Tu as choisi de traiter ça hors de cette session — voici le design prêt à implémenter (≈ une demi-journée) :
- `src/lib/consent.ts` : consentement stocké en localStorage + CustomEvent ;
- `GoogleAnalytics.tsx` : ne monte les `<Script>` GA que si consentement « granted » (montage conditionnel, plus simple et plus conforme CNIL que le Consent Mode « advanced » qui envoie des pings même sans consentement) ;
- bannière `CookieConsent.tsx` trilingue (namespace `cookieConsent` dans les 3 messages), boutons Accepter/Refuser équivalents, lien vers /legal ;
- réécrire `legal.cookies` dans les 3 langues (cookies techniques + GA après consentement) ;
- en attendant : **désactiver Google Signals** dans GA4 (Admin → Collecte de données) réduit déjà le volet publicitaire.
À noter : les statistiques GA chuteront mécaniquement au trafic consentant — c'est attendu.

---

## 9. Faux positifs écartés (transparence de l'audit)

Trois alertes remontées par les agents d'audit ont été **infirmées par contre-vérification** directe :
- « Mélange de réponses en prod » (page villa servie sur /amenities, /gallery…) : sonde de 60 requêtes concurrentes sur 10 routes → **zéro** mélange, canonicals tous corrects.
- « noindex absent sur /lp/luxury » : 15/15 requêtes servent bien `noindex, follow`.
- « hreflang totalement absent du HTML » : présent partout, sérialisé `hrefLang` (camelCase React) — les greps sensibles à la casse le rataient. Valide pour Google (HTML insensible à la casse).
- Également infirmé côté code : le « titre home dupliqué » supposé (le template de titre du layout ne s'applique pas à la page du même segment — confirmé en prod).

---

## 10. Plan d'action

### ✅ Fait dans cette session (à déployer : `./deploy.sh`)
Tout le §2 — 24 fichiers modifiés/créés, build + lint verts, vérifié sur build de production local (head complet par page/locale, JSON-LD, robots, manifest, 404, cache images).

### 🔧 À faire par toi — infrastructure (≤ 30 min)
1. Cloudflare → SSL/TLS → **Always Use HTTPS : ON** (critique).
2. Cloudflare → Rules → redirect **www → apex** 301 (important).
3. Déployer, puis re-tester : `curl -I http://villalilyblue.com/fr` (attendu : 301 https) et https://validator.schema.org sur la home.

### 📍 À faire par toi — visibilité locale (1-2 h)
4. **Fiche Google Business Profile** (levier n°1) + Bing Places + Apple Business Connect.
5. Search Console : vérifier l'indexation des 27 URLs, surveiller les 404 legacy WordPress.

### ⚖️ Conformité (une demi-journée, design fourni §8)
6. Bannière de consentement + GA4 conditionnel + texte légal corrigé. En attendant : désactiver Google Signals dans GA4.

### ✍️ Éditorial (récurrent)
7. Étoffer les guides Anse Marcel / Saint Martin (>3 000 caractères) et la FAQ (8-10 questions).
8. Actualiser le compteur d'avis (llms.txt + JsonLd) à chaque salve d'avis Airbnb.
9. Optionnel : OG image par page, blog saisonnier, téléphone pour compléter le NAP.
