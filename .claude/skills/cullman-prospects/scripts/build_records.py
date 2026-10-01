#!/usr/bin/env python3
"""Validate prospect drafts and write one tracker-ready JSON file per business.

Usage:
  build_records.py drafts.json OUT_DIR [--existing READBACK_DIR]

drafts.json is a list of {"doc_id", "name", "category", "owner", "phone", "fit", "plan", "notes"}.
READBACK_DIR is where an ArtifactData list/query of the "prospects" collection saved its files
(either the out_dir itself or its prospects/ folder).

Nothing is written unless every draft passes. On success prints the ArtifactData `batch`
writes (op "set", one per record, at most 50 per batch) to send as-is.
"""
import datetime, glob, json, os, re, sys

# Values the Cullman Pipeline page accepts (its CATEGORIES, PLANS and FIT lists).
CATEGORIES = ["HVAC", "Plumber", "Electrician", "Dentist", "Chiropractor", "Auto repair", "Lawn care",
              "Pest control", "Salon", "Med spa", "Veterinarian", "Insurance agent", "Storage", "Towing", "Other"]
PLANS = {"", "task", "essentials", "starter", "growth", "custom"}
FIT_KEYS = {"staff", "profile", "books", "years", "owner"}
SLUG = re.compile(r"^[a-z0-9][a-z0-9-]{1,80}$")


def digits(s):
    return re.sub(r"\D", "", s or "")[-10:]


def norm_name(s):
    return re.sub(r"[^a-z0-9]", "", re.sub(r"(?i)\b(llc|inc|co|company|the)\b", "", s or "").lower())


def load_existing(path):
    if not path:
        return []
    folder = os.path.join(path, "prospects") if os.path.isdir(os.path.join(path, "prospects")) else path
    rows = []
    for f in glob.glob(os.path.join(folder, "*.json")):
        d = json.load(open(f))
        d = d.get("data", d)
        rows.append((os.path.basename(f)[:-5], d))
    return rows


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    drafts = json.load(open(sys.argv[1]))
    out_dir = os.path.abspath(sys.argv[2])
    existing = load_existing(sys.argv[sys.argv.index("--existing") + 1] if "--existing" in sys.argv else "")
    ex_ids = {i for i, _ in existing}
    ex_names = {norm_name(d.get("name")): d.get("name") for _, d in existing}
    ex_phones = {digits(d.get("phone")): d.get("name") for _, d in existing if digits(d.get("phone"))}

    errors, warnings, seen = [], [], {"id": set(), "name": set(), "phone": set()}
    for i, d in enumerate(drafts):
        tag = d.get("name") or f"draft {i + 1}"
        doc_id, phone = d.get("doc_id", ""), digits(d.get("phone"))
        if not SLUG.match(doc_id):
            errors.append(f"{tag}: doc_id {doc_id!r} must be lowercase letters, digits and hyphens")
        if d.get("category") not in CATEGORIES:
            errors.append(f"{tag}: category {d.get('category')!r} is not one the tracker offers: {', '.join(CATEGORIES)}")
        if d.get("plan", "") not in PLANS:
            errors.append(f"{tag}: plan {d.get('plan')!r} must be one of {sorted(PLANS)}")
        if d.get("plan") == "custom":
            errors.append(f"{tag}: the playbook never leads with Full Custom; suggest starter, essentials or task")
        if d.get("plan") == "growth":
            warnings.append(f"{tag}: Growth as the first pitch goes against the playbook (lead with Starter); mention Growth in notes instead")
        if len(phone) != 10:
            errors.append(f"{tag}: phone {d.get('phone')!r} is not a 10-digit number")
        bad_fit = set(d.get("fit") or {}) - FIT_KEYS
        if bad_fit:
            errors.append(f"{tag}: unknown fit keys {sorted(bad_fit)}; use {sorted(FIT_KEYS)}")
        notes = d.get("notes") or ""
        for part in ("Why it fits:", "Sources:"):
            if part not in notes:
                errors.append(f"{tag}: notes need a '{part}' paragraph")
        if "On the test call:" not in notes and "Heads-up:" not in notes:
            errors.append(f"{tag}: notes need an 'On the test call:' (or 'Heads-up:') paragraph; the tracker's call script shows it")
        if "$" in notes:
            errors.append(f"{tag}: notes contain '$'; prices are written as plain numbers")
        if re.search(r"@|\d{3}[-.\s]\d{3}[-.\s]\d{4}", d.get("owner") or ""):
            errors.append(f"{tag}: owner holds contact details; a first name only")
        for kind, val in (("id", doc_id), ("name", norm_name(d.get("name"))), ("phone", phone)):
            if val in seen[kind]:
                errors.append(f"{tag}: duplicate {kind} within these drafts")
            seen[kind].add(val)
        if doc_id in ex_ids:
            errors.append(f"{tag}: doc_id {doc_id!r} already exists in the tracker")
        if norm_name(d.get("name")) in ex_names:
            errors.append(f"{tag}: already in the tracker as {ex_names[norm_name(d.get('name'))]!r}")
        if phone in ex_phones:
            errors.append(f"{tag}: phone already in the tracker under {ex_phones[phone]!r}")

    for w in warnings:
        print("warning:", w, file=sys.stderr)
    if errors:
        print(f"{len(errors)} problem(s), nothing written:", file=sys.stderr)
        for e in errors:
            print("  -", e, file=sys.stderr)
        sys.exit(1)

    os.makedirs(out_dir, exist_ok=True)
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    writes = []
    for d in drafts:
        p = digits(d["phone"])
        rec = {"name": d["name"].strip(), "category": d["category"], "owner": (d.get("owner") or "").strip(),
               "phone": f"{p[:3]}-{p[3:6]}-{p[6:]}", "callResult": "", "observation": "",
               "fit": {k: True for k, v in (d.get("fit") or {}).items() if v}, "disq": "", "stage": "list",
               "plan": d.get("plan", ""), "nextAction": "", "nextDate": "", "notes": d["notes"].strip(),
               "touches": [], "createdAt": now, "updatedAt": now}
        path = os.path.join(out_dir, d["doc_id"] + ".json")
        with open(path, "w") as f:
            json.dump(rec, f, indent=1, ensure_ascii=False)
        writes.append({"op": "set", "collection": "prospects", "doc_id": d["doc_id"], "file_path": path})

    print(f"{len(writes)} record(s) written to {out_dir}", file=sys.stderr)
    for start in range(0, len(writes), 50):
        print(f"--- ArtifactData batch writes ({start + 1}-{min(start + 50, len(writes))}):", file=sys.stderr)
        print(json.dumps(writes[start:start + 50]))


if __name__ == "__main__":
    main()
