"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Card, CardTitle, CardDescription, Button } from "@/components/ui";
import { motion } from "framer-motion";
import { Anchor, Waves, UtensilsCrossed, MapPin, Compass, Ship } from "lucide-react";
import Image from "next/image";

const activityIcons = [Waves, Compass, MapPin, Ship];

export function AnseMarcelContent() {
  const t = useTranslations("anseMarcel");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg"
            alt="Anse Marcel, Saint Martin"
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

      {/* Introduction */}
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
                {t("intro.title")}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {t("intro.description")}
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
                src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach-02.jpg"
                alt="Vue d'Anse Marcel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Beach & Marina */}
      <section className="bg-[var(--accent)] py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <Waves className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <CardTitle className="mb-3">{t("beach.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("beach.description")}
                </CardDescription>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <Anchor className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <CardTitle className="mb-3">{t("marina.title")}</CardTitle>
                <CardDescription className="text-base">
                  {t("marina.description")}
                </CardDescription>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Activities */}
      <section className="py-24">
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                    <Card hover className="h-full text-center">
                      <div className="mb-4 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/10">
                        <Icon className="h-7 w-7 text-[var(--primary)]" />
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

      {/* Restaurants & Access */}
      <section className="bg-gray-50 py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <UtensilsCrossed className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <CardTitle>{t("restaurants.title")}</CardTitle>
                </div>
                <p className="text-gray-600">{t("restaurants.description")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <MapPin className="h-5 w-5 text-[var(--primary)]" />
                  </div>
                  <CardTitle>{t("access.title")}</CardTitle>
                </div>
                <p className="text-gray-600">{t("access.description")}</p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-[var(--secondary)]">
              Séjournez à Anse Marcel
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Villa Lily Blue vous accueille sur les hauteurs d'Anse Marcel avec une vue imprenable sur la baie.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/villa">
                <Button>Découvrir la villa</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Réserver</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
