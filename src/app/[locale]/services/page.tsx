import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesContent } from "./ServicesContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}/services`,
      languages: { fr: "/fr/services", en: "/en/services", es: "/es/services" },
    },
    openGraph: {
      title: `${t("title")} | Villa Lily Blue`,
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}/services`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
