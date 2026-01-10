import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getLocaleMetadata } from "@/lib/seo";

export const metadata: Metadata = getLocaleMetadata("uk");

export default function UKHome() {
  return <Homepage appStoreLink="https://apps.apple.com/gb/app/postgresgui/id6756467181" />;
}
