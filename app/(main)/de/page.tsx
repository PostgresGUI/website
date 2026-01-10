import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com/de",
    languages: getHreflangAlternates(),
  },
};

export default function DEHome() {
  return (
    <Homepage appStoreLink="https://apps.apple.com/us/app/postgresgui/id6756467181" />
  );
}
