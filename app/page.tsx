import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import HeroDecor from "@/components/home/HeroDecor";
import BrandLogo from "@/components/ui/BrandLogo";

export default function HomePage() {
  return (
    <main>
      {/* Hero — two paths, because the two audiences share nothing */}
      <section className="relative overflow-hidden">
        <HeroDecor />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-12 lg:pb-24 lg:pt-20">
          <div className="flex flex-col items-center text-center">
            <BrandLogo size="lg" link={false} hero priority />
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff7ab8] sm:text-xs">
              Individual · Cullman, Alabama
            </p>
            <h1 className="font-display mt-6 max-w-2xl text-4xl font-medium leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl">
              Two things, both made to order.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              A tumbler with a name on it, or a system that answers your phone at 7 p.m.
              Nothing here comes off a shelf, and nothing gets built before you have seen
              the price.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {/* Path 1 — the shop */}
            <Link
              href="/#request"
              className="glass-pink group flex flex-col p-7 transition hover:border-pink-500/50 sm:p-8"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-pink-300">
                Custom made pieces
              </p>
              <h2 className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-50 sm:text-3xl">
                Made for a person, not a shelf.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Names, monograms, dates, and messages on drinkware, signs, keepsakes, and
                desk pieces — produced one order at a time.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {["Laser engraving on steel, wood, and slate", "3D printed parts, prototypes, and fixtures", "One-off commissions and small batches"].map(
                  (i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-pink-400">—</span> {i}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-7 border-t border-white/10 pt-5">
                <span className="text-xl font-semibold tracking-tight text-zinc-50">
                  First piece may be free
                </span>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                  On custom projects and prototypes the first sample is on me. Everything
                  else is quoted before it is made — 7–10 days.
                </p>
              </div>
              <span className="mt-4 inline-block text-sm font-medium text-pink-300 transition group-hover:text-pink-200">
                Tell me what you want made →
              </span>
            </Link>

            {/* Path 2 — AI systems */}
            <Link
              href="/ai"
              className="glass-yellow group flex flex-col p-7 transition hover:border-[#ffe14a]/50 sm:p-8"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#ffe14a]">
                AI systems for business
              </p>
              <h2 className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-50 sm:text-3xl">
                The call you miss at 6 p.m. is the customer somebody else keeps.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Automations and AI agents built around how your business actually runs.
                You own it, and it keeps working if we stop.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {["Missed calls get an instant text back", "Follow-up on leads that went quiet", "Invoices and receipts read and filed"].map(
                  (i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#ffe14a]">—</span> {i}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-7 flex items-baseline gap-2 border-t border-white/10 pt-5">
                <span className="text-2xl font-semibold tracking-tight text-zinc-50">
                  From $150
                </span>
                <span className="text-sm text-zinc-400">/ month · or $75 one-off</span>
              </div>
              <span className="mt-4 inline-block text-sm font-medium text-[#ffe14a] transition group-hover:text-[#fff08a]">
                See what it does →
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* Trust bar */}
      <div className="relative border-y border-white/10 bg-white/[0.03] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-12 gap-y-3 px-6 py-5 text-sm text-zinc-400">
          <span>Personalized · made to order</span>
          <span className="hidden text-zinc-600 sm:inline">·</span>
          <span>Cullman, Alabama</span>
          <span className="hidden text-zinc-600 sm:inline">·</span>
          <span>Local Cullman pickup available</span>
        </div>
      </div>

      {/* What we can make — capability list, since nothing is purchasable yet */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Custom manufacturing
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          What can actually be made.
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          The shop catalog is coming. Until then everything runs as a commission — you
          describe it, you get a price and a timeline, and nothing is produced until you
          approve it.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              accent: "#ff2d8a",
              title: "Laser engraving",
              body: "Permanent marking on hard surfaces — names, monograms, dates, logos, coordinates.",
              items: [
                "Stainless drinkware and bottles",
                "Wood signs, boards, and coasters",
                "Slate, acrylic, and leather",
                "Pet tags, bag tags, name plates",
              ],
            },
            {
              accent: "#ff8c42",
              title: "3D printing",
              body: "Functional plastic parts built to your measurements, in rigid or flexible material.",
              items: [
                "Replacement and discontinued parts",
                "Prototypes and proof-of-fit models",
                "Jigs, fixtures, and shop tooling",
                "Flexible and multi-part pieces",
              ],
            },
            {
              accent: "#ffe14a",
              title: "One-off commissions",
              body: "The thing that does not exist yet, or exists and broke and nobody sells it anymore.",
              items: [
                "Small batches and gift sets",
                "Memorials and keepsakes",
                "Event and corporate runs",
                "Bring a photo, a sketch, or the broken part",
              ],
            },
          ].map((g) => (
            <div key={g.title} className="glass flex flex-col p-6">
              <div
                className="mb-4 h-px w-10"
                style={{ backgroundColor: g.accent }}
                aria-hidden="true"
              />
              <h3 className="font-display mb-2 text-xl font-medium text-zinc-50">
                {g.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">{g.body}</p>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-snug text-zinc-300"
                  >
                    <span style={{ color: g.accent }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-[#ffe14a]/25 bg-[#ffe14a]/[0.06] p-6">
          <p className="text-base leading-relaxed text-zinc-300">
            <span className="font-medium text-[#ffe14a]">First piece may be free.</span>{" "}
            On custom projects and prototypes the first sample is on me — ask when you send
            the details. If it works, we talk about the rest of the run.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/#request" className="btn-pill-pink px-6 py-3 text-sm">
              Send me the details
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-pink-500/40"
            >
              See past work
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Process
          </p>
          <h2 className="font-display mb-12 text-center text-3xl font-medium tracking-tight sm:text-4xl">
            How production works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Specify",
                d: "Choose from the catalog or send a commission brief with size, material, and finish.",
              },
              {
                n: "02",
                t: "Quote",
                d: "You receive a clear price and lead time before any material is committed.",
              },
              {
                n: "03",
                t: "Manufacture",
                d: "Your piece is produced to order — finished, checked, and shipped or held for pickup.",
              },
            ].map((s) => (
              <div key={s.n} className="glass p-7">
                <div className="mb-4 text-xs font-medium tracking-[0.18em] text-pink-400">{s.n}</div>
                <div className="font-display mb-2 text-xl font-medium text-zinc-50">{s.t}</div>
                <p className="text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI services — hook, price, phone, and the free guide */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="glass-strong p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ff7ab8]">
                  AI systems for local business
                </p>
                <h2 className="font-display max-w-xl text-3xl font-medium leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl">
                  The call you miss at 6 p.m. is the customer somebody else keeps.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
                  Every business has work that never gets done because nobody was free to do
                  it — the call that went to voicemail, the quote nobody followed up on, the
                  review nobody asked for. That is what a small, purpose-built system handles
                  without complaint.
                </p>

                <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-white/10 pt-6">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-50">
                    From $150
                  </span>
                  <span className="text-sm text-zinc-400">
                    / month · or a single task from $75
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/ai" className="btn-pill-pink px-6 py-3 text-sm">
                    See what it does
                  </Link>
                  <a
                    href="tel:+12565906534"
                    className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
                  >
                    Call 256-590-6534
                  </a>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                  Fifteen minutes about one task, not a sales call.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                    Common starting points
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      { c: "#ff2d8a", t: "Missed calls get an instant text back" },
                      { c: "#ff8c42", t: "Follow-up on leads that went quiet" },
                      { c: "#ffe14a", t: "Review request after every finished job" },
                      { c: "#ff7ab8", t: "Invoices and receipts read and filed" },
                      { c: "#ff2d8a", t: "Agents that run a recurring job end to end" },
                    ].map((i) => (
                      <li key={i.t} className="flex gap-2 text-sm leading-snug text-zinc-400">
                        <span style={{ color: i.c }}>—</span> {i.t}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/what-ai-can-do-for-your-local-business.pdf"
                  className="glass-yellow group block p-6 transition hover:border-[#ffe14a]/40"
                  download
                >
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#ffe14a]">
                    Free download · PDF
                  </p>
                  <p className="font-display text-lg font-medium leading-snug text-zinc-50">
                    What AI Can Actually Do for Your Local Business
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    Two pages, plain language, prices included. Read it before deciding
                    anything.
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-[#ffe14a]">
                    Download the guide →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission form — the only enquiry route, so it gets real weight */}
      <section id="request" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-yellow-300">
                Commission or AI project
              </p>
              <h2 className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-zinc-50 sm:text-4xl">
                Tell me what you need. You get a price first.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-400">
                A personalized piece, or something you keep doing by hand that should be
                doing itself. Either way you get a price and a timeline in writing before
                anything is made or built.
              </p>

              <ul className="mt-8 space-y-3 border-t border-white/10 pt-7 text-sm text-zinc-300">
                {[
                  "Nothing is produced until you approve the quote",
                  "No deposit to ask a question",
                  "Usually answered same or next day",
                ].map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-yellow-300">✓</span> {i}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-7">
                <p className="text-sm text-zinc-400">Rather not fill in a form?</p>
                <a
                  href="tel:+12565906534"
                  className="mt-2 block text-xl font-semibold tracking-tight text-zinc-50 transition hover:text-pink-300"
                >
                  256-590-6534
                </a>
                <a
                  href="mailto:madebyindividual@gmail.com"
                  className="mt-1 block break-words text-sm text-zinc-400 transition hover:text-pink-300"
                >
                  madebyindividual@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-strong p-6 sm:p-8">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
