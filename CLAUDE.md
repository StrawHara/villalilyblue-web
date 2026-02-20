# Villa Lily Blue - Website

## Project Overview

Luxury vacation villa rental website for **Villa Lily Blue** in Anse Marcel, Saint Martin (French Caribbean). Built with Next.js 15 (App Router) and deployed via Docker on a VPS.

- **URL**: https://villalilyblue.com
- **Stack**: Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion
- **i18n**: next-intl with 3 locales (fr, en, es), `localePrefix: "always"`
- **Deployment**: Docker (standalone output), `./deploy.sh` on VPS
- **SMTP**: OVH (`ssl0.ovh.net:465`) via nodemailer

## Architecture

```
src/
├── app/[locale]/           # Pages (9 pages x 3 locales)
│   ├── layout.tsx          # Root layout (metadata, providers, Header/Footer/FloatingCTA)
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # Custom 404
│   ├── villa/              # Villa description
│   ├── amenities/          # Amenities & equipment
│   ├── gallery/            # Photo gallery (30 images, lightbox)
│   ├── location/           # Location & distances
│   ├── services/           # Concierge services (7 categories)
│   ├── contact/            # Contact form + FAQ
│   ├── anse-marcel/        # Anse Marcel guide
│   ├── saint-martin/       # Saint Martin guide
│   └── lp/                 # Landing pages (vacation, luxury)
├── app/api/contact/        # POST endpoint (rate limited, sends emails)
├── components/
│   ├── layout/             # Header, Footer, FloatingCTA
│   ├── sections/           # Hero, Reviews, GalleryPreview, CallToAction, Welcome
│   ├── forms/              # ContactForm (react-hook-form + zod)
│   ├── seo/                # JsonLd (LodgingBusiness, FAQ, Breadcrumb, Reviews)
│   ├── analytics/          # GoogleAnalytics (GA4)
│   └── ui/                 # Button, Card, Input, Textarea, Container
├── lib/
│   ├── email.ts            # Nodemailer SMTP (multilingual confirmation emails)
│   ├── analytics.ts        # trackEvent() helper for GA events
│   ├── rate-limit.ts       # In-memory rate limiter (5 req / 15 min per IP)
│   └── validations/        # Zod schemas
├── i18n/                   # next-intl routing & navigation
└── messages/               # fr.json, en.json, es.json
```

## Key Conventions

- **All page components** are in `[locale]/pageName/PageNameContent.tsx` (client component) + `page.tsx` (server, exports `generateMetadata`)
- **Every page** has `generateMetadata` with title, description, keywords, canonical, hreflang alternates, and openGraph
- **Translations**: Each page namespace has `metaDescription` and `metaKeywords` keys in all 3 JSON files
- **Images**: Use Next.js `<Image>` with `fill`, `quality={75}`, `placeholder="blur"`, and `blurDataURL` for hero images
- **Tracking**: Use `trackEvent(action, category, label)` from `@/lib/analytics` on CTAs, outbound links, form submissions
- **Client components** must have `"use client"` directive if using onClick, useState, useEffect, etc.
- **No pricing** displayed anywhere on the site - visitors contact for a personalized quote
- **Footer**: 12-column grid layout with 5 sections (Logo, Menu, Quick Links, Contact, Follow Us)

## Environment Variables (.env.local)

```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=contact@villalilyblue.com
SMTP_PASSWORD=<password>
SMTP_FROM=Villa Lily Blue <contact@villalilyblue.com>
SMTP_TO=contact@villalilyblue.com
NEXT_PUBLIC_GA_ID=G-LE74ZXQJ68
```

## SEO & Structured Data

- **JSON-LD schemas**: LodgingBusiness, AggregateRating (5.0/5, 15 reviews), 6 individual Reviews, FAQPage, BreadcrumbList, AggregateOffer
- **LLM discoverability**: `public/llms.txt` + `public/.well-known/ai-plugin.json`
- **Redirects**: `/rooms` → `/villa` (301)
- **Security headers**: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

## Common Commands

```bash
npm run dev          # Dev server
npm run build        # Production build
./deploy.sh          # Deploy to VPS (Docker)
node scripts/generate-og-image.mjs       # Regenerate OG image
node scripts/generate-ads-report.mjs     # Google Ads PDF report
node scripts/generate-site-report.mjs    # Site features PDF report
```

## Known Issues / TODO

- Cookie consent banner needed (GA uses tracking cookies but site text says "no tracking cookies")
- No WhatsApp integration yet
