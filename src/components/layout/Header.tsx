"use client";

import { useState, useEffect } from "react";
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

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const otherLocale = locale === "fr" ? "en" : "fr";

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
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2">
            <div className="relative h-12 w-12">
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
                "text-xl font-semibold transition-colors",
                isScrolled ? "text-[var(--secondary)]" : "text-white"
              )}
            >
              Villa Lily Blue
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
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

            {/* Language Switcher */}
            <Link
              href={pathname}
              locale={otherLocale}
              className={cn(
                "flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:bg-[var(--primary)] hover:text-white",
                isScrolled
                  ? "border-[var(--primary)] text-[var(--primary)]"
                  : "border-white text-white"
              )}
            >
              <Globe className="h-4 w-4" />
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "relative z-10 lg:hidden",
              isScrolled || isMobileMenuOpen ? "text-[var(--secondary)]" : "text-white"
            )}
            aria-label="Toggle menu"
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
          className={cn(
            "fixed inset-0 top-20 bg-white transition-all duration-300 lg:hidden",
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <nav className="flex flex-col p-6">
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

            <Link
              href={pathname}
              locale={otherLocale}
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 flex items-center gap-2 text-lg font-medium text-[var(--primary)]"
            >
              <Globe className="h-5 w-5" />
              {otherLocale === "en" ? "English" : "Français"}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
