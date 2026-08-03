"use client";

import Image from "next/image";
import { useState } from "react";
import { PRODUCT_IMAGE_PLACEHOLDER } from "@/lib/data/products";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * next/image with automatic fallback to neutral placeholder when product photo missing.
 */
export default function ProductImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
}: Props) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      onError={() => {
        if (current !== PRODUCT_IMAGE_PLACEHOLDER) {
          setCurrent(PRODUCT_IMAGE_PLACEHOLDER);
        }
      }}
    />
  );
}
