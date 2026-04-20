import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "history",
    name: "History",
    description:
      "Explore the past through comprehensive books on countries, civilizations, and world-changing events.",
    keywords: ["history", "historical", "ancient", "war", "civilization"],
    cssVar: "--cat-history",
  },
  {
    slug: "mythology",
    name: "Mythology",
    description:
      "The myths and legends of ancient civilizations, from Greek gods to Norse warriors.",
    keywords: ["mythology", "myth", "legends", "gods", "norse", "greek"],
    cssVar: "--cat-mythology",
  },
  {
    slug: "language-learning",
    name: "Language Learning",
    description:
      "Master new languages with bilingual stories, vocabulary exercises, and practical guides.",
    keywords: [
      "language",
      "bilingual",
      "stories",
      "vocabulary",
      "learning",
      "kurzgeschichten",
      "zweisprachige",
    ],
    cssVar: "--cat-language-learning",
  },
  {
    slug: "frisian",
    name: "Frisian Language",
    description:
      "Resources for learning Frisian, one of Europe's most fascinating minority languages.",
    keywords: ["frisian", "frysk", "west frisian", "friesland"],
    cssVar: "--cat-frisian",
  },
  {
    slug: "dark-history",
    name: "Dark History",
    description:
      "The brutal, scary, and disturbing facts from history that textbooks leave out.",
    keywords: ["scary", "dark", "horror", "brutal", "gruesome", "facts"],
    cssVar: "--cat-dark-history",
  },
  {
    slug: "conspiracy",
    name: "Conspiracy & Hidden History",
    description:
      "Explore controversial theories, cover-ups, and hidden chapters of history.",
    keywords: ["conspiracy", "hidden", "secret", "cover-up", "controversial"],
    cssVar: "--cat-conspiracy",
  },
  {
    slug: "religion",
    name: "Religion & Spirituality",
    description:
      "Books exploring religious history, biblical texts, and spiritual traditions.",
    keywords: ["bible", "religion", "spiritual", "church", "faith"],
    cssVar: "--cat-religion",
  },
  {
    slug: "self-help",
    name: "Self-Help & Motivation",
    description:
      "Books on personal development, productivity, and living your best life.",
    keywords: ["self-help", "motivation", "mindset", "productivity", "habits"],
    cssVar: "--cat-self-help",
  },
  {
    slug: "fiction",
    name: "Fiction",
    description:
      "Bestselling fiction across all genres, from literary to thriller.",
    keywords: ["fiction", "novel", "story", "thriller", "romance"],
    cssVar: "--cat-fiction",
  },
  {
    slug: "science",
    name: "Science & Nature",
    description:
      "Discover the wonders of science, technology, and the natural world.",
    keywords: ["science", "nature", "technology", "physics", "biology"],
    cssVar: "--cat-science",
  },
  {
    slug: "biography",
    name: "Biography & Memoir",
    description: "True stories of remarkable lives, from world leaders and explorers to artists and athletes.",
    keywords: ["biography", "memoir", "autobiography", "life story", "true story", "real life"],
    cssVar: "--cat-biography",
  },
  {
    slug: "business",
    name: "Business & Finance",
    description: "Books on entrepreneurship, investing, leadership, and building wealth.",
    keywords: ["business", "finance", "investing", "entrepreneur", "leadership", "money", "wealth", "startup"],
    cssVar: "--cat-business",
  },
  {
    slug: "psychology",
    name: "Psychology & Mind",
    description: "Understand human behaviour, cognition, emotions, and what drives us.",
    keywords: ["psychology", "mind", "brain", "behaviour", "cognitive", "mental", "emotion", "thinking"],
    cssVar: "--cat-psychology",
  },
  {
    slug: "true-crime",
    name: "True Crime",
    description: "Gripping accounts of real murders, heists, cults, and criminal masterminds.",
    keywords: ["true crime", "murder", "serial killer", "crime", "detective", "heist", "cult", "criminal"],
    cssVar: "--cat-true-crime",
  },
  {
    slug: "philosophy",
    name: "Philosophy",
    description: "From Plato to Nietzsche, books that challenge how you think about existence and meaning.",
    keywords: ["philosophy", "stoic", "stoicism", "ethics", "logic", "metaphysics", "existential", "plato", "aristotle", "nietzsche"],
    cssVar: "--cat-philosophy",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * CSS variable for a given category slug, or the fallback accent.
 * Use as: style={{ "--cat-color": `var(${getCategoryCssVar(slug)})` }}
 */
export function getCategoryCssVar(slug?: string | null): string {
  if (!slug) return "--cat-fallback";
  const cat = CATEGORIES.find((c) => c.slug === slug);
  return cat?.cssVar ?? "--cat-fallback";
}

/**
 * Pick the best "primary" category slug from a book's categories array,
 * used to color the book card. Prefers the first non-"general" slug.
 */
export function primaryCategorySlug(categories: string[] | undefined): string | null {
  if (!categories || categories.length === 0) return null;
  for (const slug of categories) {
    if (slug && slug !== "general") return slug;
  }
  return null;
}

export function classifyBook(
  title: string,
  tags: string[],
  description: string
): string[] {
  const text = `${title} ${tags.join(" ")} ${description}`.toLowerCase();
  const matched: string[] = [];

  for (const cat of CATEGORIES) {
    if (cat.keywords.some((kw) => text.includes(kw))) {
      matched.push(cat.slug);
    }
  }

  return matched.length > 0 ? matched : ["general"];
}
