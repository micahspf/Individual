"use client";

import { useState } from "react";
import { addToCart, type EngravingFont } from "@/lib/cart/store";

type Props = {
  id: string;
  slug: string;
  name: string;
  price: number;
  personalizable?: boolean;
  maxChars?: number;
};

export default function AddToCartButton({
  id,
  slug,
  name,
  price,
  personalizable = false,
  maxChars = 30,
}: Props) {
  const [added, setAdded] = useState(false);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [font, setFont] = useState<EngravingFont>("sans");
  const [error, setError] = useState("");

  function handleAdd() {
    setError("");
    if (personalizable) {
      const t = line1.trim();
      if (!t) {
        setError("Line 1 is required for engraving.");
        return;
      }
      if (t.length > maxChars) {
        setError(`Line 1 must be ${maxChars} characters or fewer.`);
        return;
      }
    }

    addToCart({
      id,
      slug,
      name,
      price,
      isTokenOnly: false,
      line1: personalizable ? line1.trim() : undefined,
      line2: personalizable ? line2.trim() || undefined : undefined,
      font: personalizable ? font : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {personalizable && (
        <div className="glass-pink space-y-4 p-5">
          <div>
            <h3 className="font-display text-lg font-medium text-zinc-50">
              Engraving details
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              Exactly what you type is what gets engraved. Check spelling before adding to cart.
            </p>
          </div>

          <div>
            <label className="mb-1.5 flex justify-between text-sm text-zinc-300">
              <span>
                Line 1 <span className="text-pink-400">*</span>
              </span>
              <span className="tabular-nums text-zinc-400">
                {line1.length}/{maxChars}
              </span>
            </label>
            <input
              type="text"
              required
              maxLength={maxChars}
              value={line1}
              onChange={(e) => setLine1(e.target.value.slice(0, maxChars))}
              className="input-glass"
              placeholder="Name, monogram, or main text"
            />
          </div>

          <div>
            <label className="mb-1.5 flex justify-between text-sm text-zinc-300">
              <span>Line 2 (optional)</span>
              <span className="tabular-nums text-zinc-400">
                {line2.length}/{maxChars}
              </span>
            </label>
            <input
              type="text"
              maxLength={maxChars}
              value={line2}
              onChange={(e) => setLine2(e.target.value.slice(0, maxChars))}
              className="input-glass"
              placeholder="Date, short message, or second line"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-zinc-300">Font</label>
            <select
              value={font}
              onChange={(e) => setFont(e.target.value as EngravingFont)}
              className="input-glass"
            >
              <option value="serif">Serif</option>
              <option value="sans">Sans</option>
              <option value="script">Script</option>
            </select>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleAdd}
        className="btn-pill-pink w-full px-10 py-3.5 sm:w-auto"
      >
        {added ? "Added to cart ✓" : "Add to cart"}
      </button>
    </div>
  );
}
