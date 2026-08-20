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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroDecor />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-2 lg:gap-20 lg:pb-28 lg:pt-20">
          <div>
            <div className="mb-5 flex flex-col items-center text-center lg:items-start lg:text-left">
              <BrandLogo size="lg" link={false} hero priority />
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff7ab8] sm:text-xs">
                Individual · Made to order in Cullman, Alabama
              </p>
            </div>
            <h1 className="font-display mx-auto max-w-xl text-center text-4xl font-medium leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl lg:mx-0 lg:text-left lg:text-[3.25rem]">
              Personalized goods, manufactured to order.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-center text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0 lg:text-left">
              Name, monogram, date, or message on drinkware, home pieces, and keepsakes —
              produced one order at a time. Gift-ready ideas with a manufacturer’s finish.
              Clear quotes. Honest timelines.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff2d8a] px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_28px_rgba(255,45,138,0.4)] transition hover:bg-[#ff4da0]"
              >
                View catalog
              </Link>
              <Link
                href="#request"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
              >
                Request a commission
              </Link>
            </div>

            <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-8 lg:mx-0">
              {[
                { k: "Turnaround", v: "7–10 days" },
                { k: "Model", v: "Made to order" },
                { k: "Origin", v: "Cullman, AL" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-400">{item.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-200">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual — text-only capability panels (no stock photos) */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="glass-pink relative overflow-hidden">
                <div className="flex aspect-[3/4] flex-col justify-between bg-gradient-to-br from-[#ff2d8a]/15 via-transparent to-[#ff2d8a]/5 p-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-pink-300">
                      Drinkware
                    </p>
                    <p className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-100">
                      Engraved finish
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex gap-2">
                      <span className="text-pink-400">—</span> Names & monograms
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-400">—</span> Dates & short messages
                    </li>
                    <li className="flex gap-2">
                      <span className="text-pink-400">—</span> Tumblers, bottles, mugs
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-yellow relative overflow-hidden">
                <div className="flex aspect-[3/4] flex-col justify-between bg-gradient-to-br from-[#ff2d8a]/10 via-[#ff8c42]/5 to-[#ffe14a]/10 p-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#ffe14a]">
                      Capability
                    </p>
                    <p className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-100">
                      Precision fabrication & surface finishing
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex gap-2">
                      <span className="text-[#ffe14a]">—</span> Personalization
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#ff8c42]">—</span> Small-batch production
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#ff2d8a]">—</span> One-off commissions
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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

      {/* Occasions */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Occasions
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          Gift ideas that stay personal
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Weddings, housewarmings, corporate sets, memorials — made one at a time, here in
          Cullman.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
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
      </section>

      {/* Categories */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Catalog
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          What we manufacture
        </h2>
        <p className="mt-3 max-w-lg text-zinc-400">
          Drinkware, home keepsakes, fabricated forms, and desk accessories — each piece
          produced after you order, with clear personalization options. Tap a category and
          browse.
        </p>
        <div className="mt-8">
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

      {/* AI services */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="glass-strong p-8 sm:p-12 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <div>
                <div className="mb-5">
                  <BrandLogo size="sm" link={false} />
                </div>
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ff7ab8]">
                  AI Services
                </p>
                <h2 className="font-display max-w-xl text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
                  Individual also offers AI services.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
                  The same practice, applied to systems. Custom AI tools and automations built
                  for one business — yours. Specified, quoted, and built to order, exactly like
                  everything else here.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link href="/ai" className="btn-pill-pink px-6 py-3 text-sm">
                    See AI services
                  </Link>
                  <Link
                    href="#request"
                    className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
                  >
                    Request a quote
                  </Link>
                </div>
              </div>

              <div>
                <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Common starting points
                </p>
                <ul className="space-y-2.5">
                  {[
                    { c: "#ff2d8a", t: "Instant lead response and follow-up" },
                    { c: "#ff8c42", t: "Booking, reminders, and review requests" },
                    { c: "#ffe14a", t: "Invoice and receipt processing" },
                    { c: "#ff7ab8", t: "Internal dashboards and intake forms" },
                    { c: "#ff2d8a", t: "Agents that handle a recurring task end to end" },
                  ].map((i) => (
                    <li key={i.t} className="flex gap-2 text-sm leading-snug text-zinc-400">
                      <span style={{ color: i.c }}>—</span> {i.t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm text-zinc-400">
                  One-off automations from{" "}
                  <span className="font-medium text-yellow-300">$75</span>. Monthly systems{" "}
                  <span className="font-medium text-yellow-300">$150–$1,250</span>, depending
                  on how much is running.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="glass-strong p-8 sm:p-12 lg:p-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-yellow-300">
              Cullman, Alabama
            </p>
            <h2 className="font-display max-w-2xl text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
              Gift personalization without the factory warehouse.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
              Think names, monograms, dates, and occasion gifts — manufactured here one order
              at a time. No surplus inventory. Small runs and commissions with a straight
              7–10 day standard turnaround.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-pill-yellow px-6 py-3 text-sm">
                Browse catalog
              </Link>
              <Link
                href="#request"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-pink-500/40"
              >
                Start a commission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Commission form */}
      <section id="request" className="border-t border-white/10">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Commission or AI project
          </p>
          <h2 className="font-display mb-3 text-center text-3xl font-medium tracking-tight">
            Request a quote
          </h2>
          <p className="mb-10 text-center text-sm leading-relaxed text-zinc-400">
            Tell us what you need made — a personalized piece, or an automation that handles
            something you keep doing by hand. Share the details and a target date. We reply
            with price and timeline before work begins.
          </p>
          <div className="glass-strong p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
