import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    languages: {
      "en": "https://www.skriuwer.com",
      "de": "https://www.skriuwer.com/de",
      "x-default": "https://www.skriuwer.com",
    },
  },
};

export default function GermanLayout({ children }: { children: React.ReactNode }) {
  return <div lang="de">{children}</div>;
}
