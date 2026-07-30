import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="text-xl font-semibold tracking-tight">
          Made by <span className="text-pink-400">Individual</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm">
            ☾
          </button>
          <button className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-sm">
            ♥
          </button>
          <button className="w-9 h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center text-sm">
            🛒
          </button>
          <button className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-sm">
            ☰
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 text-sm mb-6">
            <span>✦</span> MADE JUST FOR YOU
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            Custom products
            <br />
            with a <span className="text-pink-400">bubbly</span>
            <br />
            <span className="text-yellow-400">twist</span> <span className="text-yellow-300">✦</span>
          </h1>

          <p className="text-neutral-400 text-lg max-w-md mb-8 leading-relaxed">
            Personalize apparel, drinkware, and home goods.{' '}
            <span className="text-pink-300">Bright colors</span>,{' '}
            <span className="text-yellow-300">soft shapes</span>, and{' '}
            <span className="text-white">made-to-order</span> magic — no boring inventory.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#shop"
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-400 text-white font-medium px-7 py-3.5 rounded-full transition"
            >
              Shop the fun stuff →
            </Link>
            <Link
              href="#customize"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-7 py-3.5 rounded-full transition"
            >
              Start customizing
            </Link>
          </div>
        </div>

        {/* Right product mockups */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow effects */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl" />

            {/* Mug */}
            <div className="relative z-20 mb-4 ml-12">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.25)] flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-pink-400 font-black text-2xl leading-tight tracking-tight">
                    GOOD
                    <br />
                    VIBES
                    <br />
                    ONLY
                  </div>
                  <div className="text-yellow-300 text-2xl mt-1">☺</div>
                </div>
              </div>
            </div>

            {/* Hoodie */}
            <div className="relative z-10 -mt-8">
              <div className="w-64 h-52 rounded-2xl bg-neutral-900 border border-yellow-400/20 shadow-[0_0_30px_rgba(250,204,21,0.15)] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-pink-400 text-lg font-semibold">made</div>
                  <div className="text-yellow-300 text-xl font-bold">+ for +</div>
                  <div className="text-pink-400 text-lg font-semibold">you ♥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-pink-500/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="text-pink-400 text-2xl mb-2">★</div>
            <div className="text-3xl font-bold text-pink-400 mb-1">4.9★</div>
            <div className="font-medium mb-1">Happy customers</div>
            <p className="text-sm text-neutral-500">Thousands of 5-star reviews from awesome people.</p>
          </div>

          <div className="rounded-2xl border border-yellow-400/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(250,204,21,0.1)]">
            <div className="text-yellow-400 text-2xl mb-2">🚚</div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">$75+</div>
            <div className="font-medium mb-1">Free shipping</div>
            <p className="text-sm text-neutral-500">On all orders over $75. No code needed.</p>
          </div>

          <div className="rounded-2xl border border-pink-500/30 bg-neutral-950/80 p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="text-pink-400 text-2xl mb-2">↺</div>
            <div className="text-3xl font-bold text-pink-400 mb-1">30d</div>
            <div className="font-medium mb-1">Easy returns</div>
            <p className="text-sm text-neutral-500">Love it or send it back. No hassle, promise.</p>
          </div>
        </div>
      </section>

      {/* Bottom section */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-pink-400 text-sm mb-4">
            <span>✦</span> FULLY PERSONALIZED
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-5">
            Made your way,
            <br />
            for <span className="text-pink-400">you</span>. <span className="text-pink-400">♥</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-md mb-6 leading-relaxed">
            You dream it, we make it. From the perfect gift to something just for you — it’s all made with care and good vibes.
          </p>
          <Link href="#how" className="text-pink-400 hover:text-pink-300 font-medium">
            How it works →
          </Link>
        </div>

        {/* Product grid mock */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-square flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🥤</div>
              <div className="text-pink-300 text-sm font-medium">Custom Tumbler</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 aspect-square flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🧢</div>
              <div className="text-yellow-300 text-sm font-medium">Custom Hat</div>
            </div>
          </div>
          <div className="col-span-2 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 h-32 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">🛍️</div>
              <div className="text-pink-300 text-sm font-medium">Custom Tote</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
