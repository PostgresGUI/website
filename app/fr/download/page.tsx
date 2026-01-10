import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getDownloadPageMetadata("fr");

export default function FRDownload() {
  return (
    <DownloadPage
      locale="fr"
      appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181"
    />
  );
}
