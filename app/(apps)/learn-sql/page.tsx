import { Metadata } from "next";
import { WelcomePageClient } from "./WelcomePageClient";

export const metadata: Metadata = {
  title: "Learn PostgreSQL - Free Interactive SQL Tutorial",
  description:
    "Master PostgreSQL with hands-on interactive lessons. Learn SQL basics, queries, JOINs, and database design - free tutorial for beginners. Start writing real SQL queries in minutes.",
  keywords: [
    "learn postgresql",
    "sql tutorial",
    "postgresql tutorial",
    "learn sql",
    "sql for beginners",
    "interactive sql",
    "database tutorial",
    "postgresql course",
    "sql practice",
    "database learning",
  ],
  openGraph: {
    title: "Learn PostgreSQL - Free Interactive SQL Tutorial",
    description:
      "Master PostgreSQL with hands-on interactive lessons. Learn SQL basics, queries, and database design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn PostgreSQL - Free Interactive SQL Tutorial",
    description:
      "Master PostgreSQL with hands-on interactive lessons. Start writing real SQL queries in minutes.",
  },
  alternates: {
    canonical: "/learn-sql",
  },
};

export default function LearnPage() {
  return <WelcomePageClient />;
}
