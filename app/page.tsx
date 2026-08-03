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

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-sm font-medium text-pink-300">
              <span>✦</span> MADE FOR YOU · CULLMAN, ALABAMA
            </p>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Custom 3D prints & laser engraving.{" "}
              <span className="text-pink-400">Made for you.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-400">
              Tumblers, signs, flexi packs, pet tags, and one-off builds — designed, cut, and
              printed only when you order. No waste inventory. Just the piece you actually wanted.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 font-medium text-white shadow-[0_0_30px_rgba(236,72,153,0.35)] transition hover:bg-pink-400"
              >
                Shop custom goods →
              </Link>
              <Link
                href="#request"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-medium text-black transition hover:bg-yellow-300"
              >
                Start a custom request
              </Link>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
              ★ Early supporter · Made to order in Cullman
            </div>
          </div>

          {/* Hero products — clean grid, NO overlap */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {/* Laser tumbler */}
              <div className="glass-pink relative overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80"
                    alt="Laser-engraved tumbler with Individual"
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, 280px"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-xl border border-white/10 bg-[#1c1c21]/50 px-3 py-2 backdrop-blur-sm">
                      <p
                        className="text-center text-xl font-semibold tracking-[0.18em] sm:text-2xl"
                        style={{
                          color: "rgba(230, 230, 230, 0.95)",
                          textShadow: "0 1px 0 rgba(0,0,0,0.5), 0 0 12px rgba(255,255,255,0.12)",
                        }}
                      >
                        Individual
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1c1c21]/95 to-transparent p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-pink-300">
                      Laser engraved
                    </p>
                    <p className="font-semibold">Tumbler · “Individual”</p>
                  </div>
                </div>
              </div>

              {/* Custom wood / home accent */}
              <div className="glass-yellow relative overflow-hidden">
                <div className="flex aspect-[3/4] flex-col items-center justify-center bg-gradient-to-br from-white/[0.06] to-transparent p-6">
                  <div className="flex h-32 w-36 items-center justify-center rounded-2xl border border-white/10 bg-[#1c1c21]/80 backdrop-blur">
                    <div className="text-center">
                      <p
                        className="text-base font-semibold tracking-[0.18em] sm:text-lg"
                        style={{ color: "#d4b896" }}
                      >
                        INDIVIDUAL
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#c4a574]/85">
                        Made to order
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex w-40 gap-2">
                    <div className="h-9 flex-1 rounded-b-xl bg-white/10" />
                    <div className="h-9 flex-1 rounded-b-xl bg-white/10" />
                  </div>
                </div>
                <div className="border-t border-yellow-400/20 bg-[#1c1c21]/50 px-4 py-3 backdrop-blur">
                  <p className="text-xs font-semibold text-yellow-300">
                    Wood signs · flexi packs · custom
                  </p>
                  <p className="text-sm text-zinc-400">Printed or engraved only when you order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="relative border-y border-white/10 bg-white/[0.03] backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-5 text-sm text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">●</span> Locally made in Cullman, Alabama
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400">✦</span> 3D print + laser engrave · made to order
          </span>
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">●</span> Free shipping $75+
          </span>
        </div>
      </div>

      {/* Categories */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-2 text-2xl font-bold">What we make</h2>
        <p className="mb-8 max-w-xl text-zinc-400">
          Maker tools. Custom finishes. No shelves full of leftovers.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { href: "/shop?cat=drinkware", label: "Drinkware", desc: "Laser-engraved tumblers" },
            { href: "/shop?cat=home", label: "Home", desc: "Wood signs & décor" },
            { href: "/shop?cat=3d-printed", label: "3D Printed", desc: "Flexi packs & parts" },
            { href: "/shop?cat=fidget-sensory", label: "Fidget & Sensory", desc: "Ages 13+" },
            { href: "/shop?cat=custom", label: "Custom", desc: "Your exact request" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass group p-5 transition hover:border-pink-500/40"
            >
              <div className="font-medium transition group-hover:text-pink-300">{c.label}</div>
              <div className="mt-1 text-sm text-zinc-400">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold">How it works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Pick or request",
                d: "Shop a product or tell us exactly what to print or engrave.",
              },
              {
                n: "02",
                t: "We quote & design",
                d: "Clear price and timeline before anything hits the machine.",
              },
              {
                n: "03",
                t: "We make only yours",
                d: "3D printed or laser engraved to order. Made for you.",
              },
            ].map((s) => (
              <div key={s.n} className="glass p-6 text-center">
                <div className="mb-3 font-mono text-sm text-pink-400">{s.n}</div>
                <div className="mb-2 text-lg font-medium">{s.t}</div>
                <p className="text-sm text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local maker CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="glass-yellow p-8 sm:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-300">
              Cullman, Alabama
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              One maker. Your piece only when you order.
            </h2>
            <p className="mt-4 max-w-2xl text-zinc-300/90">
              No warehouse leftovers. Clear quote and timeline before anything hits the
              machine — tumblers, signs, flexi packs, pet tags, and custom builds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-pill-yellow px-6 py-3 text-sm">
                Shop the catalog
              </Link>
              <Link
                href="#request"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 transition hover:border-pink-500/40"
              >
                Start a custom request
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom request */}
      <section id="request" className="border-t border-white/10">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="mb-2 text-center text-2xl font-bold">Custom request</h2>
          <p className="mb-8 text-center text-sm text-zinc-400">
            Best for pieces that fit roughly a 12.8″ print cube — or laser engraving on drinkware
            and wood. Made for you.
          </p>
          <div className="glass-strong p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
