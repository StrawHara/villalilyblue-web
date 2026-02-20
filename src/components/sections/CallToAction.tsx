"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container, Button } from "@/components/ui";
import { motion } from "framer-motion";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

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
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsKDA4QDQwNEA4YExERExgcGBYYHCIhIR4dHx8fHx//2wBDAQMEBAUEBQkFBQkfDQsNHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgcI/8QAIhAAAQQBBAMBAAAAAAAAAAAAAQIDBAUABhESITFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADB//EABsRAAICAwEAAAAAAAAAAAAAAAECAAMRITFB/9oADAMBAAIRAxEAPwCW6Y1fYadtGaW8gW8W1lkCTFaUXChwA2yobcSSB3jS3xLZ1GtbulEWZe3Fk9GjKLaZEt1xKVEDkQCdtwOzgYxlKtYHshTuTU52f/Z"
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
          <h2 className="mb-8 text-3xl font-bold md:text-5xl">
            {tHero("subtitle")}
          </h2>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" onClick={() => trackEvent("click", "CTA", "cta_section_contact")}>
              <Button size="lg" className="text-lg">
                {t("cta")}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
