import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public/products", { recursive: true });

const svg = `<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2a2a33"/>
      <stop offset="100%" stop-color="#1c1c21"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <text x="400" y="500" text-anchor="middle" fill="#52525b" font-family="system-ui,sans-serif" font-size="28">Photo coming soon</text>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf).avif({ quality: 55 }).toFile("public/products/placeholder.avif");
await sharp(buf).png().toFile("public/products/placeholder.png");
console.log("Wrote public/products/placeholder.avif + .png");
