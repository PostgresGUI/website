import { Metadata } from "next";
import { Homepage } from "@/components/homepage";
import { getHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://postgresgui.com/ja",
    languages: getHreflangAlternates(),
  },
};

export default function JAHome() {
  return <Homepage appStoreLink="https://apps.apple.com/jp/app/postgresgui/id6756467181" locale="ja" />;
}
