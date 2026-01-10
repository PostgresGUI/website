import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getDownloadPageMetadata("uk");

export default function UKDownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/gb/app/postgresgui/id6756467181" />
  );
}
