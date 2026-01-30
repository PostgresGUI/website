import { Oswald } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { StructuredData } from "@/components/structured-data";
import { IssueBanner } from "@/components/issue-banner";
import { Locale } from "@/lib/translations";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export type RootLayoutProps = {
  children: React.ReactNode;
  lang: Locale;
};

export function RootLayout({ children, lang }: RootLayoutProps) {
  return (
    <html lang={lang}>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${oswald.variable} antialiased flex flex-col min-h-screen`}
      >
        <IssueBanner />
        <Navigation locale={lang} />
        {children}
        <Footer locale={lang} />
        <CookieConsent gtmId="G-B50JK5C700" />
      </body>
    </html>
  );
}
