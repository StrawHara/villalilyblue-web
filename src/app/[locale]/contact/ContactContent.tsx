"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container, Card, CardTitle } from "@/components/ui";
import { ContactForm } from "@/components/forms/ContactForm";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Clock, ChevronDown } from "lucide-react";
import Image from "next/image";

export function ContactContent() {
  const t = useTranslations("contact");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = t.raw("faq.items") as { question: string; answer: string }[];

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/villa_lily_blue-sxm_photo-master-view-hero-02.jpeg"
            alt="Contact Villa Lily Blue"
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

      {/* Contact Form & Info */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="p-8">
                <ContactForm />
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card>
                <CardTitle className="mb-6">{t("info.title")}</CardTitle>
                <div className="space-y-4">
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="flex items-center gap-3 text-gray-600 transition-colors hover:text-[var(--primary)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Mail className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    {t("info.email")}
                  </a>
                  <a
                    href={`tel:${t("info.phone")}`}
                    className="flex items-center gap-3 text-gray-600 transition-colors hover:text-[var(--primary)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Phone className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    {t("info.phone")}
                  </a>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                      <Clock className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    {t("info.response")}
                  </div>
                </div>
              </Card>

              {/* Map Preview */}
              <Card className="overflow-hidden p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8!2d-63.0319!3d18.1097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA2JzM1LjAiTiA2M8KwMDEnNTQuOCJX!5e0!3m2!1sfr!2sfr!4v1704300000000!5m2!1sfr!2sfr"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa Lily Blue Location"
                />
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-24">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center text-3xl font-bold text-[var(--secondary)] md:text-4xl"
          >
            {t("faq.title")}
          </motion.h2>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden p-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 sm:p-6"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-item-${index}`}
                  >
                    <span className="pr-4 font-medium text-[var(--secondary)]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        id={`faq-item-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t px-4 pb-4 pt-3 text-gray-600 sm:px-6 sm:pb-6 sm:pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
