# Reporting — sheet structure + weekly note

One Google Sheet per client. Same structure every client, forever. The point is that
reporting takes 10 minutes and never gets redesigned.

Import [`templates/client-report.csv`](templates/client-report.csv) to start.

---

## Tab 1: `Weekly` — the only tab that matters

| Column | What goes in it |
|---|---|
| Week Ending | Friday's date |
| Ad Spend | From Google Ads, that week |
| Impressions | |
| Clicks | |
| CTR | Clicks / Impressions |
| Avg CPC | Spend / Clicks |
| Phone Calls | Call conversions — calls from ads + website call clicks |
| Form Leads | Form submissions |
| Total Leads | Calls + Forms |
| Cost Per Lead | Spend / Total Leads |
| Booked Jobs | **Client tells you this.** Ask every Friday. |
| Cost Per Booked Job | Spend / Booked Jobs |
| Revenue (if known) | Client tells you |
| ROAS | Revenue / Spend |
| Notes | What you changed |

**"Booked Jobs" is the only number the client actually cares about.** You can't pull it
from Google Ads — it lives in their scheduling software or in their head. Ask for it
every single week starting week one. If you wait until day 30 to ask, you'll get a
shrug, and a shrug at day 30 loses the renewal.

## Tab 2: `Monthly`
Same columns, one row per month. Built by summing the weekly rows. This is what you
screenshot for the monthly review call and, eventually, for the case study.

## Tab 3: `Changes`
| Date | What changed | Why | Result observed |
|---|---|---|---|

Every keyword added, negative added, bid adjusted, ad rewritten, budget moved.

Two reasons this tab exists. It's your defense when a client asks "what am I paying you
for" — you show them 40 rows. And it's how you avoid re-testing something you already
tested in month one.

## Tab 4: `Setup` — filled once, at kickoff
Account ID · budget · target cost per booked call · client's average ticket · close
rate on inbound calls · service area · business hours · what they do NOT service ·
who answers the phone · login/access notes.

---

## The weekly note — 4 lines, every Friday

Email or text. **Never a PDF, never a dashboard link.** HVAC owners read texts on a job
site; they do not log into Data Studio.

```
[Company] — week of [date]

Spend: $X
Calls: X  ·  Cost per call: $X
Changed: [one thing]
Next week: [one thing]

Booked any jobs off these? — [your name]
```

**Real example:**

```
Sandifer Heating & Air — week of Mar 14

Spend: $612
Calls: 19  ·  Cost per call: $32
Changed: cut ads 8pm-7am, phones were rolling to voicemail
Next week: adding replacement keywords, higher ticket than repair

Booked any jobs off these? — Micah
```

### Rules
- Four lines. If it's longer, you're hiding a bad week behind volume.
- Always end with the booked-jobs question. Every week. It trains the habit and it's
  how you get the renewal conversation started early.
- Send it on a bad week too. **Especially** on a bad week — silence after a bad week is
  what gets agencies fired.
- Never send a metric the client can't act on. No impression share, no quality score,
  no auction insights unless they ask.

## Monthly review call — 30 min, same shape every time

1. Here's the month (screenshot of the Monthly tab) — 5 min
2. Here's what I changed and why — 5 min
3. Here's what booked and what it was worth — 10 min *(client talks)*
4. Here's what I'm doing next month — 5 min
5. Anything you need from me — 5 min

Send the screenshot before the call, not during. Otherwise you spend the call watching
them read.

---

## Done when

- [ ] Sheet exists with all 4 tabs
- [ ] `Setup` tab filled at kickoff
- [ ] First weekly note sent by the first Friday after launch
- [ ] Client has been asked for booked-jobs count at least once
