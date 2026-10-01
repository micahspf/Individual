#!/usr/bin/env python3
"""Check business websites: is the expected phone on the site, and what fit signals show?

Usage:
  site_signals.py URL [PHONE] [URL [PHONE] ...]
  site_signals.py --json shortlist.json      # [{"name": ..., "url": ..., "phone": ...}, ...]

For each site prints the HTTP status, how much text came back, the phone numbers
found, whether the expected phone is among them, and short context snippets for
the signals that decide fit and plan: 24/7 or emergency work, online booking or
quote forms, free estimates, years in business or family-owned, a named owner,
hours. A 202 status with almost no text means the site blocks automated reads:
verify through search results instead (Yelp, BBB, RepairPal, the business's own
Facebook page) and say so in the record's sources.
"""
import html, json, re, subprocess, sys

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
PHONE = re.compile(r"\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b")
SIGNALS = {
    "24/7": r"24/7|24 hours|24-hour|around the clock",
    "emergency": r"(?i)emergenc|storm damage",
    "booking": r"(?i)book (now|online|an appointment)|schedule (online|service|now|your|an appointment)|"
               r"click to schedule|request (service|an? (estimate|quote|appointment|inspection))|"
               r"get (a|your) (free )?(quote|estimate)|booksy|vagaro|square ?appointments|calendly|"
               r"housecall|servicetitan|jobber",
    "free estimate": r"(?i)free (estimate|quote|inspection|evaluation)",
    "years": r"(?i)since (19|20)\d\d|established (in )?(19|20)\d\d|founded|\b\d{1,2}\+? years|"
             r"family[- ]owned|locally owned|veteran[- ]owned|\d(st|nd|rd|th) generation",
    "owner": r"(?i)\bowner\b|founder|president",
    "hours": r"(?i)mon(day)?\s*[-–]\s*fri(day)?|hours of operation|working hours",
    "chat or text": r"(?i)chat with us|call or text|text us",
}


def digits(s):
    return re.sub(r"\D", "", s or "")[-10:]


def fmt(d):
    return f"{d[:3]}-{d[3:6]}-{d[6:]}" if len(d) == 10 else d


def check(url, phone="", name=""):
    out = subprocess.run(["curl", "-sS", "-L", "-m", "25", "-A", UA, "-o", "-", "-w", "\n__STATUS__%{http_code}", url],
                         capture_output=True, text=True, errors="replace").stdout
    body, _, status = out.rpartition("\n__STATUS__")
    txt = html.unescape(re.sub(r"\s+", " ", re.sub(r"(?is)<(script|style)\b.*?</\1>|<[^>]+>", " ", body)))
    tel_links = {digits(t) for t in re.findall(r'href="tel:([^"]+)"', body)}
    phones = sorted({digits(p) for p in PHONE.findall(txt)} | {t for t in tel_links if len(t) == 10})
    want = digits(phone)
    print(f"===== {name or url}")
    print(f"  {url}  status {status or 'failed'}, {len(txt)} chars of text")
    if len(txt) < 50:
        print("  BLOCKED or empty: verify through search results instead, and note it in Sources")
        return
    print(f"  phones on site: {', '.join(fmt(p) for p in phones) or 'none'}")
    if want:
        print(f"  expected {fmt(want)}: {'FOUND on site' if want in phones else 'NOT on site - check which number is current'}")
    for label, rx in SIGNALS.items():
        hits = [txt[max(0, m.start() - 60):m.end() + 80].strip() for m in re.finditer(rx, txt)][:2]
        for h in hits:
            print(f"  [{label}] …{h}…")


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    if args[0] == "--json":
        for row in json.load(open(args[1])):
            check(row.get("url", ""), row.get("phone", ""), row.get("name", ""))
        return
    i = 0
    while i < len(args):
        url = args[i]
        phone = args[i + 1] if i + 1 < len(args) and not args[i + 1].startswith("http") else ""
        check(url, phone)
        i += 2 if phone else 1


if __name__ == "__main__":
    main()
