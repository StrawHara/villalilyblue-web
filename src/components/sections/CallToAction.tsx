"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";

export function CallToAction() {
  const t = useTranslations("rates");
  const tHero = useTranslations("hero");

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/villa_lily_blue-sxm_photo-swimming-pool-from-sky.jpeg"
          alt="Villa Lily Blue"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--secondary)]/80" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center text-white"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            {tHero("subtitle")}
          </h2>
          <p className="mb-8 text-lg text-white/80">
            {t("seasons.low.price")} - {t("seasons.high.price")}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg">
                {t("cta")}
              </Button>
            </Link>
            <Link href="/rates">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[var(--secondary)]"
              >
                {t("title")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
