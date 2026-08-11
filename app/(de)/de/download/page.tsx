import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "PostgresGUI für Mac herunterladen | App Store oder Quellcode",
  description:
    "PostgresGUI aus dem Mac App Store laden oder die Open-Source-App selbst bauen. macOS-Anforderungen, Downloadgröße und Quellcode prüfen.",
  alternates: {
    canonical: "https://postgresgui.com/de/download",
    languages: getDownloadHreflangAlternates(),
  },
};

export default function DEDownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/de/app/postgresgui/id6756467181" locale="de" />
  );
}
