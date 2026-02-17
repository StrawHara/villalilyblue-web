import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero, Highlights, Welcome, GalleryPreview, CallToAction } from "@/components/sections";
import { Reviews } from "@/components/sections/Reviews";
import { JsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const meta = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: meta("title"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: "/fr",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title: meta("title"),
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Welcome />
      <Highlights />
      <GalleryPreview />
      <Reviews />
      <CallToAction />
    </>
  );
}
