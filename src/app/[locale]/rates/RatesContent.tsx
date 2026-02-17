"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Card, CardTitle, Button } from "@/components/ui";
import { motion } from "framer-motion";
import { Check, Calendar, CreditCard, Shield, Clock, Sun, Leaf, Snowflake, Star } from "lucide-react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const seasonConfig = [
  { key: "low", icon: Leaf, color: "border-green-400", badge: "bg-green-100 text-green-700" },
  { key: "mid", icon: Sun, color: "border-yellow-400", badge: "bg-yellow-100 text-yellow-700" },
  { key: "high", icon: Snowflake, color: "border-blue-400", badge: "bg-blue-100 text-blue-700" },
  { key: "peak", icon: Star, color: "border-[var(--gold)]", badge: "bg-amber-100 text-amber-700" },
] as const;

const conditionIcons = [Clock, CreditCard, Calendar, Shield];

export function RatesContent() {
  const t = useTranslations("rates");

  const conditionKeys = ["minStay", "deposit", "balance", "security"] as const;

  const aggregateOffer = {
    "@context": "https://schema.org",
    "@type": "AggregateOffer",
    priceCurrency: "EUR",
    lowPrice: "350",
    highPrice: "550",
    offerCount: "4",
    offers: [
      {
        "@type": "Offer",
        name: "Low Season",
        description: "May - October",
        price: "350",
        priceCurrency: "EUR",
        unitText: "per night",
      },
      {
        "@type": "Offer",
        name: "Mid Season",
        description: "November - Mid-December",
        price: "450",
        priceCurrency: "EUR",
        unitText: "per night",
      },
      {
        "@type": "Offer",
        name: "High Season",
        description: "Mid-December - April",
        price: "550",
        priceCurrency: "EUR",
        unitText: "per night",
      },
      {
        "@type": "Offer",
        name: "Holiday Season",
        description: "December 20 - January 5",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/LimitedAvailability",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOffer) }}
      />
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg"
            alt="Villa Lily Blue"
            fill
            priority
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsKDA4QDQwNEA4YExERExgcGBYYHCIhIR4dHx8fHx//2wBDAQMEBAUEBQkFBQkfDQsNHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcI/8QAIhAAAQQBBAMBAAAAAAAAAAAAAQIDBAUABhESITFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADB//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRITFB/9oADAMBAAIRAxEAPwCW6Y1fYadtGaW8gW8W1lkCTFaUXChwA2yobcSSB3jS3xLZ1GtbulEWZe3Fk9GjKLaZEt1xKVEDkQCdtwOzgYxlKtYHshTuTU52f/Z"
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>

        <div className="relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-6xl">{t("title")}</h1>
            <p className="text-lg text-white/90 sm:text-xl md:text-2xl">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Season Rates */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {seasonConfig.map(({ key, icon: Icon, color, badge }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card hover className={`h-full border-t-4 ${color}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${badge}`}>
                      {t(`seasons.${key}.name`)}
                    </div>
                    <Icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mb-2 text-sm text-gray-500">{t(`seasons.${key}.period`)}</p>
                  <p className="text-2xl font-bold text-[var(--secondary)]">
                    {t(`seasons.${key}.price`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Includes & Conditions */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Rate Includes */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardTitle className="mb-6">{t("includes.title")}</CardTitle>
                <ul className="space-y-3">
                  {(t.raw("includes.items") as string[]).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)]/10">
                        <Check className="h-3.5 w-3.5 text-[var(--primary)]" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Conditions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardTitle className="mb-6">{t("conditions.title")}</CardTitle>
                <ul className="space-y-4">
                  {conditionKeys.map((key, idx) => {
                    const CondIcon = conditionIcons[idx];
                    return (
                      <li key={key} className="flex items-start gap-3 text-gray-600">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--secondary)]/5">
                          <CondIcon className="h-4 w-4 text-[var(--secondary)]" />
                        </div>
                        <span>{t(`conditions.${key}`)}</span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-[var(--secondary)] sm:text-3xl">
              {t("cta")}
            </h2>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact" onClick={() => trackEvent("click", "CTA", "rates_page_contact")}>
                <Button size="lg">{t("cta")}</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
