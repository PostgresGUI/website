import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com/au",
    languages: getHreflangAlternates(),
  },
};

export default function AUHome() {
  return <Homepage appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181" />;
}
