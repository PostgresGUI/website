import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Télécharger PostgresGUI pour Mac | App Store ou source",
  description:
    "Obtenez PostgresGUI sur le Mac App Store ou compilez vous-même l'app open source. Consultez les prérequis macOS, la taille du téléchargement et le code source.",
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
