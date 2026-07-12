import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ServicesContent } from "./ServicesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return buildPageMetadata({ locale, path: "/services", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/services" }]} />
      <ServicesContent />
    </>
  );
}
