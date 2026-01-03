"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/villa_lily_blue-sxm_photo-master-view-hero.jpg"
          alt="Villa Lily Blue - Vue panoramique"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-[var(--primary)]">
            <MapPin className="h-5 w-5" />
            <span className="text-lg font-medium">{t("location")}</span>
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {t("title")}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90 md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg">
                {t("cta")}
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--secondary)]">
                Galerie
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-8 w-8 text-white/70" />
      </motion.div>
    </section>
  );
}
