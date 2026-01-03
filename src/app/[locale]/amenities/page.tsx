import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AmenitiesContent } from "./AmenitiesContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "amenities" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function AmenitiesPage() {
  return <AmenitiesContent />;
}
