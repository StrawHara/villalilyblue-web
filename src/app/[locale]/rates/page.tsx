import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { RatesContent } from "./RatesContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "rates" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function RatesPage() {
  return <RatesContent />;
}
