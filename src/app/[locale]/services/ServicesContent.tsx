"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Card, CardTitle, CardDescription, Button } from "@/components/ui";
import { motion } from "framer-motion";
import {
  Sparkles,
  ChefHat,
  Baby,
  Car,
  Compass,
  Heart,
  ShoppingBag,
  PartyPopper,
  Check,
} from "lucide-react";
import Image from "next/image";

const categoryConfig = [
  { key: "housekeeping", icon: Sparkles, color: "bg-blue-500" },
  { key: "chef", icon: ChefHat, color: "bg-orange-500" },
  { key: "childcare", icon: Baby, color: "bg-pink-500" },
  { key: "transport", icon: Car, color: "bg-green-500" },
  { key: "excursions", icon: Compass, color: "bg-cyan-500" },
  { key: "wellness", icon: Heart, color: "bg-purple-500" },
  { key: "provisions", icon: ShoppingBag, color: "bg-yellow-500" },
  { key: "events", icon: PartyPopper, color: "bg-red-500" },
] as const;

export function ServicesContent() {
  const t = useTranslations("services");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-living-room-01.jpg"
            alt="Services de Conciergerie"
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
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("title")}</h1>
            <p className="text-xl text-white/90 md:text-2xl">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-[var(--secondary)]">
              {t("intro.title")}
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {t("intro.description")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {categoryConfig.map(({ key, icon: Icon, color }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card hover className="h-full">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="mb-2">
                    {t(`categories.${key}.title`)}
                  </CardTitle>
                  <CardDescription className="mb-4">
                    {t(`categories.${key}.description`)}
                  </CardDescription>
                  <ul className="space-y-2">
                    {(t.raw(`categories.${key}.items`) as string[]).map(
                      (item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-[var(--secondary)]">
              {t("cta.title")}
            </h2>
            <p className="mb-8 text-lg text-gray-600">{t("cta.description")}</p>
            <Link href="/contact">
              <Button size="lg">{t("cta.button")}</Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
