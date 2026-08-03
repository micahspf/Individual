/**
 * Drop phone photos into raw-photos/ as {slug}.jpg|png|webp|heic
 * Run: npm run images
 * Output: public/products/{slug}.avif (1600px long edge, q55)
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { join, extname, basename } from "path";

const INPUT = "raw-photos";
const OUTPUT = "public/products";
const PLACEHOLDER = join(OUTPUT, "placeholder.avif");
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif"]);

mkdirSync(INPUT, { recursive: true });
mkdirSync(OUTPUT, { recursive: true });

if (!existsSync(PLACEHOLDER)) {
  console.warn("Missing placeholder.avif — run: node scripts/make-placeholder.mjs");
}

const files = existsSync(INPUT)
  ? readdirSync(INPUT).filter((f) => EXTS.has(extname(f).toLowerCase()))
  : [];

if (files.length === 0) {
  console.log(`No images in ${INPUT}/. Drop photos named {slug}.jpg then re-run.`);
  console.log("Ensuring product slugs have a fallback image path (placeholder).");
  process.exit(0);
}

let ok = 0;
for (const file of files) {
  const slug = basename(file, extname(file));
  const src = join(INPUT, file);
  const dest = join(OUTPUT, `${slug}.avif`);
  try {
    await sharp(src)
      .rotate() // honor EXIF orientation
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .avif({ quality: 55 })
      .toFile(dest);
    console.log(`✓ ${file} → products/${slug}.avif`);
    ok++;
  } catch (err) {
    console.error(`✗ ${file}:`, err.message);
  }
}

console.log(`Done. ${ok}/${files.length} optimized.`);
