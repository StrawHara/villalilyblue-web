import Link from "next/link";
import { BRAND_COLOR } from "@/lib/site";

// 404 racine pour les chemins sans préfixe de locale (ex: /xyz).
// Le layout racine est un passthrough : cette page doit rendre html/body.
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="mb-2 text-8xl font-bold" style={{ color: BRAND_COLOR }}>
            404
          </p>
          <h1 className="mb-4 text-2xl font-bold sm:text-3xl">
            Page introuvable / Page not found
          </h1>
          <p className="mb-8 max-w-md text-gray-500">
            La page que vous recherchez n&apos;existe pas. / The page you are
            looking for does not exist.
          </p>
          <Link
            href="/fr"
            className="rounded-xl px-6 py-3 font-semibold text-white"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            Villa Lily Blue
          </Link>
        </div>
      </body>
    </html>
  );
}
