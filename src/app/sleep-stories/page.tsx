import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "History Sleep Stories: Fall Asleep to History & Mythology (Free on YouTube)",
  description:
    "65+ free sleep stories about ancient Rome, Egypt, Greece, the Ottomans, Aztecs, Vikings, and more. Long-form YouTube videos narrated for sleep. No ads after the first minute.",
  alternates: { canonical: "https://www.skriuwer.com/sleep-stories" },
  openGraph: {
    title: "History Sleep Stories: Fall Asleep to History & Mythology",
    description:
      "65+ free sleep stories about ancient Rome, Egypt, Greece, the Ottomans, Aztecs, Vikings, and more. Long-form YouTube videos narrated for sleep.",
    url: "https://www.skriuwer.com/sleep-stories",
    type: "website",
  },
};

const TOPIC_GROUPS = [
  {
    label: "Ancient Civilizations",
    keywords: ["rome", "roman", "greek", "egypt", "babylon", "mesopotamia", "persian", "assyrian", "minoan", "hittite", "olmec", "indus-valley", "carthage", "ancient-civilization", "ancient-history", "bronze-age", "stone-age"],
  },
  {
    label: "Pre-Columbian Americas",
    keywords: ["maya", "aztec", "inca"],
  },
  {
    label: "Asian & Middle Eastern History",
    keywords: ["japanese", "china", "ottoman", "islam", "israelite"],
  },
  {
    label: "Medieval & Renaissance",
    keywords: ["medieval", "crusader", "gothic", "peasant", "knights-templar", "queen-elizabeth"],
  },
  {
    label: "Empires & Colonialism",
    keywords: ["british-empire", "african-kingdom", "african-colonization", "napoleon"],
  },
  {
    label: "Wars & Disasters",
    keywords: ["ww1", "ww2", "civil-war", "war-history", "black-death", "spanish-flu", "pompeii"],
  },
  {
    label: "Mythology & Legends",
    keywords: ["greek-mythology", "celtic-mythology", "norse", "mythology-for-sleep"],
  },
  {
    label: "Mysteries & Lost Worlds",
    keywords: ["lost-kingdoms", "mysteries", "seven-wonders", "alternate-history", "ritual"],
  },
  {
    label: "World & General History",
    keywords: ["world-history", "european-history", "us-history", "dark-history", "history-stories", "ancient-ritual", "christmas", "african"],
  },
];

function matchesGroup(slug: string, keywords: string[]): boolean {
  return keywords.some((kw) => slug.includes(kw));
}

export default function SleepStoriesPage() {
  const all = getAllBlogPosts();
  const sleepPosts = all.filter((p) => p.categories.includes("sleep-stories"));

  // Group posts
  const grouped: { label: string; posts: typeof sleepPosts }[] = [];
  const assigned = new Set<string>();

  for (const group of TOPIC_GROUPS) {
    const matches = sleepPosts.filter(
      (p) => !assigned.has(p.slug) && matchesGroup(p.slug, group.keywords)
    );
    if (matches.length > 0) {
      matches.forEach((p) => assigned.add(p.slug));
      grouped.push({ label: group.label, posts: matches });
    }
  }

  // Catch-all for unassigned
  const unassigned = sleepPosts.filter((p) => !assigned.has(p.slug));
  if (unassigned.length > 0) {
    grouped.push({ label: "More Sleep Stories", posts: unassigned });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--color-text-dim)] mb-6">
        <Link href="/" className="hover:text-[var(--color-orange-light)]">Home</Link>
        {" / "}
        <span className="text-[var(--color-text)]">Sleep Stories</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-7 bg-[var(--color-orange)] rounded-full" />
        <h1 className="text-3xl font-bold text-[var(--color-text)]">History Sleep Stories</h1>
      </div>
      <p className="text-[var(--color-text-muted)] mb-4 ml-5 text-base leading-relaxed max-w-2xl">
        Long-form history narrated at a sleep pace. Ancient civilizations, lost empires, medieval
        life, wars, mythology — every topic below has a dedicated video from{" "}
        <a
          href="https://www.youtube.com/@sleepylanguage"
          target="_blank"
          rel="noopener"
          className="text-[var(--color-orange-light)] hover:underline"
        >
          Learn While You Sleep
        </a>
        , free on YouTube, designed to carry you through the night.
      </p>

      {/* Channel callout */}
      <div className="ml-5 mb-10 p-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl max-w-2xl">
        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          <strong className="text-[var(--color-text)]">Why these work for sleep:</strong> The narration
          is deliberately slow and even — no music spikes, no dramatic sound effects, no sudden
          volume jumps. Each video runs 3–8 hours, long enough to last a full night. The content is
          genuinely researched history, not just a recitation of Wikipedia.
        </p>
        <a
          href="https://www.youtube.com/@sleepylanguage"
          target="_blank"
          rel="noopener"
          className="mt-3 inline-block text-xs font-semibold text-[var(--color-orange)] hover:underline"
        >
          → Subscribe to Learn While You Sleep on YouTube
        </a>
      </div>

      {/* Post count */}
      <p className="text-sm text-[var(--color-text-dim)] mb-6 ml-5">
        {sleepPosts.length} sleep story guides, grouped by topic
      </p>

      {/* Grouped sections */}
      <div className="space-y-10">
        {grouped.map((group) => (
          <section key={group.label}>
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
              <span className="w-0.5 h-4 bg-[var(--color-orange)] rounded-full inline-block" />
              {group.label}
            </h2>
            <div className="space-y-2">
              {group.posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-4 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-orange)] transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[var(--color-text)] group-hover:text-[var(--color-orange)] transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 text-xs text-[var(--color-orange-light)] font-semibold hidden sm:block">
                    Watch →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-center">
        <p className="text-sm text-[var(--color-text-muted)] mb-3">
          New sleep story videos added to the channel regularly.
        </p>
        <a
          href="https://www.youtube.com/@sleepylanguage"
          target="_blank"
          rel="noopener"
          className="inline-block px-5 py-2 bg-[var(--color-orange)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Subscribe on YouTube
        </a>
        <p className="mt-4 text-xs text-[var(--color-text-dim)]">
          Want books on the topics you just listened to?{" "}
          <Link href="/best-history-books" className="text-[var(--color-orange-light)] hover:underline">
            Browse our history book recommendations →
          </Link>
        </p>
      </div>
    </div>
  );
}
