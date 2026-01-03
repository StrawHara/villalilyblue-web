import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { VacationLandingContent } from "./VacationLandingContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.vacation" });

  return {
    title: t("title"),
    description: t("subtitle"),
    robots: {
      index: false, // Landing pages typically shouldn't be indexed
      follow: true,
    },
  };
}

export default function VacationLandingPage() {
  return <VacationLandingContent />;
}
