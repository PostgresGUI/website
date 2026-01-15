import { Metadata } from "next";
import { LearnProviders } from "@/components/learn/learn-providers";
import { LearnLayoutClient } from "@/components/learn/learn-layout-client";

export const metadata: Metadata = {
  title: "Learn PostgreSQL - Free Interactive SQL Tutorial | PostgresGUI",
  description:
    "Master PostgreSQL with hands-on interactive lessons. Learn SQL basics, queries, JOINs, and database design - free tutorial for beginners.",
  keywords: [
    "learn postgresql",
    "sql tutorial",
    "postgresql tutorial",
    "learn sql",
    "sql for beginners",
    "interactive sql",
    "database tutorial",
  ],
  openGraph: {
    title: "Learn PostgreSQL - Free Interactive SQL Tutorial",
    description:
      "Master PostgreSQL with hands-on interactive lessons. Learn SQL basics, queries, and database design.",
    type: "website",
  },
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LearnProviders>
      <LearnLayoutClient>{children}</LearnLayoutClient>
    </LearnProviders>
  );
}
