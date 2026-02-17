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
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}/saint-martin`,
      languages: { fr: "/fr/saint-martin", en: "/en/saint-martin", es: "/es/saint-martin" },
    },
    openGraph: {
      title: `${t("title")} | Villa Lily Blue`,
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}/saint-martin`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function SaintMartinPage() {
  return <SaintMartinContent />;
}
