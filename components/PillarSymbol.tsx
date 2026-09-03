import type { PillarSlug } from "@/lib/pillars";

const PRIMARY = "#174A3A";
const TERRACOTTA = "#D97745";
const ACCENT = "#6F927F";

export default function PillarSymbol({ slug, size = 36 }: { slug: PillarSlug; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 36 36", "aria-hidden": true } as const;

  switch (slug) {
    case "education":
      return (
        <svg {...common}>
          <rect x="6" y="4" width="24" height="28" rx="3" fill="none" stroke={PRIMARY} strokeWidth="1.5" />
          <line x1="11" y1="14" x2="25" y2="14" stroke={PRIMARY} strokeWidth="1.5" />
          <line x1="11" y1="21" x2="20" y2="21" stroke={TERRACOTTA} strokeWidth="1.5" />
        </svg>
      );
    case "self":
      return (
        <svg {...common}>
          <circle cx="18" cy="21" r="11" fill="none" stroke={PRIMARY} strokeWidth="1.5" />
          <circle cx="18" cy="21" r="3" fill={TERRACOTTA} />
          <line x1="18" y1="10" x2="18" y2="4" stroke={PRIMARY} strokeWidth="1.5" />
        </svg>
      );
    case "environment":
      return (
        <svg {...common}>
          <rect
            x="8.4"
            y="8.4"
            width="19.2"
            height="19.2"
            fill="none"
            stroke={PRIMARY}
            strokeWidth="1.5"
            transform="rotate(45 18 18)"
          />
          <rect x="15" y="15" width="6" height="6" fill={ACCENT} transform="rotate(45 18 18)" />
        </svg>
      );
    case "women":
      return (
        <svg {...common}>
          <circle cx="18" cy="18" r="14" fill="none" stroke={PRIMARY} strokeWidth="1.5" />
          <circle cx="18" cy="18" r="7" fill="none" stroke={TERRACOTTA} strokeWidth="1.5" />
        </svg>
      );
    case "health":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="28" height="28" rx="3" fill="none" stroke={PRIMARY} strokeWidth="1.5" />
          <line x1="18" y1="8" x2="18" y2="28" stroke={TERRACOTTA} strokeWidth="1.5" />
          <line x1="8" y1="18" x2="28" y2="18" stroke={TERRACOTTA} strokeWidth="1.5" />
        </svg>
      );
  }
}
