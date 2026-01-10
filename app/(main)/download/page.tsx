import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getDownloadPageMetadata("en");

export default function Download() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/us/app/postgresgui/id6756467181" />
  );
}
