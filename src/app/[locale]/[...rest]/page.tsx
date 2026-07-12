import { notFound } from "next/navigation";

// Catch-all : sans lui, les URLs inconnues sous /fr|en|es servent la 404
// par défaut de Next (en anglais) au lieu du not-found.tsx localisé
export default function CatchAllPage() {
  notFound();
}
