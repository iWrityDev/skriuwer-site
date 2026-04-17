/**
 * Amazon OneLink handles all geo-redirection automatically.
 * We only need ONE tag (31813-20) on amazon.com links.
 * OneLink redirects visitors to their local Amazon store:
 * US, Canada, France, Germany, Italy, Netherlands, Poland, Spain, Sweden, UK
 */

const ONELINK_TAG = process.env.AMAZON_ONELINK_TAG || "31813-20";

export function buildAffiliateUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${ONELINK_TAG}`;
}

export function getAffiliateTag(): string {
  return ONELINK_TAG;
}

export const MARKETPLACE_FLAGS: Record<string, { label: string; flag: string; domain: string }> = {
  "amazon.com": { label: "Amazon US", flag: "\u{1F1FA}\u{1F1F8}", domain: "amazon.com" },
  "amazon.de": { label: "Amazon DE", flag: "\u{1F1E9}\u{1F1EA}", domain: "amazon.de" },
  "amazon.co.uk": { label: "Amazon UK", flag: "\u{1F1EC}\u{1F1E7}", domain: "amazon.co.uk" },
  "amazon.nl": { label: "Amazon NL", flag: "\u{1F1F3}\u{1F1F1}", domain: "amazon.nl" },
  "amazon.fr": { label: "Amazon FR", flag: "\u{1F1EB}\u{1F1F7}", domain: "amazon.fr" },
  "amazon.it": { label: "Amazon IT", flag: "\u{1F1EE}\u{1F1F9}", domain: "amazon.it" },
  "amazon.es": { label: "Amazon ES", flag: "\u{1F1EA}\u{1F1F8}", domain: "amazon.es" },
  "amazon.se": { label: "Amazon SE", flag: "\u{1F1F8}\u{1F1EA}", domain: "amazon.se" },
  "amazon.pl": { label: "Amazon PL", flag: "\u{1F1F5}\u{1F1F1}", domain: "amazon.pl" },
  "amazon.ca": { label: "Amazon CA", flag: "\u{1F1E8}\u{1F1E6}", domain: "amazon.ca" },
};
