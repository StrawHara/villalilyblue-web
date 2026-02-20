"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/", label: "home" },
  { href: "/villa", label: "villa" },
  { href: "/amenities", label: "amenities" },
  { href: "/gallery", label: "gallery" },
  { href: "/location", label: "location" },
  { href: "/services", label: "services" },
  { href: "/contact", label: "contact" },
] as const;

const localeNames: Record<string, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
};

const allLocales = ["fr", "en", "es"] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const otherLocales = allLocales.filter((l) => l !== locale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image
                src="/images/logo.png"
                alt="Villa Lily Blue"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={cn(
                "text-lg font-semibold transition-colors sm:text-xl",
                isScrolled ? "text-[var(--secondary)]" : "text-white"
              )}
            >
              Villa Lily Blue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-[var(--primary)]",
                  pathname === item.href
                    ? "text-[var(--primary)]"
                    : isScrolled
                    ? "text-[var(--foreground)]"
                    : "text-white"
                )}
              >
                {t(item.label)}
              </Link>
            ))}

            {/* Language Switcher Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={cn(
                  "flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:bg-[var(--primary)] hover:text-white",
                  isScrolled
                    ? "border-[var(--primary)] text-[var(--primary)]"
                    : "border-white text-white"
                )}
                aria-expanded={isLangOpen}
                aria-haspopup="true"
              >
                <Globe className="h-4 w-4" />
                {locale.toUpperCase()}
              </button>
              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[140px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                  {otherLocales.map((l) => (
                    <Link
                      key={l}
                      href={pathname}
                      locale={l}
                      onClick={() => setIsLangOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-[var(--accent)] hover:text-[var(--primary)]"
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "relative z-10 p-2 lg:hidden",
              isScrolled || isMobileMenuOpen ? "text-[var(--secondary)]" : "text-white"
            )}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "fixed inset-0 top-16 bg-white transition-all duration-300 sm:top-20 lg:hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex h-full flex-col overflow-y-auto px-6 pb-safe pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "border-b border-gray-100 py-4 text-lg font-medium transition-colors",
                  pathname === item.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--foreground)] hover:text-[var(--primary)]"
                )}
              >
                {t(item.label)}
              </Link>
            ))}

            <div className="mt-6 flex gap-3">
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-full border border-[var(--primary)] px-4 py-2.5 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
