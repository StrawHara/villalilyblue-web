"use client";

import { useTranslations } from "next-intl";
import { Container, Card, CardTitle, CardDescription } from "@/components/ui";
import { motion } from "framer-motion";
import {
  MapPin,
  Umbrella,
  Anchor,
  Building,
  Utensils,
  Plane,
  Sun,
  Palmtree,
  Ship,
  Compass,
} from "lucide-react";
import Image from "next/image";

const distances = [
  { key: "beach", icon: Umbrella },
  { key: "marina", icon: Anchor },
  { key: "marigot", icon: Building },
  { key: "grandCase", icon: Utensils },
  { key: "airport", icon: Plane },
  { key: "orient", icon: Sun },
] as const;

const activityIcons = [Palmtree, Compass, Utensils, Ship];

export function LocationContent() {
  const t = useTranslations("location");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg"
            alt="Anse Marcel, Saint Martin"
            fill
            priority
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsKDA4QDQwNEA4YExERExgcGBYYHCIhIR4dHx8fHx//2wBDAQMEBAUEBQkFBQkfDQsNHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcI/8QAIhAAAQQBBAMBAAAAAAAAAAAAAQIDBAUABhESITFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADB//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRITFB/9oADAMBAAIRAxEAPwCW6Y1fYadtGaW8gW8W1lkCTFaUXChwA2yobcSSB3jS3xLZ1GtbulEWZe3Fk9GjKLaZEt1xKVEDkQCdtwOzgYxlKtYHshTuTU52f/Z"
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
            <div className="mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("title")}</h1>
            <p className="text-xl text-white/90 md:text-2xl">{t("subtitle")}</p>
          </motion.div>
        </div>
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
              <p className="text-lg leading-relaxed text-gray-600">
                {t("description")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach-02.jpg"
                alt="Baie d'Anse Marcel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Distances */}
      <section className="bg-[var(--accent)] py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("distances.title")}
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {distances.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <span className="text-gray-700">{t(`distances.${key}`)}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Anse Marcel Photos */}
      <section className="py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach-aerial.webp"
                alt="Plage d'Anse Marcel - vue aérienne"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-anse-marcel-bay-aerial.webp"
                alt="Baie d'Anse Marcel - vue aérienne"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-2xl"
          >
            <iframe
              src="https://www.google.com/maps?q=Villa+Lily+Blue,+Anse+Marcel,+97150+Saint+Martin&z=14&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Lily Blue Location"
            />
          </motion.div>
        </Container>
      </section>

      {/* Activities */}
      <section className="bg-gray-50 py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("activities.title")}
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2">
            {(t.raw("activities.items") as { title: string; description: string }[]).map(
              (activity, index) => {
                const Icon = activityIcons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card hover className="h-full">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                        <Icon className="h-6 w-6 text-[var(--primary)]" />
                      </div>
                      <CardTitle className="mb-2">{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
