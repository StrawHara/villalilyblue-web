import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { VillaContent } from "./VillaContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "villa" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function VillaPage() {
  return <VillaContent />;
}
