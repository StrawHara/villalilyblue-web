import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { AnseMarcelContent } from "./AnseMarcelContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "anseMarcel" });

  return buildPageMetadata({ locale, path: "/anse-marcel", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function AnseMarcelPage() {
  const t = useTranslations("anseMarcel");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/anse-marcel" }]} />
      <AnseMarcelContent />
    </>
  );
}
