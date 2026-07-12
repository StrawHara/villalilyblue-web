import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { SaintMartinContent } from "./SaintMartinContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "saintMartin" });

  return buildPageMetadata({ locale, path: "/saint-martin", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function SaintMartinPage() {
  const t = useTranslations("saintMartin");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/saint-martin" }]} />
      <SaintMartinContent />
    </>
  );
}
