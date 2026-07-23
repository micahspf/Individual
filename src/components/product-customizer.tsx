"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductDTO } from "@/lib/products";
import { formatMoney } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export function ProductCustomizer({ product }: { product: ProductDTO }) {
  const addItem = useCart((s) => s.addItem);
  const groups = useMemo(() => {
    const map = new Map<string, typeof product.variants>();
    for (const v of product.variants) {
      const list = map.get(v.name) ?? [];
      list.push(v);
      map.set(v.name, list);
    }
    return [...map.entries()];
  }, [product.variants]);

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const [name, variants] of groups) {
      init[name] = variants[0]?.value ?? "";
    }
    return init;
  });
  const [text, setText] = useState("");
  const [color, setColor] = useState(product.customization.colors?.[0] ?? "#111111");
  const [notes, setNotes] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const priceDiff = product.variants
    .filter((v) => selected[v.name] === v.value)
    .reduce((s, v) => s + v.priceDiff, 0);
  const unitPrice = product.price + priceDiff;
  const cfg = product.customization;

  function onFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast("Please upload an image file");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      toast("Image must be under 4MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function addToCart() {
    if (cfg.allowText && cfg.textMaxLength && text.length > cfg.textMaxLength) {
      toast(`Text max length is ${cfg.textMaxLength}`);
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] || "",
      unitPrice,
      quantity: qty,
      variants: selected,
      customization: {
        text: text || undefined,
        color: cfg.allowColor ? color : undefined,
        imageDataUrl,
        notes: notes || undefined,
      },
    });
    toast("Added to cart");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
          {product.images[activeImage] && (
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          )}
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative h-20 w-20 overflow-hidden rounded-xl border-2",
                  activeImage === i ? "border-foreground" : "border-transparent"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category.name}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatMoney(unitPrice)}</span>
            {product.compareAtPrice && (
              <span className="text-muted-foreground line-through">
                {formatMoney(product.compareAtPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        {groups.map(([name, variants]) => (
          <div key={name} className="space-y-2">
            <Label>
              {name}: <span className="normal-case tracking-normal text-foreground">{selected[name]}</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {variants.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelected((s) => ({ ...s, [name]: v.value }))}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition",
                    selected[name] === v.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  )}
                >
                  {v.value}
                  {v.priceDiff > 0 ? ` (+${formatMoney(v.priceDiff)})` : ""}
                </button>
              ))}
            </div>
          </div>
        ))}

        {(cfg.allowText || cfg.allowColor || cfg.allowImage) && (
          <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-5">
            <h2 className="font-semibold">Personalize</h2>
            {cfg.notes && <p className="text-sm text-muted-foreground">{cfg.notes}</p>}

            {cfg.allowText && (
              <div className="space-y-2">
                <Label htmlFor="custom-text">
                  Custom text {cfg.textMaxLength ? `(max ${cfg.textMaxLength})` : ""}
                </Label>
                <Input
                  id="custom-text"
                  value={text}
                  maxLength={cfg.textMaxLength}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Your text or monogram"
                />
              </div>
            )}

            {cfg.allowColor && cfg.colors && (
              <div className="space-y-2">
                <Label>Accent color</Label>
                <div className="flex flex-wrap gap-2">
                  {cfg.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Color ${c}`}
                      onClick={() => setColor(c)}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 border-white shadow ring-1 ring-border",
                        color === c && "ring-2 ring-foreground"
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {cfg.allowImage && (
              <div className="space-y-2">
                <Label htmlFor="custom-image">Upload artwork</Label>
                <Input
                  id="custom-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFile(e.target.files?.[0])}
                />
                {imageDataUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageDataUrl}
                    alt="Upload preview"
                    className="mt-2 h-24 w-24 rounded-xl object-cover"
                  />
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Order notes (optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Placement, font preference, gift message…"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              type="button"
              className="h-11 w-11 text-lg"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-semibold">{qty}</span>
            <button
              type="button"
              className="h-11 w-11 text-lg"
              onClick={() => setQty((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <Button size="lg" onClick={addToCart} className="flex-1 sm:flex-none">
            Add to cart — {formatMoney(unitPrice * qty)}
          </Button>
        </div>

        {product.longDescription && (
          <div className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
            {product.longDescription}
          </div>
        )}
      </div>
    </div>
  );
}
