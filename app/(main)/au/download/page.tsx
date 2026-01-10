import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Download PostgresGUI - PostgreSQL GUI for Mac | Free Download",
  description:
    "Download PostgresGUI for Mac. Lightweight, open-source PostgreSQL client. Native macOS app with dark mode support. Get it free on the App Store.",
  alternates: {
    canonical: "https://postgresgui.com/au/download",
    languages: getDownloadHreflangAlternates(),
  },
};

export default function AUDownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181" />
  );
}
