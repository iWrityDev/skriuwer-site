export interface Book {
  slug: string;
  asin: string | null;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  coverImageFallback: string | null;
  categories: string[];
  tags: string[];
  language: string;
  pages: number | null;
  price: string | null;
  currency: string;
  reviewCount: number;
  starRating: number | null;
  marketplaces: Record<string, string>;
  isOwnBook: boolean;
  hookText: string | null;
  publishedDate: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  oldUrl: string;
  categories: string[];
  content: string;
  image: string | null;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  /** CSS variable name (without `var(...)`) defined in globals.css, e.g. "--cat-history". */
  cssVar?: string;
}
