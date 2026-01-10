import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Télécharger PostgresGUI - GUI PostgreSQL pour Mac | Téléchargement gratuit",
  description:
    "Téléchargez PostgresGUI pour Mac. Client PostgreSQL léger et open-source. Application macOS native avec support du mode sombre. Gratuit sur l'App Store.",
  alternates: {
    canonical: "https://postgresgui.com/fr/download",
    languages: getDownloadHreflangAlternates(),
  },
};

export default function FRDownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/fr/app/postgresgui/id6756467181" locale="fr" />
  );
}
