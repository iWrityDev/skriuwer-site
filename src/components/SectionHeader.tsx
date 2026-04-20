import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  /** Tone picks which gradient the accent bar uses. Default = orange. */
  tone?: "orange" | "gold" | "teal";
  /** Optional trailing link (e.g. "Browse all →"). */
  link?: { href: string; label: string };
  /** Optional lead-in subtitle shown under the title. */
  subtitle?: string;
  /** Optional emoji / icon rendered next to the title. */
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
};

export function SectionHeader({
  title,
  tone = "orange",
  link,
  subtitle,
  icon,
  size = "md",
}: Props) {
  const headerClass =
    "section-header" +
    (tone === "gold" ? " section-header-gold" : "") +
    (tone === "teal" ? " section-header-teal" : "");
  const titleClass =
    size === "lg"
      ? "text-2xl md:text-3xl font-extrabold"
      : size === "sm"
      ? "text-base font-bold"
      : "text-xl font-bold";

  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="min-w-0">
        <div className={headerClass}>
          <span className="accent-bar" />
          {icon && <span className="text-xl leading-none">{icon}</span>}
          <h2 className={`${titleClass} text-[var(--color-text)]`}>{title}</h2>
        </div>
        {subtitle && (
          <p className="mt-2 ml-[calc(4px+0.75rem)] text-sm text-[var(--color-text-muted)] max-w-prose">
            {subtitle}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className="flex-shrink-0 text-sm text-[var(--color-orange-light)] hover:text-[var(--color-orange)] transition-colors whitespace-nowrap self-center"
        >
          {link.label} →
        </Link>
      )}
    </div>
  );
}
