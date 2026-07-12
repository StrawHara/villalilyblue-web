import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AmenitiesContent } from "./AmenitiesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "amenities" });

  return buildPageMetadata({ locale, path: "/amenities", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function AmenitiesPage() {
  const t = useTranslations("amenities");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/amenities" }]} />
      <AmenitiesContent />
    </>
  );
}
