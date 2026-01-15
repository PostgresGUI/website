import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SQL Playground - Free Online SQL Editor",
  description:
    "Practice SQL queries in your browser with our free SQL playground. No signup required.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${jetbrainsMono.variable} h-screen`}>
      {children}
    </div>
  );
}
