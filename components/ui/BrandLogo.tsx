import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** sm = header, md = footer, lg = hero */
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  /** If false, render mark only (no link) */
  link?: boolean;
  /** Centered hero presentation with ambient aura */
  hero?: boolean;
};

/**
 * Transparent Individual wordmark (black plate removed).
 * Soft ambient glow so it floats on the page — no hard box.
 */
export default function BrandLogo({
  size = "sm",
  className = "",
  priority = false,
  link = true,
  hero = false,
}: BrandLogoProps) {
  const dims = {
    sm: { w: 148, h: 58, img: "h-8 w-auto sm:h-9" },
    md: { w: 200, h: 79, img: "h-11 w-auto" },
    lg: { w: 420, h: 166, img: "h-[4.25rem] w-auto sm:h-24 md:h-[6.5rem]" },
  }[size];

  const mark = (
    <span
      className={[
        "brand-logo relative inline-flex items-center justify-center",
        hero ? "brand-logo--hero" : "brand-logo--inline",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Soft ambient aura — pink/orange/yellow bloom, not a box */}
      <span className="brand-logo__glow" aria-hidden />
      <span className="brand-logo__glow brand-logo__glow--soft" aria-hidden />

      <Image
        src="/brand/logo-mark.webp"
        alt="Individual"
        width={dims.w}
        height={dims.h}
        className={`brand-logo__img relative z-[1] ${dims.img} object-contain object-center`}
        priority={priority}
        sizes={
          size === "lg"
            ? "(max-width: 640px) 220px, (max-width: 1024px) 320px, 420px"
            : size === "md"
              ? "200px"
              : "160px"
        }
      />
    </span>
  );

  if (!link) return mark;

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d8a]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a12] rounded-sm"
      aria-label="Individual home"
    >
      {mark}
    </Link>
  );
}
