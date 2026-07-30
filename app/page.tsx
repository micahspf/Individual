import Link from "next/link";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
            <span>✦</span> MADE JUST FOR YOU
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Custom products
            <br />
            with a <span className="text-pink-400">bubbly</span>
            <br />
            <span className="text-yellow-400">twist</span>{" "}
            <span className="text-yellow-300">✦</span>
          </h1>

          <p className="mb-8 max-w-md text-lg leading-relaxed text-neutral-400">
            Personalize apparel, drinkware, and home goods.{" "}
            <span className="text-pink-300">Bright colors</span>,{" "}
            <span className="text-yellow-300">soft shapes</span>, and{" "}
            <span className="text-white">made-to-order</span> magic — no boring inventory.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3.5 font-medium text-white transition hover:bg-pink-400"
            >
              Shop the fun stuff →
            </Link>
            <Link
              href="#request"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 font-medium text-black transition hover:bg-yellow-300"
            >
              Start customizing
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-yellow-400/15 blur-3xl" />

            <div className="relative z-20 mb-4 ml-12">
              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-br from-neutral-900 to-black shadow-[0_0_40px_rgba(236,72,153,0.25)]">
                <div className="text-center">
                  <div className="text-2xl font-black leading-tight tracking-tight text-pink-400">
                    GOOD
                    <br />
                    VIBES
                    <br />
                    ONLY
                  </div>
                  <div className="mt-1 text-2xl text-yellow-300">☺</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-8">
              <div className="flex h-52 w-64 items-center justify-center rounded-2xl border border-yellow-400/20 bg-neutral-900 shadow-[0_0_30px_rgba(250,204,21,0.15)]">
                <div className="text-center">
                  <div className="text-lg font-semibold text-pink-400">made</div>
                  <div className="text-xl font-bold text-yellow-300">+ for +</div>
                  <div className="text-lg font-semibold text-pink-400">you ♥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-pink-500/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="mb-2 text-2xl text-pink-400">★</div>
            <div className="mb-1 text-3xl font-bold text-pink-400">4.9★</div>
            <div className="mb-1 font-medium">Happy customers</div>
            <p className="text-sm text-neutral-500">Made-to-order love, every time.</p>
          </div>
          <div className="rounded-2xl border border-yellow-400/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(250,204,21,0.1)]">
            <div className="mb-2 text-2xl text-yellow-400">🚚</div>
            <div className="mb-1 text-3xl font-bold text-yellow-400">$75+</div>
            <div className="mb-1 font-medium">Free shipping</div>
            <p className="text-sm text-neutral-500">On orders over $75. No code needed.</p>
          </div>
          <div className="rounded-2xl border border-pink-500/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="mb-2 text-2xl text-pink-400">↺</div>
            <div className="mb-1 text-3xl font-bold text-pink-400">30d</div>
            <div className="mb-1 font-medium">Easy returns</div>
            <p className="text-sm text-neutral-500">Love it or send it back.</p>
          </div>
        </div>
      </section>

      {/* Quick categories */}
      <section id="shop" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-pink-400">✦ SHOP</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Browse the fun stuff</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-pink-400 hover:text-pink-300">
            Open full shop →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {[
            { href: "/shop?category=3d-printed", label: "3D Printed", icon: "🖨️" },
            { href: "/shop?category=viral-toys", label: "Viral Toys", icon: "🧸" },
            { href: "/shop?category=apparel", label: "Apparel", icon: "👕" },
            { href: "/shop?category=drinkware", label: "Drinkware", icon: "🥤" },
            { href: "/shop?category=home", label: "Home", icon: "🏠" },
            { href: "/shop?category=custom", label: "Custom", icon: "✨" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 text-center transition hover:border-pink-500/40 hover:shadow-[0_0_25px_rgba(236,72,153,0.12)]"
            >
              <div className="mb-2 text-3xl">{c.icon}</div>
              <div className="text-sm font-medium text-neutral-200">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-2 text-sm font-medium text-yellow-400">✦ HOW IT WORKS</p>
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">Simple. Clear. Yours.</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { n: "01", t: "Pick or request", d: "Shop a product or tell us exactly what you want made." },
              { n: "02", t: "We quote & design", d: "You get a clear price and plan before anything is made." },
              { n: "03", t: "We make only yours", d: "Printed and finished to order — no waste inventory." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
                <p className="font-mono text-sm font-semibold text-pink-400">{s.n}</p>
                <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="border-t border-neutral-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-2 text-sm font-medium text-pink-400">✦ CUSTOM REQUEST</p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What would you like made?
            </h2>
            <p className="max-w-md text-neutral-400">
              Describe the item, size, material, and colors if you know them. We’ll reply with next
              steps and a quote.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-neutral-500">
              <li>• Photos and sketches help a lot</li>
              <li>• Best for pieces that fit roughly a 12.8″ print cube</li>
              <li>• Based in Alabama · made with care</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
