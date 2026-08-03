import sharp from "sharp";

const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1c1c21"/>
  <rect x="0" y="0" width="1200" height="8" fill="#ec4899"/>
  <text x="80" y="280" fill="#f4f4f5" font-family="system-ui,sans-serif" font-size="64" font-weight="700">Made by Individual</text>
  <text x="80" y="360" fill="#f9a8d4" font-family="system-ui,sans-serif" font-size="32">Custom 3D print &amp; laser engraving</text>
  <text x="80" y="420" fill="#a1a1aa" font-family="system-ui,sans-serif" font-size="24">Cullman, Alabama · Made to order</text>
  <text x="80" y="540" fill="#facc15" font-family="system-ui,sans-serif" font-size="22">madebyindividual.com</text>
</svg>`);

await sharp(svg).png().toFile("app/opengraph-image.png");
console.log("Wrote app/opengraph-image.png 1200x630");
