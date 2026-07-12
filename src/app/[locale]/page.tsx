import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero, Highlights, Welcome, GalleryPreview, CallToAction } from "@/components/sections";
import { Reviews } from "@/components/sections/Reviews";
import { JsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const meta = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({ locale, path: "", title: meta("title"), description: t("metaDescription"), keywords: t("metaKeywords"), titleAbsolute: true });
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <BreadcrumbJsonLd items={[]} />
      <Hero />
      <Welcome />
      <Highlights />
      <GalleryPreview />
      <Reviews />
      <CallToAction />
    </>
  );
}
