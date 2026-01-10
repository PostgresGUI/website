import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com/fr",
    languages: getHreflangAlternates(),
  },
};

export default function FRHome() {
  return <Homepage appStoreLink="https://apps.apple.com/fr/app/postgresgui/id6756467181" locale="fr" />;
}
