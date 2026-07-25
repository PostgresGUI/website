import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { StructuredData } from "@/components/structured-data";
import { Locale } from "@/lib/translations";

const appearanceScript = `
  (() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const preview = location.hostname === "localhost"
      ? new URLSearchParams(location.search).get("theme")
      : null;
    const syncAppearance = () => {
      const isDark = preview ? preview === "dark" : media.matches;
      document.documentElement.classList.toggle("dark", isDark);
    };
    syncAppearance();
    media.addEventListener("change", syncAppearance);
  })();
`;

export type RootLayoutProps = {
  children: React.ReactNode;
  lang: Locale;
};

export function RootLayout({ children, lang }: RootLayoutProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
        <StructuredData />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <Navigation locale={lang} />
        {children}
        <Footer locale={lang} />
        <CookieConsent gtmId="G-B50JK5C700" />
      </body>
    </html>
  );
}
