#!/bin/bash
# SessionStart hook for Claude Code on the web.
#
# 1. Checkout guard. GitHub's default branch (Individual) is frozen at an old
#    commit while Vercel deploys main, so a fresh cloud session can start on
#    code 100+ files out of date. At startup, fast-forward to origin/main when
#    that loses nothing (no commits of its own, clean tree); otherwise say how
#    far behind the checkout is. Never moves the checkout mid-session.
# 2. Dependencies. npm ci installs exactly what package-lock.json pins and
#    never rewrites it (npm 10's install strips the lockfile's libc fields).
#    Skipped when node_modules already matches, so cached containers start fast.
#
# Anything printed here is added to the session's context, so keep it short.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

if [ -t 0 ]; then input=""; else input=$(cat || true); fi
source=$(printf '%s' "$input" | sed -n 's/.*"source"[[:space:]]*:[[:space:]]*"\([a-z]*\)".*/\1/p')

# --- 1. Checkout guard ---
# Count files main has changed since this branch split off. Merge commits on
# main that only repeat this branch's own work count as zero.
if git fetch --quiet origin main 2>/dev/null; then
  missing=$(git diff --name-only "$(git merge-base HEAD origin/main)" origin/main | wc -l | tr -d ' ')
  if [ "$missing" -gt 0 ]; then
    branch=$(git branch --show-current)
    if [ "$source" = "startup" ] && git merge-base --is-ancestor HEAD origin/main && [ -z "$(git status --porcelain)" ]; then
      git merge --ff-only --quiet origin/main
      echo "Session start: the checkout was missing $missing changed files from origin/main (what Vercel deploys). Fast-forwarded ${branch:-HEAD} to origin/main ($(git rev-parse --short HEAD))."
    else
      echo "WARNING: origin/main (what Vercel deploys) has $missing changed files this checkout lacks. Compare with origin/main before reading or editing. If this branch has no work of its own: git checkout -B ${branch:-<branch>} origin/main"
    fi
  fi
else
  echo "Session start: could not reach origin to confirm the checkout is current. Run git fetch origin and compare with origin/main before trusting the code."
fi

# --- 2. Dependencies ---
if [ ! -f node_modules/.package-lock.json ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  log=/tmp/session-start-npm.log
  if npm ci --no-audit --no-fund >"$log" 2>&1; then
    echo "Session start: dependencies installed (npm ci)."
  else
    echo "WARNING: npm ci failed (log: $log). Build and lint will not work until dependencies install."
  fi
fi
exit 0
