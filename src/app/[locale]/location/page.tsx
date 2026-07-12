import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LocationContent } from "./LocationContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "location" });

  return buildPageMetadata({ locale, path: "/location", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function LocationPage() {
  const t = useTranslations("location");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/location" }]} />
      <LocationContent />
    </>
  );
}
