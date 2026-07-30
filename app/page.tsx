import Link from 'next/link';
import RequestForm from '@/components/RequestForm';

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <p className="text-pink-400 text-sm font-medium tracking-wide mb-4">
            ★ MADE JUST FOR YOU · CULLMAN, ALABAMA
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.1]">
            Custom products with a{' '}
            <span className="text-pink-400">bubbly twist</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-xl">
            Personalized tumblers, wood signs, flexi animals, pet tags, and more.
            Made to order — only what you ask for. No waste inventory.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition shadow-[0_0_30px_rgba(236,72,153,0.35)]"
            >
              Shop the fun stuff →
            </Link>
            <Link
              href="#request"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-neutral-700 text-neutral-300 hover:border-pink-500/50 hover:text-pink-300 transition"
            >
              Start customizing
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar — honest local messaging (no fake ratings) */}
      <div className="border-y border-neutral-900 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-neutral-400">
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">●</span> Locally made in Cullman, Alabama
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400">✦</span> Made-to-order — no waste
          </span>
          <span className="flex items-center gap-2">
            <span className="text-yellow-400">●</span> Same-week custom available
          </span>
        </div>
      </div>

      {/* Category teaser */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">What we make</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { href: '/shop?cat=drinkware', label: 'Drinkware', desc: 'Personalized tumblers' },
            { href: '/shop?cat=home', label: 'Home', desc: 'Wood signs & décor' },
            { href: '/shop?cat=3d-printed', label: '3D Printed', desc: 'Flexi multipacks' },
            { href: '/shop?cat=fidget-sensory', label: 'Fidget & Sensory', desc: 'Ages 13+' },
            { href: '/shop?cat=custom', label: 'Custom', desc: 'Your exact request' },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 hover:border-pink-500/40 transition group"
            >
              <div className="font-medium group-hover:text-pink-300 transition">{c.label}</div>
              <div className="text-sm text-neutral-500 mt-1">{c.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-10 text-center">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '01', t: 'Pick or request', d: 'Choose a product or tell us exactly what you want made.' },
              { n: '02', t: 'We quote & design', d: 'You get a clear price and timeline before anything is made.' },
              { n: '03', t: 'We make only yours', d: 'Printed or engraved just for you. Nothing extra sits on a shelf.' },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-pink-400 font-mono text-sm mb-3">{s.n}</div>
                <div className="font-medium text-lg mb-2">{s.t}</div>
                <p className="text-neutral-500 text-sm">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom request */}
      <section id="request" className="border-t border-neutral-900 bg-neutral-950/40">
        <div className="max-w-2xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-2 text-center">Custom Request</h2>
          <p className="text-neutral-500 text-center mb-8 text-sm">
            Best for pieces that fit roughly a 12.8″ print cube. Based in Alabama · made with care.
          </p>
          <RequestForm />
        </div>
      </section>
    </main>
  );
}
