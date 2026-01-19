import type { Metadata } from "next";
import { JetBrains_Mono, Saira_Stencil_One } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const sairaStencilOne = Saira_Stencil_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-saira-stencil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SQL Editor",
  description: "Run SQL queries in your browser.",
  keywords: [
    "sql editor",
    "online sql editor",
    "online sql compiler",
    "sql query editor online",
    "free sql editor",
    "sql online",
  ],
  openGraph: {
    title: "SQL Editor",
    description: "Run SQL queries in your browser.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Editor",
    description: "Run SQL queries in your browser.",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrainsMono.variable} ${sairaStencilOne.variable} h-screen`}>
      {children}
    </div>
  );
}
