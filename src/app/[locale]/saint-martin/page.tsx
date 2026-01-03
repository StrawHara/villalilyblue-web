import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SaintMartinContent } from "./SaintMartinContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "saintMartin" });

  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function SaintMartinPage() {
  return <SaintMartinContent />;
}
