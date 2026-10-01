#!/usr/bin/env python3
"""Confirm the tracker holds exactly what was sent.

Usage: compare_readback.py SENT_DIR READBACK_DIR
SENT_DIR = build_records.py's OUT_DIR; READBACK_DIR = the out_dir of an ArtifactData list
(or its prospects/ folder). Exits non-zero if any record is missing or differs.
"""
import glob, json, os, sys

if len(sys.argv) != 3:
    sys.exit(__doc__)
sent, back = sys.argv[1], sys.argv[2]
if os.path.isdir(os.path.join(back, "prospects")):
    back = os.path.join(back, "prospects")
bad = 0
files = sorted(glob.glob(os.path.join(sent, "*.json")))
for f in files:
    name = os.path.basename(f)
    a = json.load(open(f))
    try:
        b = json.load(open(os.path.join(back, name)))
        b = b.get("data", b)
    except FileNotFoundError:
        print(f"MISSING in tracker: {name}")
        bad += 1
        continue
    diff = [k for k in a if a[k] != b.get(k)]
    if diff:
        print(f"DIFFERS: {name}: {diff}")
        bad += 1
print(f"checked {len(files)} record(s); problems: {bad}")
sys.exit(1 if bad else 0)
