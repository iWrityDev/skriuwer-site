/**
 * Amazon affiliate URL builder with client-side locale detection.
 *
 * Amazon OneLink requires the OneLink JavaScript on every page to actually
 * redirect visitors; a bare amazon.com/dp/?tag= link does NOT redirect.
 * Instead we detect the visitor's locale on the client and rewrite the
 * hostname to the nearest supported Amazon storefront.
 */

const ONELINK_TAG = process.env.AMAZON_ONELINK_TAG || "31813-20";

// Amazon storefronts where we have an associates tag. Order is used as
// fallback priority.
const SUPPORTED_DOMAINS = [
  "amazon.com",   // US
  "amazon.ca",    // Canada
  "amazon.co.uk", // United Kingdom
  "amazon.de",    // Germany
  "amazon.fr",    // France
  "amazon.it",    // Italy
  "amazon.es",    // Spain
  "amazon.nl",    // Netherlands
  "amazon.se",    // Sweden
  "amazon.pl",    // Poland
] as const;

// ISO country code → Amazon domain. Countries without a local Amazon
// fall through to the nearest region (handled below).
const COUNTRY_TO_DOMAIN: Record<string, string> = {
  US: "amazon.com",
  CA: "amazon.ca",
  MX: "amazon.com.mx",
  GB: "amazon.co.uk",
  IE: "amazon.co.uk",
  DE: "amazon.de",
  AT: "amazon.de",
  CH: "amazon.de",
  LI: "amazon.de",
  LU: "amazon.de",
  FR: "amazon.fr",
  MC: "amazon.fr",
  IT: "amazon.it",
  ES: "amazon.es",
  NL: "amazon.nl",
  BE: "amazon.nl",
  SE: "amazon.se",
  PL: "amazon.pl",
  JP: "amazon.co.jp",
  IN: "amazon.in",
  AU: "amazon.com.au",
  BR: "amazon.com.br",
  SG: "amazon.sg",
  AE: "amazon.ae",
  SA: "amazon.sa",
  TR: "amazon.com.tr",
  EG: "amazon.eg",
};

// Browser language code → fallback country. Used when we can't get a
// proper country from geolocation/Intl.
const LANG_TO_COUNTRY: Record<string, string> = {
  "en-gb": "GB",
  "en-us": "US",
  "en-ca": "CA",
  "en-au": "AU",
  "en-ie": "GB",
  "en-in": "IN",
  "nl": "NL", "nl-nl": "NL", "nl-be": "NL",
  "fy": "NL",
  "de": "DE", "de-de": "DE", "de-at": "DE", "de-ch": "DE",
  "fr": "FR", "fr-fr": "FR", "fr-be": "FR", "fr-ca": "CA",
  "it": "IT", "it-it": "IT",
  "es": "ES", "es-es": "ES", "es-mx": "MX",
  "pl": "PL", "pl-pl": "PL",
  "sv": "SE", "sv-se": "SE",
  "pt": "BR", "pt-br": "BR",
  "ja": "JP", "ja-jp": "JP",
};

export function getAmazonDomainForCountry(country: string | null | undefined): string {
  if (!country) return "amazon.com";
  return COUNTRY_TO_DOMAIN[country.toUpperCase()] || "amazon.com";
}

/** Detect the user's country purely on the client from Intl / navigator.language. */
export function detectCountryOnClient(): string {
  if (typeof window === "undefined") return "US";
  try {
    // Intl.DateTimeFormat.resolvedOptions() gives an IANA timezone we can
    // map loosely to a country when the browser language is "en-US" but
    // the user is in Europe. For now we use navigator.language which is
    // usually reliable.
    const lang = navigator.language?.toLowerCase() || "en-us";
    const exact = LANG_TO_COUNTRY[lang];
    if (exact) return exact;
    const base = lang.split("-")[0];
    const baseMatch = LANG_TO_COUNTRY[base];
    if (baseMatch) return baseMatch;
  } catch {
    // ignore
  }
  return "US";
}

/** Build a standard amazon.com URL (used server-side for SSR fallback). */
export function buildAffiliateUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${ONELINK_TAG}`;
}

/** Build an affiliate URL for a specific Amazon domain. */
export function buildAffiliateUrlForDomain(asin: string, domain: string): string {
  return `https://www.${domain}/dp/${asin}?tag=${ONELINK_TAG}`;
}

export function getAffiliateTag(): string {
  return ONELINK_TAG;
}

export { SUPPORTED_DOMAINS };

export const MARKETPLACE_FLAGS: Record<string, { label: string; flag: string; domain: string }> = {
  "amazon.com":   { label: "Amazon US", flag: "\u{1F1FA}\u{1F1F8}", domain: "amazon.com" },
  "amazon.de":    { label: "Amazon DE", flag: "\u{1F1E9}\u{1F1EA}", domain: "amazon.de" },
  "amazon.co.uk": { label: "Amazon UK", flag: "\u{1F1EC}\u{1F1E7}", domain: "amazon.co.uk" },
  "amazon.nl":    { label: "Amazon NL", flag: "\u{1F1F3}\u{1F1F1}", domain: "amazon.nl" },
  "amazon.fr":    { label: "Amazon FR", flag: "\u{1F1EB}\u{1F1F7}", domain: "amazon.fr" },
  "amazon.it":    { label: "Amazon IT", flag: "\u{1F1EE}\u{1F1F9}", domain: "amazon.it" },
  "amazon.es":    { label: "Amazon ES", flag: "\u{1F1EA}\u{1F1F8}", domain: "amazon.es" },
  "amazon.se":    { label: "Amazon SE", flag: "\u{1F1F8}\u{1F1EA}", domain: "amazon.se" },
  "amazon.pl":    { label: "Amazon PL", flag: "\u{1F1F5}\u{1F1F1}", domain: "amazon.pl" },
  "amazon.ca":    { label: "Amazon CA", flag: "\u{1F1E8}\u{1F1E6}", domain: "amazon.ca" },
};
