import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { GalleryContent } from "./GalleryContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return buildPageMetadata({ locale, path: "/gallery", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/gallery" }]} />
      <GalleryContent />
    </>
  );
}
