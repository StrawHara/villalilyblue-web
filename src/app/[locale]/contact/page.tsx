import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactContent } from "./ContactContent";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return buildPageMetadata({ locale, path: "/contact", title: t("title"), description: t("metaDescription"), keywords: t("metaKeywords") });
}

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: t("title"), path: "/contact" }]} />
      <FaqJsonLd />
      <ContactContent />
    </>
  );
}
