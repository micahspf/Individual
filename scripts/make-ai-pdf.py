"""Generate the Individual AI services PDF.

Regenerates public/what-ai-can-do-for-your-local-business.pdf.

Brand-matched to madebyindividual.com: gradient rule (pink -> orange -> yellow),
pink section accents, serif display face, dark CTA panel. Light body so it prints.

Requires Python with reportlab and pillow (not npm dependencies — this is a
one-off asset generator, not part of the site build):

    python -m pip install reportlab pillow
    python scripts/make-ai-pdf.py
"""
import os
from io import BytesIO

from PIL import Image
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

REPO = r"C:\Users\micah\Documents\Individual"
# Same wordmark the site renders (see components/ui/BrandLogo.tsx)
LOGO = os.path.join(REPO, "public", "brand", "logo-mark.png")
OUT = os.path.join(REPO, "public", "what-ai-can-do-for-your-local-business.pdf")

PINK = HexColor("#ff2d8a")
ORANGE = HexColor("#ff8c42")
YELLOW = HexColor("#ffe14a")
YELLOW_INK = HexColor("#c9a000")   # legible yellow for text on white
ROSE = HexColor("#e0559a")
INK = HexColor("#16161d")
BODY = HexColor("#3c3c46")
MUTED = HexColor("#55555f")
LINE = HexColor("#e2e2e8")
DARK = HexColor("#0a0a12")
DARK_TEXT = HexColor("#b8b8c4")

PAGE_W, PAGE_H = letter
ML, MR = 54, 54
MT, MB = 46, 44
CW = PAGE_W - ML - MR

FONTS = {
    "sans": (r"C:\Windows\Fonts\segoeui.ttf", "Helvetica"),
    "sans-b": (r"C:\Windows\Fonts\segoeuib.ttf", "Helvetica-Bold"),
    "serif-b": (r"C:\Windows\Fonts\georgiab.ttf", "Times-Bold"),
}


def register_fonts():
    names = {}
    for key, (path, fallback) in FONTS.items():
        name = "I-" + key
        if os.path.exists(path):
            try:
                pdfmetrics.registerFont(TTFont(name, path))
                names[key] = name
                continue
            except Exception:
                pass
        names[key] = fallback
    return names


F = register_fonts()
SANS, SANSB, SERIFB = F["sans"], F["sans-b"], F["serif-b"]


def cropped_logo():
    """Trim the transparent border so the wordmark sits tight to the margin.

    Threshold the alpha first — the source has a row of near-transparent pixels
    left over from the black-plate removal that otherwise prints as a grey line.
    """
    img = Image.open(LOGO).convert("RGBA")

    # Safety net: logo-trim.* carries a full-width RGBA(38,38,48,191) line in row 0,
    # left over from the black-plate removal, which prints as a grey rule. logo-mark
    # is clean, but keep the guard so swapping the asset can't reintroduce it.
    w, h = img.size
    px = img.load()
    if sum(1 for x in range(w) if px[x, 0][3] > 24) > w * 0.95:
        img = img.crop((0, 1, w, h))

    solid = img.split()[3].point(lambda a: 255 if a > 24 else 0)
    bbox = solid.getbbox()
    if bbox:
        img = img.crop(bbox)
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return ImageReader(buf), img.width, img.height


def wrap(text, font, size, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if pdfmetrics.stringWidth(trial, font, size) <= width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def para(c, text, x, y, width, font=None, size=9.6, leading=13.4, color=BODY):
    font = font or SANS
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def bullet(c, text, x, y, width, color, size=9.2, leading=12.4):
    c.setFont(SANS, size)
    dash_w = pdfmetrics.stringWidth("\u2014 ", SANS, size)
    lines = wrap(text, SANS, size, width - dash_w)
    for i, line in enumerate(lines):
        if i == 0:
            c.setFillColor(color)
            c.drawString(x, y, "\u2014")
        c.setFillColor(BODY)
        c.drawString(x + dash_w, y, line)
        y -= leading
    return y


def gradient_rule(c, x, y, width, height=3.6):
    """Pink -> orange -> yellow, drawn as thin bands."""
    steps = 240
    stops = [(0.0, PINK), (0.48, ORANGE), (1.0, YELLOW)]
    for i in range(steps):
        t = i / (steps - 1)
        for j in range(len(stops) - 1):
            t0, c0 = stops[j]
            t1, c1 = stops[j + 1]
            if t0 <= t <= t1:
                f = 0 if t1 == t0 else (t - t0) / (t1 - t0)
                col = Color(
                    c0.red + (c1.red - c0.red) * f,
                    c0.green + (c1.green - c0.green) * f,
                    c0.blue + (c1.blue - c0.blue) * f,
                )
                break
        c.setFillColor(col)
        c.rect(x + width * t, y, width / steps + 0.7, height, stroke=0, fill=1)


def group_block(c, x, y, width, title, accent, items):
    c.setFont(SANSB, 9.4)
    c.setFillColor(accent)
    c.drawString(x, y, title.upper())
    y -= 5.5
    c.setStrokeColor(accent)
    c.setLineWidth(1.2)
    c.line(x, y, x + width, y)
    y -= 12
    for it in items:
        y = bullet(c, it, x, y, width, accent)
        y -= 1.5
    return y


def measure_box(width, lines, bullets=True):
    """Height a box needs so its border always contains its text."""
    h = 19 + 15 + 13  # top pad + title + bottom pad
    for ln in lines:
        if bullets:
            dash_w = pdfmetrics.stringWidth("— ", SANS, 9.0)
            n = len(wrap(ln, SANS, 9.0, width - 26 - dash_w))
            h += n * 12.0 + 1
        else:
            n = len(wrap(ln, SANS, 9.0, width - 26))
            h += n * 12.2
    return h


def box(c, x, y, width, height, title, lines, bullets=True, title_size=11.5):
    c.setStrokeColor(LINE)
    c.setLineWidth(0.9)
    c.roundRect(x, y - height, width, height, 7, stroke=1, fill=0)
    ix, iy = x + 13, y - 19
    c.setFont(SERIFB, title_size)
    c.setFillColor(INK)
    c.drawString(ix, iy, title)
    iy -= 15
    for ln in lines:
        if bullets:
            iy = bullet(c, ln, ix, iy, width - 26, PINK, size=9.0, leading=12.0)
            iy -= 1
        else:
            iy = para(c, ln, ix, iy, width - 26, size=9.0, leading=12.2)
    return iy


def footer(c):
    y = MB + 6
    c.setStrokeColor(LINE)
    c.setLineWidth(0.8)
    c.line(ML, y + 11, PAGE_W - MR, y + 11)
    c.setFont(SANS, 8.0)
    c.setFillColor(HexColor("#8a8a95"))
    c.drawString(ML, y, "Individual \u00b7 Cullman, Alabama")
    c.drawRightString(PAGE_W - MR, y, "madebyindividual.com")


GROUPS = [
    ("Customer & sales", PINK, [
        "Instant lead response and follow-up",
        "Appointment booking and reminders",
        "Review requests and reply drafting",
        "A simple chatbot for the questions you answer twenty times a week",
        "Personalized email and text sequences",
    ]),
    ("Operations & admin", ORANGE, [
        "Invoice and receipt processing",
        "Expense categorization",
        "Meeting notes and action-item extraction",
        "Document summarization",
        "Data entry between the apps you already use \u2014 CRM, spreadsheets, email",
    ]),
    ("Marketing & visibility", YELLOW_INK, [
        "Google Business Profile posts and updates",
        "Social media content drafts",
        "Local SEO pages and FAQ writing",
        "Ad copy variations",
        "Monthly performance summaries",
    ]),
    ("Custom tools & agents", ROSE, [
        "Simple internal dashboards",
        "Custom scripts and automations",
        "AI agents that handle a recurring task start to finish",
        "Website forms and landing pages",
        "Order and request intake systems",
    ]),
]

WIDE_GROUP = ("Business ecosystem \u2014 premium", PINK, [
    "A connected system where your own lightweight agents hand work to each other "
    "\u2014 lead \u2192 follow-up \u2192 booking \u2192 review \u2192 reporting",
    "Managed monthly instead of rebuilt as one-off projects",
])

STEPS = [
    ("01", "Specify", "Describe the task you keep repeating, the apps involved, and what a good result looks like."),
    ("02", "Quote", "You receive a clear price and timeline before any work starts."),
    ("03", "Build", "The tool is built for your workflow, handed over working, and adjusted until it fits."),
]

PLANS = [
    ("Starter Ecosystem", "Core automations for one part of the business \u2014 usually lead response and follow-up \u2014 with light monthly support."),
    ("Growth Ecosystem", "Several agents working together across sales, admin, and marketing, tuned every month as the business shifts."),
    ("Full Custom Ecosystem", "A system designed end to end around your exact workflow, with ongoing development and priority turnaround."),
]


def page_one(c):
    y = PAGE_H - MT

    logo, lw, lh = cropped_logo()
    target_h = 44.0
    target_w = lw * (target_h / lh)
    c.drawImage(logo, ML, y - target_h, width=target_w, height=target_h, mask="auto")
    y -= target_h + 14

    gradient_rule(c, ML, y, CW)
    y -= 30

    c.setFont(SERIFB, 24)
    c.setFillColor(INK)
    c.drawString(ML, y, "What AI Can Actually Do")
    y -= 27
    c.drawString(ML, y, "for Your Local Business")
    y -= 20

    c.setFont(SANS, 11)
    c.setFillColor(MUTED)
    c.drawString(ML, y, "A plain list of practical uses \u2014 no jargon, no hype.")
    y -= 26

    # Lede with pink rule
    lede = ("Most AI advice is written for companies with a tech department. This is the "
            "version for a business with a handful of people and no time to evaluate "
            "software. Everything below is something a small business can actually put to "
            "work \u2014 usually starting with one task.")
    lede_lines = wrap(lede, SANS, 9.8, CW - 16)
    block_h = len(lede_lines) * 13.6
    c.setFillColor(PINK)
    c.rect(ML, y - block_h + 8, 2.6, block_h, stroke=0, fill=1)
    ytxt = y
    c.setFont(SANS, 9.8)
    c.setFillColor(HexColor("#33333c"))
    for ln in lede_lines:
        c.drawString(ML + 14, ytxt, ln)
        ytxt -= 13.6
    y = ytxt - 16

    c.setFont(SERIFB, 14)
    c.setFillColor(INK)
    c.drawString(ML, y, "Where it helps")
    y -= 20

    gutter = 26
    colw = (CW - gutter) / 2
    top = y
    yl = group_block(c, ML, top, colw, *GROUPS[0])
    yr = group_block(c, ML + colw + gutter, top, colw, *GROUPS[1])
    nxt = min(yl, yr) - 18
    yl = group_block(c, ML, nxt, colw, *GROUPS[2])
    yr = group_block(c, ML + colw + gutter, nxt, colw, *GROUPS[3])
    y = min(yl, yr) - 18
    y = group_block(c, ML, y, CW, *WIDE_GROUP)

    # How it works sits on page one so the page reads as a complete overview
    y -= 24
    c.setFont(SERIFB, 14)
    c.setFillColor(INK)
    c.drawString(ML, y, "How it works")
    y -= 22
    draw_steps(c, y)

    footer(c)
    c.showPage()


def draw_steps(c, y):
    gutter = 20
    sw = (CW - gutter * 2) / 3
    lowest = y
    for i, (n, t, d) in enumerate(STEPS):
        x = ML + i * (sw + gutter)
        yy = y
        c.setFont(SANSB, 8)
        c.setFillColor(PINK)
        c.drawString(x, yy, n)
        yy -= 14
        c.setFont(SERIFB, 12)
        c.setFillColor(INK)
        c.drawString(x, yy, t)
        yy -= 14
        yy = para(c, d, x, yy, sw, size=9.0, leading=12.2, color=MUTED)
        lowest = min(lowest, yy)
    return lowest


def page_two(c):
    y = PAGE_H - MT
    gradient_rule(c, ML, y, CW)
    y -= 34

    gutter = 24
    bw = (CW - gutter) / 2
    cost_lines = [
        "Small automations and scripts: $75\u2013250",
        "Larger tools, dashboards, and agents: quoted per job",
        "Monthly ecosystem plans for systems that keep running and improving",
        "You approve the price and the timeline before any work starts",
    ]
    not_lines = [
        "Not a subscription to someone else\u2019s platform",
        "Not set-and-forget magic \u2014 these are tools that need a person who knows your business",
        "Not a rebuild of how you already work",
        "Not a shared template with your logo on it",
    ]
    # Both boxes share the taller of the two heights so the row stays even
    bh = max(measure_box(bw, cost_lines), measure_box(bw, not_lines))
    box(c, ML, y, bw, bh, "What it costs", cost_lines)
    box(c, ML + bw + gutter, y, bw, bh, "What this is not", not_lines)
    y -= bh + 30

    c.setFont(SERIFB, 14)
    c.setFillColor(INK)
    c.drawString(ML, y, "Your own business AI ecosystem")
    y -= 18
    y = para(c, "Not a subscription to someone else\u2019s software \u2014 a system built around your "
                "workflow, maintained and improved every month. Predictable fee, no seat counts, "
                "no platform lock-in.", ML, y, CW, size=9.4, leading=12.8, color=MUTED)
    y -= 12

    gutter = 16
    pw = (CW - gutter * 2) / 3
    ph = max(measure_box(pw, [d], bullets=False) for _, d in PLANS)
    for i, (name, desc) in enumerate(PLANS):
        box(c, ML + i * (pw + gutter), y, pw, ph, name, [desc], bullets=False, title_size=10.5)
    plans_bottom = y - ph

    # Dark CTA panel anchored just above the footer so the page has no dead tail
    cta_h = 112
    cta_top = MB + 30 + cta_h

    # Brand lockup centred in the space between the plans and the CTA
    logo, lw, lh = cropped_logo()
    lock_h = 34.0
    lock_w = lw * (lock_h / lh)
    mid = (plans_bottom + cta_top) / 2
    c.drawImage(logo, (PAGE_W - lock_w) / 2, mid + 4, width=lock_w, height=lock_h, mask="auto")
    c.setFont(SANS, 9.0)
    c.setFillColor(MUTED)
    c.drawCentredString(
        PAGE_W / 2, mid - 12, "Custom AI systems, built one business at a time."
    )
    c.setFont(SANSB, 7.6)
    c.setFillColor(HexColor("#8a8a95"))
    c.drawCentredString(
        PAGE_W / 2, mid - 27, "MADE TO ORDER · CULLMAN, ALABAMA"
    )
    c.setFillColor(DARK)
    c.roundRect(ML, cta_top - cta_h, CW, cta_h, 9, stroke=0, fill=1)
    cx, cy = ML + 24, cta_top - 30
    c.setFont(SERIFB, 15)
    c.setFillColor(HexColor("#ffffff"))
    c.drawString(cx, cy, "Start with one task.")
    cy -= 18
    cy = para(c, "Describe something you keep doing by hand. You get a price and a timeline "
                 "before any work starts \u2014 the same process as everything else Individual "
                 "makes. Built in Cullman, for one business at a time.",
              cx, cy, CW - 48, size=9.4, leading=12.6, color=DARK_TEXT)
    cy -= 6
    c.setFont(SANSB, 10.5)
    c.setFillColor(YELLOW)
    c.drawString(cx, cy, "Request a custom quote \u2192 madebyindividual.com/ai")

    footer(c)
    c.showPage()


def main():
    c = canvas.Canvas(OUT, pagesize=letter)
    c.setTitle("What AI Can Actually Do for Your Local Business")
    c.setAuthor("Individual")
    c.setSubject("AI services for local small businesses")
    page_one(c)
    page_two(c)
    c.save()
    print("wrote", OUT, os.path.getsize(OUT), "bytes")


if __name__ == "__main__":
    main()
