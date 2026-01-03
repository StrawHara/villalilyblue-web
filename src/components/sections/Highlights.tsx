"use client";

import { useTranslations } from "next-intl";
import { Container, Card, CardTitle, CardDescription } from "@/components/ui";
import { motion } from "framer-motion";
import { Eye, Waves, MapPin, Sparkles } from "lucide-react";

const icons = {
  seaView: Eye,
  pool: Waves,
  location: MapPin,
  comfort: Sparkles,
};

const highlightKeys = ["seaView", "pool", "location", "comfort"] as const;

export function Highlights() {
  const t = useTranslations("home.highlights");

  return (
    <section className="bg-[var(--accent)] py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--secondary)] md:text-4xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {highlightKeys.map((key, index) => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary)]/10">
                    <Icon className="h-8 w-8 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="mb-2">{t(`${key}.title`)}</CardTitle>
                  <CardDescription>{t(`${key}.description`)}</CardDescription>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
