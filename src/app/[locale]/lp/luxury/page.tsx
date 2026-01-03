import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LuxuryLandingContent } from "./LuxuryLandingContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.luxury" });

  return {
    title: t("title"),
    description: t("subtitle"),
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LuxuryLandingPage() {
  return <LuxuryLandingContent />;
}
