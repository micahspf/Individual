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
              ★ Founders Edition · First 100 customers
            </div>
          </div>

          {/* Hero products — clean grid, NO overlap */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {/* Laser tumbler with "Individual" engraving */}
              <div className="relative overflow-hidden rounded-3xl border border-pink-500/30 bg-neutral-950 shadow-[0_0_40px_rgba(236,72,153,0.2)]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=80"
                    alt="Laser-engraved tumbler with Individual"
                    fill
                    className="object-cover"
                    sizes="(max-width:640px) 100vw, 280px"
                    priority
                  />
                  {/* Engraved word overlay — "Individual" */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-lg bg-black/25 px-3 py-2 backdrop-blur-[1px]">
                      <p
                        className="text-center text-xl font-semibold tracking-[0.18em] sm:text-2xl"
                        style={{
                          color: "rgba(220, 220, 220, 0.92)",
                          textShadow:
                            "0 1px 0 rgba(0,0,0,0.5), 0 0 12px rgba(255,255,255,0.15)",
                          letterSpacing: "0.2em",
                        }}
                      >
                        Individual
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-pink-300">
                      Laser engraved
                    </p>
                    <p className="font-semibold">Tumbler · “Individual”</p>
                  </div>
                </div>
              </div>

              {/* Founders hoodie — separate card, no overlap */}
              <div className="relative overflow-hidden rounded-3xl border border-yellow-400/25 bg-neutral-900 shadow-[0_0_35px_rgba(250,204,21,0.1)]">
                <div className="flex aspect-[3/4] flex-col items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-950 p-6">
                  <div className="flex h-32 w-36 items-center justify-center rounded-2xl bg-black ring-1 ring-white/5">
                    <div className="text-center">
                      <p
                        className="text-base font-semibold tracking-[0.18em] sm:text-lg"
                        style={{ color: "#d4b896" }}
                      >
                        INDIVIDUAL
                      </p>
                      <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-[#c4a574]/85">
                        Founders Edition
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex w-40 gap-2">
                    <div className="h-9 flex-1 rounded-b-xl bg-neutral-800" />
                    <div className="h-9 flex-1 rounded-b-xl bg-neutral-800" />
                  </div>
                </div>
                <div className="border-t border-yellow-400/20 bg-black/70 px-4 py-3">
                  <p className="text-xs font-semibold text-yellow-300">
                    Founders Edition · First 100 customers
                  </p>
                  <p className="text-sm text-neutral-400">Black hoodie · gold Individual mark</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="relative border-y border-neutral-900 bg-neutral-950/60">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-5 text-sm text-neutral-400">
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
        <p className="mb-8 max-w-xl text-neutral-500">
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
              className="group rounded-2xl border border-neutral-800 bg-neutral-950 p-5 transition hover:border-pink-500/40"
            >
              <div className="font-medium transition group-hover:text-pink-300">{c.label}</div>
              <div className="mt-1 text-sm text-neutral-500">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold">How it works</h2>
          <div className="grid gap-8 md:grid-cols-3">
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
              <div key={s.n} className="text-center">
                <div className="mb-3 font-mono text-sm text-pink-400">{s.n}</div>
                <div className="mb-2 text-lg font-medium">{s.t}</div>
                <p className="text-sm text-neutral-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="border-t border-neutral-900 bg-gradient-to-b from-neutral-950/80 to-black">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-3xl border border-yellow-400/25 bg-black/60 p-8 sm:p-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-yellow-300">
              Founders Edition
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              First 100 customers. Permanent Founders status.
            </h2>
            <p className="mt-4 max-w-2xl text-neutral-400">
              Early supporters get Founders Edition access, token exclusives, and a seat at the
              start of Individual — custom manufacturing built in Cullman, Alabama.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/rewards"
                className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                See rewards & tokens
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-200 transition hover:border-pink-500/40"
              >
                Shop the catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom request */}
      <section id="request" className="border-t border-neutral-900 bg-neutral-950/40">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <h2 className="mb-2 text-center text-2xl font-bold">Custom request</h2>
          <p className="mb-8 text-center text-sm text-neutral-500">
            Best for pieces that fit roughly a 12.8″ print cube — or laser engraving on drinkware
            and wood. Made for you.
          </p>
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
