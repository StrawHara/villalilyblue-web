"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Card, CardTitle, CardDescription, Button, Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { Flag, Palmtree, UtensilsCrossed, Compass, Info, Check } from "lucide-react";
import Image from "next/image";

export function SaintMartinContent() {
  const t = useTranslations("saintMartin");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-anse-marcel-beach.jpg"
            alt="Saint Martin"
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
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{t("title")}</h1>
            <p className="text-xl text-white/90 md:text-2xl">{t("subtitle")}</p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24">
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

      {/* French & Dutch Sides */}
      <section className="bg-[var(--accent)] py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="primary">FR</Badge>
                  <CardTitle>{t("frenchSide.title")}</CardTitle>
                </div>
                <p className="text-gray-600">{t("frenchSide.description")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex items-center gap-3">
                  <Badge variant="secondary">NL</Badge>
                  <CardTitle>{t("dutchSide.title")}</CardTitle>
                </div>
                <p className="text-gray-600">{t("dutchSide.description")}</p>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Beaches */}
      <section className="py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("beaches.title")}
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(t.raw("beaches.items") as { name: string; description: string }[]).map(
              (beach, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <div className="mb-2 flex items-center gap-2">
                      <Palmtree className="h-5 w-5 text-[var(--primary)]" />
                      <CardTitle className="text-lg">{beach.name}</CardTitle>
                    </div>
                    <CardDescription>{beach.description}</CardDescription>
                  </Card>
                </motion.div>
              )
            )}
          </div>
        </Container>
      </section>

      {/* Gastronomy */}
      <section className="bg-gray-50 py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src="/images/villa_lily_blue-sxm_photo-outdoor-kitchen.jpeg"
                alt="Gastronomie Saint Martin"
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
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/10">
                  <UtensilsCrossed className="h-6 w-6 text-[var(--primary)]" />
                </div>
                <h2 className="text-3xl font-bold text-[var(--secondary)]">
                  {t("gastronomy.title")}
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-gray-600">
                {t("gastronomy.description")}
              </p>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <Card>
              <ul className="grid gap-3 sm:grid-cols-2">
                {(t.raw("activities.items") as string[]).map((activity, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <Compass className="h-4 w-4 text-[var(--primary)]" />
                    {activity}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* Practical Info */}
      <section className="bg-[var(--accent)] py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("practical.title")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl"
          >
            <Card>
              <ul className="space-y-3">
                {["currency", "language", "weather", "airport", "driving"].map((key) => (
                  <li key={key} className="flex items-center gap-2 text-gray-600">
                    <Info className="h-4 w-4 text-[var(--primary)]" />
                    {t(`practical.${key}`)}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
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
              Votre séjour à Saint Martin
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Villa Lily Blue est idéalement située pour découvrir toutes les richesses de l'île.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/villa">
                <Button>Découvrir la villa</Button>
              </Link>
              <Link href="/anse-marcel">
                <Button variant="outline">En savoir plus sur Anse Marcel</Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
