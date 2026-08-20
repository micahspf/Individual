import Link from "next/link";
import RequestForm from "@/components/RequestForm";
import HeroDecor from "@/components/home/HeroDecor";
import CatalogStrip from "@/components/home/CatalogStrip";
import BrandLogo from "@/components/ui/BrandLogo";
import { giftOccasions, shopProducts } from "@/lib/data/products";

export default function HomePage() {
  const featured = shopProducts.slice(0, 4);

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
              href="/shop"
              className="glass-pink group flex flex-col p-7 transition hover:border-pink-500/50 sm:p-8"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-pink-300">
                Personalized goods
              </p>
              <h2 className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-50 sm:text-3xl">
                Made for a person, not a shelf.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Names, monograms, dates, and messages on drinkware, signs, keepsakes, and
                desk pieces — produced one order at a time.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {["Tumblers, bottles, and mugs", "Wood signs and keepsakes", "Pet tags and desk pieces"].map(
                  (i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-pink-400">—</span> {i}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-7 flex items-baseline gap-2 border-t border-white/10 pt-5">
                <span className="text-2xl font-semibold tracking-tight text-zinc-50">
                  From $12
                </span>
                <span className="text-sm text-zinc-400">· 7–10 days</span>
              </div>
              <span className="mt-4 inline-block text-sm font-medium text-pink-300 transition group-hover:text-pink-200">
                View the catalog →
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

      {/* Shop — occasions and catalog merged into one browse section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          The catalog
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          Start with the occasion, or start with the thing.
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Drinkware, home keepsakes, fabricated forms, and desk pieces — each one produced
          after you order, with clear personalization options.
        </p>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3">
          {giftOccasions.map((o) => (
            <Link
              key={o.label}
              href={o.href}
              className="glass group p-5 transition hover:border-pink-500/35"
            >
              <div className="font-medium text-zinc-100 transition group-hover:text-pink-300">
                {o.label}
              </div>
              <div className="mt-1.5 text-sm leading-snug text-zinc-400">{o.hint}</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-10">
          <CatalogStrip />
        </div>
      </section>
      {/* Featured products */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                Featured
              </p>
              <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Start here
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-medium text-pink-400 transition hover:text-pink-300"
            >
              Full catalog →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="glass group p-4 transition hover:border-pink-500/40"
              >
                {p.occasions?.[0] && (
                  <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
                    {p.occasions[0]}
                  </span>
                )}
                <div className="font-medium text-zinc-100 transition group-hover:text-pink-300">
                  {p.name}
                </div>
                <div className="mt-1 text-sm text-yellow-300">${p.price.toFixed(2)}</div>
                <div className="mt-2 line-clamp-2 text-xs text-zinc-400">
                  {p.personalize?.[0] ?? "Made to order"}
                </div>
              </Link>
            ))}
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
