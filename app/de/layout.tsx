import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { getLocaleMetadata } from "@/lib/seo";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://postgresgui.com"),
  ...getLocaleMetadata("de"),
};

export default function GermanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${jetbrainsMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation locale="de" />
        {children}
        <Footer locale="de" />
        <CookieConsent gtmId="G-B50JK5C700" />
      </body>
    </html>
  );
}
