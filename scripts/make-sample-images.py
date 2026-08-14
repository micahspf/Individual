"""Generate branded sample images for products without photos.

Run: python scripts/make-sample-images.py && npm run images
Real photos replace these by dropping {slug}.jpg into raw-photos/ and re-running
npm run images (the manifest updates automatically).

Output: raw-photos/{slug}.png (1280x1600, 4:5 like the product cards).
Then `npm run images` converts to public/products/{slug}.avif and updates
the manifest. Real photos later replace these by dropping files with the
same slug into raw-photos/ and re-running.
"""
import hashlib
import math
import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

REPO = r"C:\Users\micah\Documents\Individual"
OUT = os.path.join(REPO, "raw-photos")
W, H = 1280, 1600

SERIF = r"C:\Windows\Fonts\georgiab.ttf"
SANS = r"C:\Windows\Fonts\segoeui.ttf"
SANSB = r"C:\Windows\Fonts\segoeuib.ttf"

CATS = {
    "drinkware": ("DRINKWARE", (255, 45, 138)),
    "home": ("HOME & GIFTS", (255, 140, 66)),
    "fidget-sensory": ("FIDGET & SENSORY", (255, 122, 184)),
    "3d-printed": ("FABRICATED", (255, 225, 74)),
}

def load_products():
    """Every product in lib/data/products.ts — samples for all of them.
    A real photo later replaces a sample by overwriting raw-photos/{slug}.png
    (or .jpg) and re-running npm run images."""
    import re
    src = open(os.path.join(REPO, "lib", "data", "products.ts"), encoding="utf-8").read()
    found = re.findall(
        r'name:\s*"([^"]+)",\s*slug:\s*"([^"]+)",.*?category:\s*"([^"]+)"', src, re.S
    )
    return [(n, sl, c) for n, sl, c in found if c in CATS]


PRODUCTS = load_products()


def seeded(slug: str):
    h = hashlib.sha256(slug.encode()).digest()
    i = [0]

    def nxt(lo, hi):
        v = h[i[0] % len(h)]
        i[0] += 1
        return lo + (v / 255.0) * (hi - lo)

    return nxt


def background(accent):
    img = Image.new("RGB", (W, H))
    top, bottom = (14, 14, 23), (23, 23, 36)
    for y in range(H):
        t = y / H
        img.paste(
            tuple(int(top[c] + (bottom[c] - top[c]) * t) for c in range(3)),
            (0, y, W, y + 1),
        )
    # accent aura behind the silhouette
    glow = Image.new("RGB", (W, H), (0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((W * 0.12, H * 0.10, W * 0.88, H * 0.58), fill=tuple(int(c * 0.30) for c in accent))
    glow = glow.filter(ImageFilter.GaussianBlur(180))
    return Image.blend(img, Image.blend(img, glow, 0.5), 0.9), None


def sparkle(d, x, y, r, color):
    d.line((x - r, y, x + r, y), fill=color, width=3)
    d.line((x, y - r, x, y + r), fill=color, width=3)
    s = r * 0.45
    d.line((x - s, y - s, x + s, y + s), fill=color, width=2)
    d.line((x - s, y + s, x + s, y - s), fill=color, width=2)


def rounded(d, box, rad, **kw):
    d.rounded_rectangle(box, radius=rad, **kw)


def draw_drinkware(d, cx, cy, accent, soft):
    bw, bh = 300, 560
    rounded(d, (cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2), 60, outline=accent, width=8)
    # lid
    rounded(d, (cx - bw / 2 - 16, cy - bh / 2 - 60, cx + bw / 2 + 16, cy - bh / 2 + 10), 24, outline=soft, width=7)
    # engraving lines
    d.line((cx - 90, cy + 40, cx + 90, cy + 40), fill=soft, width=6)
    d.line((cx - 60, cy + 90, cx + 60, cy + 90), fill=soft, width=5)


def draw_home(d, cx, cy, accent, soft):
    bw, bh = 560, 360
    rounded(d, (cx - bw / 2, cy - bh / 2, cx + bw / 2, cy + bh / 2), 36, outline=accent, width=8)
    # hanging rope
    d.line((cx - bw / 2 + 70, cy - bh / 2, cx, cy - bh / 2 - 120), fill=soft, width=6)
    d.line((cx + bw / 2 - 70, cy - bh / 2, cx, cy - bh / 2 - 120), fill=soft, width=6)
    d.ellipse((cx - 9, cy - bh / 2 - 132, cx + 9, cy - bh / 2 - 114), outline=soft, width=5)
    # engraved name line
    d.line((cx - 160, cy - 20, cx + 160, cy - 20), fill=soft, width=7)
    d.line((cx - 100, cy + 50, cx + 100, cy + 50), fill=soft, width=5)


def draw_fidget(d, cx, cy, accent, soft):
    bw = 440
    rounded(d, (cx - bw / 2, cy - bw / 2, cx + bw / 2, cy + bw / 2), 120, outline=accent, width=8)
    # pop-dot grid
    for gy in range(3):
        for gx in range(3):
            px = cx - 120 + gx * 120
            py = cy - 120 + gy * 120
            d.ellipse((px - 38, py - 38, px + 38, py + 38), outline=soft, width=6)


def draw_fab(d, cx, cy, accent, soft):
    # layered print slices building a form
    for i, wdt in enumerate([460, 420, 380, 330, 270, 200, 120]):
        y = cy + 180 - i * 62
        d.line((cx - wdt / 2, y, cx + wdt / 2, y), fill=accent if i % 2 == 0 else soft, width=10)
    d.line((cx, cy - 240, cx, cy + 200), fill=soft, width=4)




def draw_mug(d, cx, cy, accent, soft):
    """Coffee-mug variant: shorter body + attached handle."""
    bw, bh = 340, 400
    rounded(d, (cx - bw / 2 - 40, cy - bh / 2 + 40, cx + bw / 2 - 40, cy + bh / 2 + 40), 44, outline=accent, width=8)
    d.arc((cx + bw / 2 - 95, cy - 40, cx + bw / 2 + 45, cy + 160), start=-70, end=70, fill=accent, width=8)
    d.line((cx - 130, cy + 20, cx + 50, cy + 20), fill=soft, width=6)
    d.line((cx - 100, cy + 70, cx + 20, cy + 70), fill=soft, width=5)

SLUG_OVERRIDES = {"engraved-coffee-mug": draw_mug}

SILHOUETTES = {
    "drinkware": draw_drinkware,
    "home": draw_home,
    "fidget-sensory": draw_fidget,
    "3d-printed": draw_fab,
}


def wrap_text(text, font, maxw, d):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def gradient_rule(img, x, y, width, height=6):
    stops = [(0.0, (255, 45, 138)), (0.48, (255, 140, 66)), (1.0, (255, 225, 74))]
    d = ImageDraw.Draw(img)
    steps = 200
    for i in range(steps):
        t = i / (steps - 1)
        for j in range(len(stops) - 1):
            t0, c0 = stops[j]
            t1, c1 = stops[j + 1]
            if t0 <= t <= t1:
                f = 0 if t1 == t0 else (t - t0) / (t1 - t0)
                col = tuple(int(c0[k] + (c1[k] - c0[k]) * f) for k in range(3))
                break
        seg = width / steps
        d.rectangle((x + i * seg, y, x + (i + 1) * seg + 1, y + height), fill=col)


def make(name, slug, cat):
    label, accent = CATS[cat]
    soft = tuple(min(255, int(c * 0.55 + 100)) for c in accent)
    dim = tuple(int(c * 0.45) for c in accent)

    img, _ = background(accent)
    d = ImageDraw.Draw(img)

    nxt = seeded(slug)
    for _ in range(7):
        sx, sy = nxt(80, W - 80), nxt(80, H * 0.55)
        sparkle(d, sx, sy, nxt(10, 26), dim)

    SLUG_OVERRIDES.get(slug, SILHOUETTES[cat])(d, W / 2, H * 0.34, accent, dim)

    eyebrow_f = ImageFont.truetype(SANSB, 40)
    name_f = ImageFont.truetype(SERIF, 96)
    foot_f = ImageFont.truetype(SANS, 34)
    note_f = ImageFont.truetype(SANS, 38)

    y = H * 0.60
    tracked = " ".join(label)
    tw = d.textlength(tracked, font=eyebrow_f)
    d.text(((W - tw) / 2, y), tracked, font=eyebrow_f, fill=accent)
    y += 84

    lines = wrap_text(name, name_f, W - 220, d)
    for ln in lines:
        lw = d.textlength(ln, font=name_f)
        d.text(((W - lw) / 2, y), ln, font=name_f, fill=(244, 244, 245))
        y += 112

    y += 26
    gradient_rule(img, (W - 340) / 2, y, 340)
    d = ImageDraw.Draw(img)
    y += 58

    note = "Personalized to your order — sample preview"
    nw = d.textlength(note, font=note_f)
    d.text(((W - nw) / 2, y), note, font=note_f, fill=(161, 161, 170))

    foot = "MADE TO ORDER  ·  CULLMAN, ALABAMA"
    fw = d.textlength(foot, font=foot_f)
    d.text(((W - fw) / 2, H - 110), foot, font=foot_f, fill=(120, 120, 130))

    img.save(os.path.join(OUT, f"{slug}.png"))
    return slug


os.makedirs(OUT, exist_ok=True)
for n, s, c in PRODUCTS:
    make(n, s, c)
    print("made", s)
print("done:", len(PRODUCTS))
