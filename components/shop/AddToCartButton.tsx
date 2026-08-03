"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart/store";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
};

export default function AddToCartButton({ id, slug, name, price }: Props) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({ id, slug, name, price, isTokenOnly: false });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="btn-pill-pink w-full sm:w-auto px-10 py-3.5"
    >
      {added ? "Added to cart ✓" : "Add to cart"}
    </button>
  );
}
