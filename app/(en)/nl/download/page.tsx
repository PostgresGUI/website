import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Download PostgresGUI for Mac | App Store or Source",
  description:
    "Get PostgresGUI from the Mac App Store or build the open-source app yourself. Review macOS requirements, download size, and source code.",
  alternates: {
    canonical: "https://postgresgui.com/download", // Point to main download page
    languages: getDownloadHreflangAlternates(),
  },
};

export default function NLDownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/nl/app/postgresgui/id6756467181" />
  );
}
