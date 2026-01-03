"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";

export function Welcome() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/villa_lily_blue-sxm_photo-living-room-01.jpg"
                alt="Villa Lily Blue - Salon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl border-2 border-[var(--primary)]" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-[var(--secondary)] md:text-4xl">
              {t("welcomeTitle")}
            </h2>
            <p className="mb-8 text-lg text-gray-600 leading-relaxed">
              {t("welcomeText")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/villa">
                <Button>{tCommon("learnMore")}</Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline">{tCommon("viewGallery")}</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
