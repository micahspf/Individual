#!/usr/bin/env python3
"""Pull Cullman Area Chamber of Commerce members into JSON.

Usage:
  chamber_members.py [--out members.json] [--search TERM ...] [--details NAME ...] [--groups slug,slug]

The chamber's "QuickLink" group pages list member cards: name, street, city, phone.
Chamber members are established local businesses with a listed phone, which makes
the directory a good first source. --search TERM also runs the chamber's keyword search
(for example "salon", "barber", "towing"), which finds members the groups miss.
--details NAME fetches a member's own chamber
page for its website, social links, description and hours (one request each, so
only for the shortlist). Uses curl, which goes through the session's proxy.
"""
import argparse, html, json, re, subprocess, sys, urllib.parse

BASE = "https://business.cullmanchamber.org/list"
# QuickLink groups that hold businesses worth pitching. The chamber's grouping is
# loose: HVAC companies sit under personal services, pest control and landscaping
# under professional services, electricians only on their own category page.
GROUPS = [
    "ql/automotive-marine-4",                    # auto repair, body shops, towing
    "ql/construction-equipment-contractors-7",   # roofers, plumbers, fence, crawlspace
    "ql/home-garden-12",                         # appliance and HVAC repair
    "ql/personal-services-care-17",              # HVAC, salons, spas, massage
    "ql/pets-veterinary-18",                     # vets
    "ql/business-professional-services-5",       # pest control, landscaping, cleaning
    "ql/real-estate-moving-storage-20",          # storage
    "ql/finance-insurance-10",                   # insurance agencies
    "category/electrical-contractor-428",        # electricians
]


def fetch(url):
    return subprocess.run(["curl", "-sS", "-L", "-m", "30", url],
                          capture_output=True, text=True, errors="replace").stdout


def text(fragment):
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", fragment))).strip()


def parse_cards(page, group):
    members = {}
    for card in re.split(r'<div class="card gz-results-card', page)[1:]:
        mid = re.search(r'data-memid="(\d+)"', card)
        name = re.search(r'gz-card-title"[^>]*>\s*<a [^>]*>(.*?)</a>', card, re.S)
        if not (mid and name):
            continue
        street = re.search(r'gz-street-address"[^>]*>(.*?)<', card, re.S)
        city = re.search(r'gz-address-city">(.*?)<', card)
        phone = re.search(r'gz-card-phone">\s*<a href="tel:[^"]*"[^>]*>.*?<span>(.*?)</span>', card, re.S)
        member = re.search(r'href="(https://business\.cullmanchamber\.org/list/member/[^"]+)"', card)
        members[mid.group(1)] = {
            "name": text(name.group(1)),
            "group": group.split("/")[-1],
            "street": text(street.group(1)) if street else "",
            "city": city.group(1).strip() if city else "",
            "phone": phone.group(1).strip() if phone else "",
            "member_page": member.group(1) if member else "",
        }
    return members


SKIP_LINK = re.compile(r"cullmanchamber|chambermaster|growthzone|google\.|sharer|twitter\.com/intent|"
                       r"linkedin\.com/share|micronet|gzapp|mapquest|bing\.com|apple\.com|fonts\.|"
                       r"cloudflare|jquery|bootstrap|1001-map\.com|cullmanareachamber")  # the chamber's own pages and socials


def details(member_page):
    page = fetch(member_page)
    links = [u for u in re.findall(r'href="(https?://[^"]+)"', page)
             if not SKIP_LINK.search(u) and re.match(r"https?://[^\s/]+\.[a-z]{2,}(/\S*)?$", u, re.I)]
    social = [u for u in links if re.search(r"facebook\.com|instagram\.com|linkedin\.com|youtube\.com|tiktok\.com", u)]
    about = re.search(r"gz-details-about[^>]*>(.*?)</div>", page, re.S)
    hours = re.search(r"gz-details-hours[^>]*>(.*?)</div>", page, re.S)
    return {
        "websites": [u for u in links if u not in social][:3],
        "social": social[:2],
        "about": text(about.group(1))[:400] if about else "",
        "hours": text(hours.group(1)) if hours else "",
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--out", default="members.json")
    ap.add_argument("--groups", help="comma-separated group paths (default: the service groups)")
    ap.add_argument("--search", nargs="*", default=[], metavar="TERM",
                    help="also run the chamber's keyword search for each term")
    ap.add_argument("--details", nargs="*", default=[], metavar="NAME",
                    help="member names (exact or case-insensitive substring) to fetch details for")
    a = ap.parse_args()

    groups = (a.groups.split(",") if a.groups else GROUPS) + \
             [f"search?q={urllib.parse.quote(t)}" for t in a.search]
    members = {}
    for g in groups:
        found = parse_cards(fetch(f"{BASE}/{g}"), g if not g.startswith("search?") else "search:" + urllib.parse.unquote(g[9:]))
        print(f"{g}: {len(found)} members", file=sys.stderr)
        for k, v in found.items():
            members.setdefault(k, v)

    for want in a.details:
        hits = [m for m in members.values() if m["name"].lower() == want.lower()] or \
               [m for m in members.values() if want.lower() in m["name"].lower()]
        for m in hits[:1]:
            if m["member_page"]:
                m.update(details(m["member_page"]))
        if not hits:
            print(f"no member matching {want!r}", file=sys.stderr)

    rows = sorted(members.values(), key=lambda m: (m["group"], m["name"].lower()))
    with open(a.out, "w") as f:
        json.dump(rows, f, indent=1, ensure_ascii=False)
    print(f"{len(rows)} members -> {a.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
