# AI Services — Website Copy

Ready-to-place copy for the Individual AI services offering. Voice matches the existing
site: declarative, manufacturing-inflected, no hype. Every price is quoted before work
starts, same as the catalog.

---

## 1. Website announcement / category description

**Short form — homepage strip or services intro:**

> **Individual also offers AI services.**
>
> The same practice, applied to systems. Custom AI tools and automations built for one
> business — yours. Specified, quoted, and built to order, exactly like everything else here.

**Longer form — category page intro:**

> **Individual also offers AI services.**
>
> Most small businesses get offered the same two things: enterprise software priced for a
> company ten times their size, or a generic tool that almost fits. Neither is built for how
> you actually work.
>
> This is the other option. Automations, internal tools, and AI agents specified around your
> workflow and built one at a time. You get a clear quote and a timeline before anything is
> built. No seats, no bloat, no platform to migrate onto.

**One-line nav or card label:**

> AI tools and automations — built to order.

---

## 2. Service card

**Title:**
AI Coding & Business Systems

**One-liner:**
Custom AI tools and automations built for your exact business — no bloat.

**Example offerings:**

- Instant lead response and follow-up
- Appointment booking, reminders, and review requests
- Invoice, receipt, and expense processing
- Meeting notes turned into action items
- Internal dashboards and intake forms
- AI agents that handle a recurring task end to end

**Pricing note:**

> Small automations and scripts: **$75–250**. Larger tools, dashboards, and agents are
> quoted per job. You approve the price and timeline before any work starts.

**Card CTA:**
Request a quote →

---

## 3. What AI can do for a local business

Master capability list. Use in full on the AI services page and in the PDF; use any single
group as a standalone section.

### Customer & sales

- Instant lead response and follow-up
- Appointment booking and reminders
- Review requests and reply drafting
- A simple chatbot for the questions you answer twenty times a week
- Personalized email and text sequences

### Operations & admin

- Invoice and receipt processing
- Expense categorization
- Meeting notes and action-item extraction
- Document summarization
- Data entry between the apps you already use — CRM, spreadsheets, email

### Marketing & visibility

- Google Business Profile posts and updates
- Social media content drafts
- Local SEO pages and FAQ writing
- Ad copy variations
- Monthly performance summaries

### Custom tools & agents

- Simple internal dashboards
- Custom scripts and automations
- AI agents that handle a recurring task start to finish
- Website forms and landing pages
- Order and request intake systems

### Business ecosystem (premium)

- A connected system where your own lightweight agents hand work to each other —
  lead → follow-up → booking → review → reporting
- Managed monthly instead of rebuilt as one-off projects

---

## 4. Monthly ecosystem plans

Positioning line for the section:

> **Your own business AI ecosystem.** Not a subscription to someone else's software — a
> system built around your workflow, maintained and improved every month. Predictable fee,
> no seat counts, no platform lock-in.

| Plan | Description |
|---|---|
| **Starter Ecosystem** | Core automations for one part of the business — usually lead response and follow-up — with light monthly support. |
| **Growth Ecosystem** | Several agents working together across sales, admin, and marketing, tuned every month as the business shifts. |
| **Full Custom Ecosystem** | A system designed end to end around your exact workflow, with ongoing development and priority turnaround. |

Closing line for the section:

> Every plan is built for one business. Nothing is shared between clients, and nothing is
> a template with your logo on it.

*Alternate names if you want the tiers more concrete: **Single System** / **Connected
Systems** / **Full Practice**.*

---

## 5. PDF resource — content outline

**Filename:** `what-ai-can-do-for-your-local-business.pdf`
**Title:** What AI Can Actually Do for Your Local Business
**Subtitle:** A plain list of practical uses — no jargon, no hype.
**Footer on every page:** Individual · Cullman, Alabama · madebyindividual.com

**Structure:**

1. **Header** — title, subtitle, Individual wordmark
2. **Opening, 2–3 sentences** — Most AI advice is written for companies with a tech
   department. This is the version for a business with a handful of people and no time to
   evaluate software.
3. **The five capability groups** from section 3, as scannable bullets
4. **How it works** — Specify → Quote → Build. Three lines, mirroring the catalog process.
5. **What it costs** — Small automations $75–250; larger tools quoted; monthly ecosystem
   plans for ongoing systems.
6. **What this is not** — Not a subscription to someone else's platform. Not set-and-forget.
   Not a rebuild of how you already work.
7. **CTA** — Request a custom quote at madebyindividual.com. Describe the task you keep
   repeating; you get a price and timeline before any work starts.

---

## 6. Request / quote flow — language updates

The existing form is written for physical commissions only ("Commission brief", "size,
material, quantity"). An AI request has none of those. Minimum changes so one form serves both:

**Section heading** (`app/page.tsx`, currently "Commission")
→ `Commission or AI project`

**Section intro** (currently references personalization, size, material)
→ *"Tell us what you need made — a personalized piece, or an automation that handles
something you keep doing by hand. Share the details and a target date. We reply with price
and timeline before work begins."*

**Add a request-type selector** (`components/RequestForm.tsx`) so requests can be triaged:
→ `What is this for?` · **Personalized product** / **AI tool or automation** / **Not sure yet**

**Brief field label** (currently "Commission brief")
→ `What do you need?`

**Brief placeholder** — swap by selected type:
- Product: *"What to personalize (names, monogram, date, message), size, material, quantity, and target date…"* (unchanged)
- AI: *"The task you keep repeating, the apps involved, roughly how often, and what a good result looks like…"*

**Submit button** — unchanged: `Request quote`

**Confirmation copy** (currently "We'll reply with a quote and timeline soon.")
→ *"We'll reply with a quote and timeline. Nothing is built or produced until you approve it."*

**FAQ addition:**
> **Do you take AI or automation work?**
> Yes. Use the same request form and describe the task you want handled. Small automations
> generally run $75–250; larger tools and monthly systems are quoted per job. You get a price
> and lead time before any work starts.
