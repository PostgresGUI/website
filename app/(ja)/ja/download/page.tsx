import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "PostgresGUIをダウンロード - Mac用PostgreSQL GUI | 無料ダウンロード",
  description:
    "Mac用PostgresGUIをダウンロード。軽量でオープンソースのPostgreSQLクライアント。ダークモード対応のネイティブmacOSアプリ。App Storeで無料入手。",
  alternates: {
    canonical: "https://postgresgui.com/ja/download",
    languages: getDownloadHreflangAlternates(),
  },
};

export default function JADownload() {
  return (
    <DownloadPage appStoreLink="https://apps.apple.com/jp/app/postgresgui/id6756467181" locale="ja" />
  );
}
