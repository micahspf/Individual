import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  /** header | footer | hero */
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
  /** If false, render img only (no link) */
  link?: boolean;
};

const sizes = {
  sm: { h: 36, className: "h-9 w-auto" },
  md: { h: 48, className: "h-12 w-auto" },
  lg: { h: 72, className: "h-16 w-auto sm:h-[4.5rem]" },
};

/**
 * Official Individual wordmark — pink → orange → yellow roots logo.
 * Source: public/brand/logo.jpg
 */
export default function BrandLogo({
  size = "sm",
  className = "",
  priority = false,
  link = true,
}: BrandLogoProps) {
  const s = sizes[size];
  const img = (
    <Image
      src="/brand/logo.jpg"
      alt="Individual"
      width={320}
      height={s.h}
      className={`${s.className} object-contain object-left ${className}`}
      priority={priority}
      sizes={size === "lg" ? "280px" : size === "md" ? "200px" : "160px"}
    />
  );

  if (!link) return img;

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center focus-visible:outline-none"
      aria-label="Individual home"
    >
      {img}
    </Link>
  );
}
