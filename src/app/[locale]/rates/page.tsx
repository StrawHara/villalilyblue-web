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
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}/rates`,
      languages: { fr: "/fr/rates", en: "/en/rates", es: "/es/rates" },
    },
    openGraph: {
      title: `${t("title")} | Villa Lily Blue`,
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}/rates`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function RatesPage() {
  return <RatesContent />;
}
