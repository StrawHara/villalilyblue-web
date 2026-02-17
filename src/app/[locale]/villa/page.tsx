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
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}/villa`,
      languages: { fr: "/fr/villa", en: "/en/villa", es: "/es/villa" },
    },
    openGraph: {
      title: `${t("title")} | Villa Lily Blue`,
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}/villa`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function VillaPage() {
  return <VillaContent />;
}
