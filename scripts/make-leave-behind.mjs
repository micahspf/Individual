/**
 * Render the printable sales leave-behinds in scripts/leave-behind/*.html to
 * PDFs in public/.
 *
 *     npm run leave-behind
 *
 * These are one-page pieces handed to a business owner in person, so they are
 * built on a light background (they get printed) and are fully self-contained —
 * brand fonts and the logo are embedded as base64, so no network is needed at
 * render time and the .html opens correctly on any machine.
 *
 * Like scripts/make-ai-pdf.py, this is a one-off asset generator rather than
 * part of the site build, so it adds no npm dependencies: it drives whatever
 * Chrome/Chromium/Edge is already installed. Set CHROMIUM_PATH to override.
 *
 * To edit the copy, open the .html directly — it is plain HTML and CSS.
 */
import { execFile } from "node:child_process";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { promisify } from "node:util";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "scripts", "leave-behind");
const OUT = path.join(ROOT, "public");

const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  // Playwright's bundled Chromium (present in CI / dev containers)
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/opt/pw-browsers/chromium/chrome",
  // Linux
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
  // macOS
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  // Windows
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

function findBrowser() {
  const found = CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      "No Chrome/Chromium/Edge found. Install one, or set CHROMIUM_PATH to its executable."
    );
  }
  return found;
}

async function main() {
  const browser = findBrowser();
  const files = (await readdir(SRC)).filter((f) => f.endsWith(".html"));
  if (files.length === 0) {
    console.error(`No .html sources found in ${SRC}`);
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });

  for (const file of files) {
    const src = path.join(SRC, file);
    const out = path.join(OUT, file.replace(/\.html$/, ".pdf"));
    await execFileAsync(
      browser,
      [
        "--headless",
        "--no-sandbox",
        "--disable-gpu",
        "--no-pdf-header-footer",
        // Page size and margins come from the stylesheet's @page rule.
        `--print-to-pdf=${out}`,
        "file://" + src.split(path.sep).join("/"),
      ],
      { timeout: 120000 }
    );
    console.log(`${file}  ->  public/${path.basename(out)}`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
