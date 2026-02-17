import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AnseMarcelContent } from "./AnseMarcelContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "anseMarcel" });

  return {
    title: t("title"),
    description: t("metaDescription"),
    keywords: t("metaKeywords"),
    alternates: {
      canonical: `/${locale}/anse-marcel`,
      languages: { fr: "/fr/anse-marcel", en: "/en/anse-marcel", es: "/es/anse-marcel" },
    },
    openGraph: {
      title: `${t("title")} | Villa Lily Blue`,
      description: t("metaDescription"),
      url: `https://villalilyblue.com/${locale}/anse-marcel`,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Villa Lily Blue - Anse Marcel, Saint Martin" }],
    },
  };
}

export default function AnseMarcelPage() {
  return <AnseMarcelContent />;
}
