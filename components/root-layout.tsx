import { Oswald } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
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
      <body
        className={`${oswald.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navigation locale={lang} />
        {children}
        <Footer locale={lang} />
        <CookieConsent gtmId="G-B50JK5C700" />
      </body>
    </html>
  );
}
