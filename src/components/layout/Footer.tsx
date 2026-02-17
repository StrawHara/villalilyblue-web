"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { Mail, MapPin, Instagram, Facebook } from "lucide-react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

const quickLinks = [
  { href: "/villa", label: "villa" },
  { href: "/amenities", label: "amenities" },
  { href: "/gallery", label: "gallery" },
  { href: "/rates", label: "rates" },
  { href: "/services", label: "services" },
  { href: "/contact", label: "contact" },
] as const;

const destinationLinks = [
  { href: "/anse-marcel", label: "Anse Marcel" },
  { href: "/saint-martin", label: "Saint Martin" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact.info");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--secondary)] text-white">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo-white.png"
                  alt="Villa Lily Blue"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold">Villa Lily Blue</span>
            </Link>
            <p className="text-sm text-gray-300">{t("description")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">{t("quickLinks")}</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 transition-colors hover:text-[var(--primary)]"
                >
                  {tNav(link.label)}
                </Link>
              ))}
              {destinationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 transition-colors hover:text-[var(--primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">{t("contact")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${tContact("email")}`}
                className="flex items-center gap-2 text-gray-300 transition-colors hover:text-[var(--primary)]"
                onClick={() => trackEvent("click", "contact", "footer_email")}
              >
                <Mail className="h-4 w-4" />
                {tContact("email")}
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                Anse Marcel, Saint Martin
              </div>
            </div>
          </div>

          {/* Social & Airbnb */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">{t("followUs")}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/villalilyblue/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--primary)]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/villalilyblue"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[var(--primary)]"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <a
              href="https://www.airbnb.fr/rooms/1313868121596013747"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-[var(--primary)]"
              onClick={() => trackEvent("click", "outbound", "airbnb_footer")}
            >
              Airbnb
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs">5.0 ★</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            {t("copyright", { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <Link
              href="/legal"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {t("legal")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
