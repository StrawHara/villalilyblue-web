import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "../globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

type Locale = (typeof routing.locales)[number];

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | Villa Lily Blue`,
    },
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL("https://villalilyblue.com"),
    alternates: {
      canonical: "/",
      languages: {
        fr: "/fr",
        en: "/en",
        es: "/es",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://villalilyblue.com",
      siteName: "Villa Lily Blue",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Villa Lily Blue - Anse Marcel, Saint Martin",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={geist.variable}>
      <body className="min-h-screen bg-[var(--background)] antialiased">
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
