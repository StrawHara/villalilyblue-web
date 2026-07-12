import type { Metadata } from "next";
import { OG_IMAGE, OG_LOCALES, SITE_NAME, SITE_URL } from "./site";

interface PageMetadataOptions {
  locale: string;
  /** Chemin de la route sans préfixe de locale (ex: "/villa"), "" pour la home */
  path?: string;
  title: string;
  description?: string;
  keywords?: string;
  /** true pour la home : le titre contient déjà la marque, on court-circuite le template du layout */
  titleAbsolute?: boolean;
}

export function buildPageMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  titleAbsolute = false,
}: PageMetadataOptions): Metadata {
  const ogTitle = titleAbsolute ? title : `${title} | ${SITE_NAME}`;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        fr: `/fr${path}`,
        en: `/en${path}`,
        es: `/es${path}`,
        "x-default": `/fr${path}`,
      },
    },
    openGraph: {
      title: ogTitle,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      locale: OG_LOCALES[locale] ?? "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
