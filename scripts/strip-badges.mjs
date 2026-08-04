import { readFileSync, writeFileSync } from "fs";

let s = readFileSync("lib/data/products.ts", "utf8");
s = s.replace(/\n\s*badge: ['"][^'"]*['"],/g, "");
// Interface: remove badge optional line
s = s.replace(/\n\s*badge\?: string;/g, "");
// Add personalizable + maxChars to interface after personalize line
if (!s.includes("personalizable?: boolean")) {
  s = s.replace(
    /personalize\?: string\[\];/,
    `personalize?: string[];
  /** When true, Line 1 engraving is required at add-to-cart */
  personalizable?: boolean;
  maxChars?: number;`
  );
}
writeFileSync("lib/data/products.ts", s);
console.log("badges left:", (s.match(/\bbadge:/g) || []).length);
