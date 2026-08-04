import { readFileSync, writeFileSync } from "fs";

const personalizableSlugs = new Set([
  "personalized-tumbler",
  "personalized-can-cooler",
  "insulated-water-bottle",
  "engraved-coffee-mug",
  "custom-wood-sign",
  "smith-lake-sign",
  "engraved-cutting-board",
  "monogram-coaster-set",
  "welcome-doormat-plate",
  "couple-keepsake-sign",
  "memorial-garden-plaque",
  "pet-id-tag",
  "bag-tag-keychain",
  "desk-name-plate",
  "fidget-slider",
  "custom-stress-ball",
  "sensory-putty-tin",
  "magnetic-fidget-slider",
  "quiet-click-pad",
  "desk-name-plate",
]);

let s = readFileSync("lib/data/products.ts", "utf8");
if (s.includes("personalizable: true")) {
  console.log("already has personalizable flags");
  process.exit(0);
}

s = s.replace(/image: img\("([^"]+)"\),/g, (m, slug) => {
  if (!personalizableSlugs.has(slug)) return m;
  return `${m}\n    personalizable: true,\n    maxChars: 30,`;
});

writeFileSync("lib/data/products.ts", s);
console.log("personalizable count", (s.match(/personalizable: true/g) || []).length);
