# Cullman Pipeline tracker: data reference

Tracker: https://claude.ai/artifact/6EJGyZVdxUm4sVM28bksJJ (private to Micah; page source in
the artifact itself). Records live in its database, collection **`prospects`**, one document
per business. Read and write them with the `ArtifactData` tool, never by republishing the page.

## Fields of a prospect

| Field | What goes in it | Who fills it |
|---|---|---|
| `name` | Business name as it trades | research |
| `category` | One of the tracker's categories (below) | research |
| `owner` | First name of owner or manager, only when a source names them | research, or Micah after the call |
| `phone` | Main business line, `256-555-0123` format | research |
| `callResult` | `""`, `"answered"`, `"voicemail"`, `"no_answer"` | Micah's test call — leave `""` |
| `observation` | "What happened when you called" | Micah — leave `""` |
| `fit` | Object of ticked boxes, keys below, `true` only | research ticks what a source proves |
| `disq` | `""` or a disqualifier key (below) | research only for a proven one |
| `stage` | `"list"` for every new business ("To call") | — |
| `plan` | Suggested plan key (below) | research |
| `nextAction`, `nextDate` | `""` — the page sets these when Micah logs a call | — |
| `notes` | The research write-up (format in SKILL.md) | research |
| `touches` | `[]` — the page appends calls, walk-ins, emails | — |
| `createdAt`, `updatedAt` | ISO timestamps | build_records.py |

**Categories:** HVAC, Plumber, Electrician, Dentist, Chiropractor, Auto repair, Lawn care,
Pest control, Salon, Med spa, Veterinarian, Insurance agent, Storage, Towing, Other.
Roofers, fence, gutters, crawlspace, cleaning and massage go under **Other**; a day spa under
**Salon**.

**Plans** (`plan`): `task` (one task, from 75), `essentials` (150/mo), `starter` (300/mo),
`growth` (700/mo), `custom` (1,250/mo), or `""`.

**Fit boxes** (`fit` keys): `staff` 2+ employees or one visibly slammed person · `profile` real
Google Business Profile with reviews · `books` books appointments or quotes jobs · `years` open
2+ years · `owner` owner reachable and named.

**Disqualifiers** (`disq`): `franchise`, `no_phone`, `low_rating` (under 3.5 stars),
`rarely_open`, `has_crm` (already on a CRM they love).

## How the page uses them

- Stage `list` with no call shows as "Not called yet" in **Next up**; voicemail/no-answer
  businesses sort to the top once Micah logs the call.
- The call script panel in each business's sheet shows the notes paragraph that starts
  `On the test call:` (or `Heads-up:` if there is none). Every record needs one.
- The page's own plan labels still show "$"; that is Micah's internal tool. Notes you write use
  plain numbers, matching the site's no-"$" rule.

## Calls

Read everything first (dedupe and count):

```
ArtifactData(action="list", url=<tracker>, collection="prospects", query={"limit": 1000}, out_dir=<dir>)
```

Write new records in one atomic batch (at most 50 entries; new documents take no `if_version`,
and a `set` on an id that already exists is refused, which protects Micah's edits):

```
ArtifactData(action="batch", url=<tracker>, writes=[{"op": "set", "collection": "prospects",
             "doc_id": "<slug>", "file_path": "<abs path>.json"}, ...])
```

Never `update` or `delete` an existing record unless Micah asks: it may hold his call notes.
To change one he asked about, `get` it first and pass its `version` as `if_version`.
