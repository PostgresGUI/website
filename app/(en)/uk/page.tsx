import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com/uk",
    languages: getHreflangAlternates(),
  },
};

export default function UKHome() {
  return <Homepage appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181" />;
}
