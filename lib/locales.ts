export type LocaleConfig = {
  code: string;
  hreflang: string;
  language: string;
  country: string;
  path: string;
};

export const locales: LocaleConfig[] = [
  { code: "en-US", hreflang: "en-US", language: "en", country: "United States", path: "" },
  { code: "en-GB", hreflang: "en-GB", language: "en", country: "United Kingdom", path: "/uk" },
  { code: "de-DE", hreflang: "de-DE", language: "de", country: "Germany", path: "/de" },
  { code: "fr-FR", hreflang: "fr-FR", language: "fr", country: "France", path: "/fr" },
  { code: "en-NL", hreflang: "en-NL", language: "en", country: "Netherlands", path: "/nl" },
  { code: "en-AU", hreflang: "en-AU", language: "en", country: "Australia", path: "/au" },
];

export const defaultLocale = locales[0];

export const baseUrl = "https://postgresgui.com";

export function getHreflangAlternates() {
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    languages[locale.hreflang] = `${baseUrl}${locale.path}`;
  }

  // Add x-default pointing to the US version
  languages["x-default"] = baseUrl;

  return languages;
}
