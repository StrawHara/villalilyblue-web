"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button, Badge, Card } from "@/components/ui";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Marie L.",
    location: "Paris, France",
    text: "Un séjour magique ! La villa est encore plus belle que sur les photos.",
    rating: 5,
  },
  {
    name: "John D.",
    location: "New York, USA",
    text: "Perfect location, stunning views. We'll definitely come back!",
    rating: 5,
  },
  {
    name: "Sophie M.",
    location: "Bruxelles, Belgique",
    text: "Service impeccable, villa parfaite pour notre famille.",
    rating: 5,
  },
];

export function VacationLandingContent() {
  const t = useTranslations("landing.vacation");
  const features = t.raw("features") as string[];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg"
            alt="Villa Lily Blue - Vacances de rêve"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <Badge variant="gold" className="mb-6 text-base">
              {t("badge")}
            </Badge>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>

            <p className="mb-8 text-xl text-white/90 md:text-2xl">
              {t("subtitle")}
            </p>

            {/* Features */}
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm"
                >
                  <Check className="h-4 w-4 text-[var(--primary)]" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg" variant="gold" className="text-lg">
                  {t("cta")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-white/80"
            >
              <Clock className="h-4 w-4" />
              {t("urgency")}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[var(--accent)] py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="mb-3 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-gray-600 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-[var(--secondary)]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Preview */}
      <section className="py-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={`/images/villa_lily_blue-sxm_photo-${i === 1 ? "master-bedroom" : i === 2 ? "living-room-01" : i === 3 ? "swimming-pool-01" : "anse-marcel-beach"}.${i === 3 ? "jpeg" : "jpg"}`}
                  alt={`Villa Lily Blue ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--secondary)] py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center text-white"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              {t("title")}
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

      {/* Minimal Footer for Landing Page */}
      <footer className="bg-[var(--secondary)] py-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Villa Lily Blue. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
