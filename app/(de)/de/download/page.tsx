import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "PostgresGUI herunterladen - PostgreSQL GUI für Mac | Kostenloser Download",
  description:
    "Laden Sie PostgresGUI für Mac herunter. Leichtgewichtiger, Open-Source PostgreSQL-Client. Native macOS-App mit Dunkelmodus-Unterstützung. Kostenlos im App Store.",
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
