export interface Author {
  slug: string;
  name: string;
  role: string;
  flag: string;
  location: string;
  bio: string[];
  specialties: string[];
  categoryLinks: { label: string; slug: string }[];
}

export const AUTHORS: Author[] = [
  {
    slug: "auke",
    name: "Auke",
    role: "Founder & Author",
    flag: "🏴󠁮󠁬󠁦󠁲󠁿",
    location: "Friesland, Netherlands",
    bio: [
      "Auke is a Frisian language advocate, publisher, and author based in Friesland. He founded Skriuwer.com out of a deep love for books and a desire to help readers discover outstanding titles across history, mythology, languages, and culture.",
      "Frisian is spoken by roughly 500,000 people, primarily in Friesland, and holds official status alongside Dutch, one of the few minority languages in Europe with genuine legal recognition. Auke has made it his mission to keep that language and culture alive through education and publishing.",
      "His history and mythology books are available in over a dozen languages and have been read by tens of thousands of readers across Europe and North America. A portion of proceeds from all Skriuwer books supports De Fryske Wrâld, a nonprofit foundation dedicated to Frisian language and cultural preservation.",
    ],
    specialties: ["Frisian language & culture", "History", "Mythology", "Publishing", "Language Learning"],
    categoryLinks: [
      { label: "History Books", slug: "history" },
      { label: "Mythology Books", slug: "mythology" },
      { label: "Frisian Books", slug: "frisian" },
      { label: "Language Learning", slug: "language-learning" },
      { label: "Conspiracy Books", slug: "conspiracy" },
    ],
  },
  {
    slug: "jennifer-joseph",
    name: "Jennifer Joseph",
    role: "Author & Copywriter",
    flag: "🇺🇸",
    location: "France",
    bio: [
      "Jennifer holds a BA in International Relations from the University of Rochester and an MA in International Law from the Hebrew University of Jerusalem. An American who has lived and worked internationally, she brings a global perspective to her writing.",
      "At Skriuwer.com, Jennifer specialises in books that explore the hidden connections between history, law, and culture, the kind of stories that reveal how ideas shape societies across centuries.",
      "Her background in international law and her years teaching English in China give her an instinct for making complex subjects accessible and compelling to a wide audience.",
    ],
    specialties: ["International history", "Languages", "Cultural connections", "Psychology", "Writing"],
    categoryLinks: [
      { label: "Biography Books", slug: "biography" },
      { label: "Psychology Books", slug: "psychology" },
      { label: "Language Learning", slug: "language-learning" },
      { label: "Philosophy Books", slug: "philosophy" },
    ],
  },
  {
    slug: "yahia-fathy",
    name: "Yahia Fathy",
    role: "Author & Editor",
    flag: "🇪🇬",
    location: "Spain",
    bio: [
      "Yahia is an Egyptian author and editor based in Spain. Fluent in multiple languages, he has dedicated his career to exploring the histories of nations, empires, and ancient civilizations, combining rigorous research with careful editing to create accurate, engaging narratives.",
      "His philosophy is simple: history goes beyond lists of dates and facts; it reveals the key stories that have built our world. Every book he writes or edits aims to capture that human dimension.",
      "His work at Skriuwer.com focuses on ancient civilizations, Egypt, Mesopotamia, Rome, Greece, bringing these worlds to life for modern readers.",
    ],
    specialties: ["Ancient civilizations", "Mythology", "World history", "Research & editing", "Multiple languages"],
    categoryLinks: [
      { label: "Mythology Books", slug: "mythology" },
      { label: "Ancient Civilizations", slug: "ancient-civilizations" },
      { label: "History Books", slug: "history" },
      { label: "Dark History", slug: "dark-history" },
    ],
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}
