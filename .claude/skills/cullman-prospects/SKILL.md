---
name: cullman-prospects
description: Find, verify and add local-business prospects to Micah's Cullman Pipeline tracker for Individual's AI services (missed-call text-back, after-hours capture, quote and booking routing). Use whenever Micah wants more leads, prospects or businesses to call or pitch - "add 15 more prospects", "find roofers in Cullman", "get me plumbers to call", "fill the pipeline to 30", "who else could use the missed-call thing", "add salons to my list" - even if he never says "tracker". Sources from the Cullman Area Chamber directory, confirms every phone number on two sources, skips franchises and captive agents, suggests a Starter or Essentials plan, writes notes with a test-call check, and adds records without duplicates. Never contacts a business.
---

# Cullman prospects

This builds the list Micah calls from: real, independent businesses within about 20 miles of
Cullman, Alabama, that lose work when nobody answers the phone. Each one lands in the
[Cullman Pipeline](https://claude.ai/artifact/6EJGyZVdxUm4sVM28bksJJ) tracker at "To call",
ready for his 45-second test call. The sales playbook behind it is `sales/prospects-cullman.md`
in the Individual repo; skim it when it is available.

Two batches built this way on 2026-10-01 (29 businesses) are the reference: a good run looks
like those records, and the tracker already holds them, so check for duplicates first.

## What a good run produces

- Real, reachable businesses: each phone number appears on two sources (the chamber listing,
  the business's own website, or a listing such as Yelp, BBB, RepairPal or its Facebook page).
  A wrong number wastes Micah's call and makes the walk-in awkward.
- No duplicates of anything already in the tracker, by name or by phone.
- Notes Micah can act on in ten seconds: why it fits, what to check on the call, a few facts,
  and the sources. The tracker's call script shows the "On the test call" line on screen.
- Fit boxes ticked only where a source proves them. Unticked is fine; a wrong tick misleads.
- A suggested plan of Starter or Essentials (One task for very small needs). The playbook says
  to lead small and never open with Full Custom.
- Nobody contacted. Micah makes every call himself, honestly, as himself.

## Workflow

Scripts live in `scripts/` next to this file; run them with `python3`. They use `curl`, which
goes through the session's proxy.

1. **Read the tracker.** `ArtifactData` list of collection `prospects` with an `out_dir`
   (details in `references/tracker-schema.md`). Note how many there are, which categories are
   covered, and keep the folder for the duplicate check. The playbook target is 30 businesses;
   if Micah gave no number, aim for 10 to 15 new ones.
2. **Pull candidates.** `scripts/chamber_members.py --out members.json` collects about 250
   chamber members across the service groups. Shortlist by category and fit (rules below).
   Where the chamber is thin (lawn care and pest control usually are), search the web for
   `locally owned <category> Cullman AL` and shortlist independents from what comes back.
3. **Get details.** `chamber_members.py --out members.json --details "Name" "Name" ...` adds
   each shortlisted member's website, description and hours from its chamber page.
4. **Verify each business.** `scripts/site_signals.py URL PHONE [URL PHONE ...]` reports
   whether the phone is on the site and quotes fit signals (24/7, emergency, booking, free
   estimates, years, owner, hours). A site that comes back blocked (status 202, no text):
   search `"Business Name" Cullman AL`, use the Yelp, BBB, RepairPal or Facebook result, and
   say "via search - the site blocks direct reads" in Sources. Can't confirm a phone on two
   sources? Drop the business and list it under "left out".
5. **Decide.** Keep or drop with a one-line reason, pick the plan, tick the fit boxes, and
   write the notes in the format below.
6. **Build.** Put the drafts in a JSON list (`doc_id`, `name`, `category`, `owner`, `phone`,
   `fit`, `plan`, `notes`), then run
   `scripts/build_records.py drafts.json OUT_DIR --existing <step 1 out_dir>`. It refuses
   unknown categories or plans, bad phone numbers, missing note paragraphs, "$" in notes, and
   duplicates of tracker records, and writes nothing until every draft passes. Fix and rerun.
7. **Write and confirm.** Send the `writes` it prints as one `ArtifactData` batch. Then list
   the collection again into a new `out_dir` and run
   `scripts/compare_readback.py OUT_DIR <new out_dir>`; it must report 0 problems.
8. **Report** (format below), then ask Micah what's next.

## Who makes the list

- **Call-driven work, where a missed call is a lost job:** HVAC, plumbers, electricians,
  roofers, towing, auto repair, pest control, lawn care, vets, insurance agencies, salons and
  spas, storage, and home services such as fence, gutters, crawlspace and cleaning.
- **Independent and locally run.** Skip franchises, captive insurance agents (State Farm,
  Allstate, Alfa, COUNTRY Financial) and big multi-branch regional firms (for example Cook's
  Pest Control, Lawn Doctor). They run on corporate phone systems and can't buy locally.
- **Not already covered.** Skip a business that promises a live person 24/7, or already runs
  online scheduling plus website chat. A website showing a different number from the chamber
  usually means a marketing company's tracking line: keep the business, and flag it in a
  Heads-up so Micah asks who handles missed calls.
- **No health practices that hold patient information** (dentists, chiropractors, med spas)
  unless Micah asks: texting patient details raises privacy-law questions. Vets are fine.
- **Within about 20 miles of Cullman:** Hanceville, Vinemont, Holly Pond, Good Hope, Arab,
  Danville and similar. Note the town in Facts when it isn't Cullman.
- **Business lines only.** Never record a personal cell number, even one a directory lists for
  the owner; use the main business number.

## Choosing the plan

| What the research shows | Plan |
|---|---|
| 24/7 or emergency work, quotes or inspections by phone, crews out on jobs | `starter` |
| One-person or tiny shop, no website, salon, massage or spa, storage, or already books online | `essentials` |
| A single small job they keep doing by hand | `task` |

When volume is high (hundreds of reviews, several offices, insurance-claim work), still suggest
`starter` and mention Growth in the notes as the next step: follow-up on quotes that go quiet
and review requests. Never suggest `custom` as a first pitch.

## Notes format

Four short paragraphs, in this order, separated by blank lines. Plain sentences; numbers
without "$"; nothing stated as fact that a source didn't say.

```
Why it fits: <the evidence that calls get missed or work leaks, and what the plan does about it>.

On the test call: <the one thing to notice or ask on Micah's call; "get the owner's name" if no source names one>.

Facts: <owner, founded, services, hours, street address, town>.

Sources: <Cullman Chamber listing; their-site.com; Yelp (via search - the site blocks direct reads)>. Researched <Mon D, YYYY>.
```

Use `Heads-up:` instead of (or as well as) "On the test call:" for a wrinkle Micah must know
before dialing, such as a second number or an existing text line.

**Example** (a real record from the first batch):

```
Why it fits: family-run shop that advertises 24/7 emergency plumbing (burst pipes, sewer
backups, water heaters). Night and weekend calls land on a small team, and any that hit
voicemail go to the next plumber on Google. Starter: missed-call text-back, after-hours
callers captured, urgent ones flagged.

On the test call: does a person answer, and how fast? Worth one call just after 5 p.m. too,
since they promise 24/7.

Facts: founded 2023 by Justin and Megan Barbee. Justin is the owner and master plumber (16+
years). Mailing address P.O. Box 337, Cullman.

Sources: Cullman Chamber listing; premierplumbingco.net (About and Emergency pages, via
search). Researched Oct 1, 2026.
```

That record: `doc_id` premier-plumbing, category Plumber, owner Justin, phone 256-507-9907,
fit owner + years + books, plan starter.

**Doc ids** are the business name as a lowercase hyphenated slug (`bullard-roofing`). When two
names are close (Premier Plumbing, Premier Pest Control), keep the ids distinct and add "Not the
same company as ..." to Facts.

## Reporting to Micah

Micah reads on his phone, so keep it short and concrete:

1. One line: how many were added and the new total, against the target of 30.
2. A table: Business | Type | Plan | Why it fits (a few words each).
3. "Left out", with a one-line reason each: franchise, couldn't confirm a phone, already has
   scheduling, outside the area, and so on.
4. The plan mix (how many Starter and Essentials) and a reminder that nobody was contacted.
5. Sources as links: the pages actually used.
6. Next-step options, recommended one first (for example: start calling with the tracker's call
   script, or add another category).
