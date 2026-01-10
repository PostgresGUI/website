import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getDownloadPageMetadata("de");

export default function DEDownload() {
  return (
    <DownloadPage
      locale="de"
      appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181"
    />
  );
}
