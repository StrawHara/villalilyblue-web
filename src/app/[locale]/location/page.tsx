import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LocationContent } from "./LocationContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "location" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function LocationPage() {
  return <LocationContent />;
}
