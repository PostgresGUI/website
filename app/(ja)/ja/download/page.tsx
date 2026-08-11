import { Metadata } from "next";
import { DownloadPage } from "@/components/download-page";
import { getDownloadHreflangAlternates } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Mac用PostgresGUIをダウンロード | App Storeまたはソース",
  description:
    "Mac App StoreからPostgresGUIを入手するか、オープンソースアプリを自分でビルドできます。macOS要件、ダウンロードサイズ、ソースコードを確認できます。",
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
