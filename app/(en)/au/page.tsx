import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com", // Point to main page to avoid duplicate content
    languages: getHreflangAlternates(),
  },
};

export default function AUHome() {
  return <Homepage appStoreLink="https://apps.apple.com/au/app/postgresgui/id6756467181" />;
}
