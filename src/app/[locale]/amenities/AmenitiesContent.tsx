"use client";

import { useTranslations } from "next-intl";
import { Container, Card, CardTitle } from "@/components/ui";
import { motion } from "framer-motion";
import { Waves, ChefHat, Sparkles, ConciergeBell, Check } from "lucide-react";
import Image from "next/image";

const categories = [
  { key: "pool", icon: Waves },
  { key: "kitchen", icon: ChefHat },
  { key: "comfort", icon: Sparkles },
  { key: "services", icon: ConciergeBell },
] as const;

export function AmenitiesContent() {
  const t = useTranslations("amenities");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-swimming-pool-01.jpeg"
            alt="Équipements Villa Lily Blue"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
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

      {/* Amenities Grid */}
      <section className="py-24">
        <Container>
          <h2 className="sr-only">{t("subtitle")}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {categories.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Icon className="h-6 w-6 text-[var(--primary)]" />
                    </div>
                    <CardTitle>{t(`categories.${key}.title`)}</CardTitle>
                  </div>
                  <ul className="space-y-3">
                    {(
                      t.raw(`categories.${key}.items`) as string[]
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <Check className="h-4 w-4 text-[var(--primary)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Images Section */}
      <section className="bg-gray-50 py-24">
        <Container>
          <h2 className="sr-only">{t("title")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {([
              { src: "/images/villa_lily_blue-sxm_photo-kitchen.jpg", altKey: "kitchen" },
              { src: "/images/villa_lily_blue-sxm_photo-fitness-room.jpeg", altKey: "fitness" },
              { src: "/images/villa_lily_blue-sxm_photo-bathroom-01.jpg", altKey: "bathroom" },
            ] as const).map((img, i) => (
              <motion.div
                key={img.altKey}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i + 1) * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-2xl shadow-lg"
              >
                <Image
                  src={img.src}
                  alt={t(`imageAlts.${img.altKey}`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
