"use client";

import { useTranslations } from "next-intl";
import { Container, Card, CardTitle } from "@/components/ui";
import { motion } from "framer-motion";

const sections = ["editor", "hosting", "privacy", "cookies", "credits"] as const;

export function LegalContent() {
  const t = useTranslations("legal");

  return (
    <section className="bg-gray-50 py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-[var(--secondary)] md:text-5xl">
            {t("title")}
          </h1>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card>
                <CardTitle className="mb-4">{t(`${section}.title`)}</CardTitle>
                <p className="whitespace-pre-line text-gray-600">
                  {t(`${section}.content`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
