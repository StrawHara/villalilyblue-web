"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Calendar } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function FloatingCTA() {
  const t = useTranslations("common");
  const pathname = usePathname();

  // Hide on contact page (already there) and landing pages
  if (pathname === "/contact" || pathname.startsWith("/lp")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--primary)]/20 bg-white/95 p-3 pb-safe backdrop-blur-sm md:hidden">
      <Link
        href="/contact"
        onClick={() => trackEvent("click", "CTA", "floating_mobile_book")}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-colors active:bg-[var(--primary-dark)]"
      >
        <Calendar className="h-5 w-5" />
        {t("bookNow")}
      </Link>
    </div>
  );
}
