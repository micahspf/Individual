import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse the Individual catalog — personalized drinkware, signs, fidget and sensory pieces, and made-to-order commissions from Cullman, Alabama.",
  alternates: { canonical: "https://www.madebyindividual.com/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
