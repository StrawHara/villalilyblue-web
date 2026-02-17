"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/villa_lily_blue-sxm_photo-master-view-hero.jpg"
          alt="Villa Lily Blue - Vue panoramique"
          fill
          priority
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsKDA4QDQwNEA4YExERExgcGBYYHCIhIR4dHx8fHx//2wBDAQMEBAUEBQkFBQkfDQsNHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcI/8QAIhAAAQQBBAMBAAAAAAAAAAAAAQIDBAUABhESITFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADB//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRITFB/9oADAMBAAIRAxEAPwCW6Y1fYadtGaW8gW8W1lkCTFaUXChwA2yobcSSB3jS3xLZ1GtbulEWZe3Fk9GjKLaZEt1xKVEDkQCdtwOzgYxlKtYHshTuTU52f/Z"
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
          <div className="mb-3 inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
            {t("badge")}
          </div>

          <div className="mb-4 flex items-center justify-center gap-2 text-white/90">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-base font-medium sm:text-lg">{t("location")}</span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
            {t("title")}
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/contact" onClick={() => trackEvent("click", "CTA", "hero_contact")}>
              <Button size="lg" className="w-full text-lg sm:w-auto">
                {t("cta")}
              </Button>
            </Link>
            <Link href="/gallery" onClick={() => trackEvent("click", "CTA", "hero_gallery")}>
              <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-[var(--secondary)] sm:w-auto">
                {tCommon("viewGallery")}
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
