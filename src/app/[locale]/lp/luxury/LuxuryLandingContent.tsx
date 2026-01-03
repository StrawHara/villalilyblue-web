"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button, Badge, Card, CardTitle } from "@/components/ui";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

const amenities = [
  { icon: "pool", label: "Piscine privée" },
  { icon: "view", label: "Vue mer 180°" },
  { icon: "bedroom", label: "4 suites" },
  { icon: "concierge", label: "Conciergerie" },
];

export function LuxuryLandingContent() {
  const t = useTranslations("landing.luxury");
  const features = t.raw("features") as string[];

  return (
    <div className="min-h-screen bg-[var(--secondary)]">
      {/* Hero Section - Luxury Style */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Split Layout */}
        <div className="grid min-h-screen lg:grid-cols-2">
          {/* Left - Content */}
          <div className="flex items-center justify-center px-8 py-24 lg:px-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl text-white"
            >
              <Badge variant="gold" className="mb-6">
                <Sparkles className="mr-1 h-3 w-3" />
                {t("badge")}
              </Badge>

              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t("title")}
              </h1>

              <p className="mb-8 text-lg text-white/80 md:text-xl">
                {t("subtitle")}
              </p>

              {/* Features List */}
              <ul className="mb-10 space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--gold)]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/90">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <Link href="/contact">
                <Button size="lg" variant="gold" className="text-lg">
                  {t("cta")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 border-l-2 border-[var(--gold)] pl-6"
              >
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[var(--gold)] text-[var(--gold)]"
                    />
                  ))}
                </div>
                <p className="text-white/80 italic">{t("testimonial")}</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:block"
          >
            <Image
              src="/images/villa_lily_blue-sxm_photo-master-view-hero.jpg"
              alt="Villa Lily Blue - Luxe"
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Amenities Bar */}
      <section className="bg-[var(--gold)] py-8">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <p className="font-semibold">{amenity.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-white md:text-4xl"
          >
            Une expérience unique
          </motion.h2>

          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <Image
                  src={`/images/villa_lily_blue-sxm_photo-${i === 1 ? "kitchen" : i === 2 ? "bathroom-01" : "outdoor-kitchen"}.${i === 3 ? "jpeg" : "jpg"}`}
                  alt={`Villa Lily Blue Luxe ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Cards */}
      <section className="pb-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Emplacement d'exception",
                description:
                  "Sur les hauteurs d'Anse Marcel, profitez d'une vue imprenable sur la baie.",
              },
              {
                title: "Prestations haut de gamme",
                description:
                  "Chaque détail a été pensé pour votre confort : literie premium, équipements modernes.",
              },
              {
                title: "Service personnalisé",
                description:
                  "Conciergerie, chef à domicile, transferts... nous organisons tout pour vous.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardTitle className="mb-3 text-white">{feature.title}</CardTitle>
                  <p className="text-white/70">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Réservez votre séjour d'exception
            </h2>
            <Link href="/contact">
              <Button size="lg" variant="gold" className="text-lg">
                {t("cta")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Villa Lily Blue. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
