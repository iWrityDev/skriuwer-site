import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet the Authors",
  description: "Meet the team behind Skriuwer.com — authors and editors passionate about history, mythology, language, and culture.",
  alternates: { canonical: "https://skriuwer.com/team" },
};

const authors = [
  {
    name: "Auke",
    role: "Founder & Author",
    flag: "🏴󠁮󠁬󠁦󠁲󠁿",
    location: "Harkema, Friesland, Netherlands",
    bio: [
      "Auke is a Frisian language advocate and publisher based in Harkema, Friesland. He founded Skriuwer.com out of a deep love for books and a desire to help readers discover outstanding titles across history, mythology, languages, and culture.",
      "Frisian is spoken by roughly 500,000 people, primarily in Friesland, and holds official status alongside Dutch — one of the few minority languages in Europe with genuine legal recognition. Auke has made it his mission to keep that language and culture alive through education and publishing.",
      "A portion of proceeds from Skriuwer's books supports De Fryske Wrâld, a nonprofit foundation dedicated to Frisian language and cultural preservation.",
    ],
    specialties: ["Frisian language & culture", "History", "Mythology", "Publishing"],
  },
  {
    name: "Jennifer Joseph",
    role: "Author & Copywriter",
    flag: "🇺🇸",
    location: "France",
    bio: [
      "Jennifer holds a BA in International Relations from the University of Rochester and an MA in International Law from the Hebrew University of Jerusalem. An American who has lived and worked internationally, she brings a global perspective to her writing.",
      "At Skriuwer.com, Jennifer specialises in books that explore the hidden connections between history, law, and culture — the kind of stories that reveal how ideas shape societies across centuries.",
      "Her background in international law and her years teaching English in China give her an instinct for making complex subjects accessible and compelling to a wide audience.",
    ],
    specialties: ["International history", "Languages", "Cultural connections", "Writing"],
  },
  {
    name: "Yahia Fathy",
    role: "Author & Editor",
    flag: "🇪🇬",
    location: "Spain",
    bio: [
      "Yahia is an Egyptian author and editor based in Spain. Fluent in multiple languages, he has dedicated his career to exploring the histories of nations, empires, and ancient civilizations — combining rigorous research with careful editing to create accurate, engaging narratives.",
      "His philosophy is simple: history is far more than a list of dates and facts. As Yahia puts it, \"History goes beyond lists of dates and facts; it reveals the key stories that have built our world.\"",
      "His work at Skriuwer.com focuses on ancient civilizations — Egypt, Mesopotamia, Rome, Greece — bringing these worlds to life for modern readers.",
    ],
    specialties: ["Ancient civilizations", "World history", "Research & editing", "Multiple languages"],
  },
];

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text-muted)]">Meet the Authors</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Meet the Authors</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mt-3 mb-10 leading-relaxed">
        Skriuwer.com is built by a small international team of authors, editors, and language enthusiasts united by a love of books and a curiosity about history and culture.
      </p>

      <div className="space-y-12">
        {authors.map((author) => (
          <div
            key={author.name}
            className="p-6 sm:p-8 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] flex items-center justify-center text-2xl flex-shrink-0">
                {author.flag}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)]">{author.name}</h2>
                <p className="text-sm font-semibold text-[var(--color-orange-light)] uppercase tracking-wide mt-0.5">
                  {author.role}
                </p>
                <p className="text-xs text-[var(--color-text-dim)] mt-1">{author.location}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-3 text-[var(--color-text-muted)] leading-relaxed">
              {author.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Specialties */}
            <div className="mt-5 flex flex-wrap gap-2">
              {author.specialties.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--color-surface-light)] border border-[var(--color-border)] text-[var(--color-text-muted)] uppercase tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* De Fryske Wrald mission box */}
      <div className="mt-12 p-6 bg-[var(--color-surface)] border border-[var(--color-orange)]/30 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xl">🏴󠁮󠁬󠁦󠁲󠁿</span>
          <h2 className="text-base font-bold text-[var(--color-text)]">Our Mission & De Fryske Wrâld</h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          Skriuwer — &ldquo;writer&rdquo; in Frisian — was born from a belief that great books deserve to be discovered. Beyond curating books, we support the preservation of the Frisian language. A portion of proceeds from our book sales supports{" "}
          <strong className="text-[var(--color-text)]">De Fryske Wrâld</strong>, a nonprofit foundation working to keep the Frisian language and culture alive for future generations.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/about" className="text-sm text-[var(--color-orange-light)] hover:underline font-semibold">
            About Skriuwer.com →
          </Link>
          <a
            href="https://learnfrisian.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-orange-light)] hover:underline font-semibold"
          >
            Learn Frisian →
          </a>
          <Link href="/category/frisian" className="text-sm text-[var(--color-orange-light)] hover:underline font-semibold">
            Frisian Books →
          </Link>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-8 text-center text-sm text-[var(--color-text-dim)]">
        Interested in collaborating?{" "}
        <Link href="/contact" className="text-[var(--color-orange-light)] hover:underline font-semibold">
          Get in touch
        </Link>
      </div>
    </div>
  );
}
