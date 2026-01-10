import { Metadata } from "next";
import { TablePlusAlternativePage } from "@/components/tableplus-alternative-page";
import { getTablePlusAlternativeMetadata } from "@/lib/seo";

export const metadata: Metadata = getTablePlusAlternativeMetadata();

export default function TablePlusAlternative() {
  return (
    <TablePlusAlternativePage appStoreLink="https://apps.apple.com/app/postgresgui/id6756467181" />
  );
}
