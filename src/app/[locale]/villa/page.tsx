import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { VillaContent } from "./VillaContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "villa" });

  return buildPageMetadata({ locale, path: "/villa", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function VillaPage() {
  const t = useTranslations("villa");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/villa" }]} />
      <VillaContent />
    </>
  );
}
