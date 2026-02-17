import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Home } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-8xl font-bold text-[var(--primary)]">404</p>
      <h1 className="mb-4 text-2xl font-bold text-[var(--secondary)] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="mb-8 max-w-md text-gray-500">
        {t("description")}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--primary-dark)]"
      >
        <Home className="h-5 w-5" />
        {t("backHome")}
      </Link>
    </div>
  );
}
