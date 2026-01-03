import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GalleryContent } from "./GalleryContent";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function GalleryPage() {
  return <GalleryContent />;
}
