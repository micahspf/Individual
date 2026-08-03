import Link from "next/link";
import Image from "next/image";
import RequestForm from "@/components/RequestForm";
import HeroDecor from "@/components/home/HeroDecor";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroDecor />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-2 lg:gap-20 lg:pb-28 lg:pt-24">
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-pink-300/90">
              Individual manufacturer · Cullman, Alabama
            </p>
            <h1 className="font-display max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.25rem]">
              Made-to-order goods from a single manufacturer.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg">
              Drinkware, home pieces, precision parts, and custom commissions — designed
              and produced only when you order. Clear quotes. Honest timelines. No waste inventory.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_28px_rgba(236,72,153,0.3)] transition hover:bg-pink-400"
              >
                View catalog
              </Link>
              <Link
                href="#request"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-yellow-400/40 hover:bg-yellow-400/10"
              >
                Request a commission
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                { k: "Turnaround", v: "7–10 days" },
                { k: "Model", v: "Made to order" },
                { k: "Origin", v: "Cullman, AL" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">{item.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-200">{item.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <div className="glass-pink relative overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80"
                    alt="Personalized engraved drinkware by Individual"
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, 280px"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c1c21]/95 to-transparent p-5">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-pink-300">
                      Engraved finish
                    </p>
                    <p className="font-display mt-1 text-lg font-medium tracking-wide">Drinkware</p>
                  </div>
                </div>
              </div>

              <div className="glass-yellow relative overflow-hidden">
                <div className="flex aspect-[3/4] flex-col justify-between bg-gradient-to-br from-white/[0.05] to-transparent p-6">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-yellow-300/90">
                      Capability
                    </p>
                    <p className="font-display mt-3 text-2xl font-medium leading-snug text-zinc-100">
                      Precision fabrication & surface finishing
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex gap-2">
                      <span className="text-yellow-400">—</span> Personalization
                    </li>
                    <li className="flex gap-2">
                      <span className="text-yellow-400">—</span> Small-batch production
                    </li>
                    <li className="flex gap-2">
                      <span className="text-yellow-400">—</span> One-off commissions
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
          <span>Individual manufacturer</span>
          <span className="hidden text-zinc-600 sm:inline">·</span>
          <span>Made to order only</span>
          <span className="hidden text-zinc-600 sm:inline">·</span>
          <span>Free shipping $75+</span>
        </div>
      </div>

      {/* Categories */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Catalog
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          What we manufacture
        </h2>
        <p className="mt-3 max-w-lg text-zinc-400">
          Focused lines for everyday use and custom work — each piece produced after you order.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { href: "/shop?cat=drinkware", label: "Drinkware", desc: "Engraved tumblers & coolers" },
            { href: "/shop?cat=home", label: "Home", desc: "Signs & interior pieces" },
            { href: "/shop?cat=3d-printed", label: "Fabricated", desc: "Precision parts & forms" },
            { href: "/shop?cat=fidget-sensory", label: "Accessories", desc: "Desk & everyday tools" },
            { href: "/shop?cat=custom", label: "Commission", desc: "Your exact specification" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass group p-5 transition hover:border-pink-500/35"
            >
              <div className="font-medium text-zinc-100 transition group-hover:text-pink-300">
                {c.label}
              </div>
              <div className="mt-1.5 text-sm leading-snug text-zinc-500">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
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

      {/* Positioning CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="glass-strong p-8 sm:p-12 lg:p-14">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-yellow-300/90">
              Cullman, Alabama
            </p>
            <h2 className="font-display max-w-2xl text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
              One manufacturer. Your order only when you need it.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
              Individual is a solo manufacturing practice — no warehouse surplus, no mass
              inventory. Personalization, small runs, and one-off commissions with a straight
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
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Commission
          </p>
          <h2 className="font-display mb-3 text-center text-3xl font-medium tracking-tight">
            Request a quote
          </h2>
          <p className="mb-10 text-center text-sm leading-relaxed text-zinc-400">
            Share dimensions, material preference, quantity, any text or artwork, and your
            target date. We reply with price and timeline before work begins.
          </p>
          <div className="glass-strong p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
