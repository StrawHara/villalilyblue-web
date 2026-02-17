"use client";

import { useTranslations } from "next-intl";
import { Container, Card, CardTitle, CardDescription } from "@/components/ui";
import { motion } from "framer-motion";
import { Bed, Bath, Users, Square } from "lucide-react";
import Image from "next/image";

const features = [
  { key: "bedrooms", icon: Bed },
  { key: "bathrooms", icon: Bath },
  { key: "capacity", icon: Users },
  { key: "surface", icon: Square },
] as const;

const rooms = ["masterSuite", "bedroom2", "bedroom3", "bedroom4"] as const;

export function VillaContent() {
  const t = useTranslations("villa");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-swimming-pool-and-house-01.jpeg"
            alt="Villa Lily Blue"
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
            <div className="mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              {t("renovatedBadge")}
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("title")}</h1>
            <p className="text-xl text-white/90 md:text-2xl">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[var(--accent)] py-12">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {features.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-2 rounded-xl bg-white p-6 shadow-md"
              >
                <Icon className="h-8 w-8 text-[var(--primary)]" />
                <span className="text-lg font-semibold text-[var(--secondary)]">
                  {t(`features.${key}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Description */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-[var(--secondary)]">
                {t("subtitle")}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {t("description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-living-room-01-2.jpg"
                alt="Intérieur Villa Lily Blue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Rooms */}
      <section className="bg-gray-50 py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("features.bedrooms")}
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {rooms.map((room, index) => (
              <motion.div
                key={room}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-xl">
                    <Image
                      src={`/images/villa_lily_blue-sxm_photo-${room === "masterSuite" ? "master-bedroom" : room === "bedroom2" ? "bedroom-01" : room === "bedroom3" ? "bedroom-02" : "bedroom-04"}.jpg`}
                      alt={t(`rooms.${room}.title`)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardTitle className="mb-2">
                    {t(`rooms.${room}.title`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`rooms.${room}.description`)}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Living Spaces */}
      <section className="py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl lg:order-2"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-kitchen-03.jpg"
                alt="Salon Villa Lily Blue"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:order-1"
            >
              <h2 className="mb-6 text-3xl font-bold text-[var(--secondary)]">
                {t("living.title")}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {t("living.description")}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
