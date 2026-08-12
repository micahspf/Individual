import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Root layout applies the "%s · Individual" template
  title: "About",
  description:
    "Individual is one person with a workshop in Cullman, Alabama. Personalized goods made to order for neighbors and local businesses — quotes and honest timelines before anything is made.",
  alternates: { canonical: "https://www.madebyindividual.com/about" },
};

export default function AboutPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Individual",
    description:
      "Individual — personalized goods made to order in Cullman, Alabama. A one-person workshop serving Cullman County neighbors and local businesses.",
    url: "https://www.madebyindividual.com",
    email: "founder@madebyindividual.com",
    founder: { "@type": "Person", name: "Micah" },
    // [FOUNDER: add telephone when public]
    // telephone: "+1-...",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cullman",
      addressRegion: "AL",
      addressCountry: "US",
    },
    areaServed: "Cullman County, Alabama",
    priceRange: "$$",
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />

      {/* Intro. The right-hand panel is where a photo of the workshop or bench
          can drop in later without changing the layout. */}
      <div className="glass-strong p-8 sm:p-10 lg:p-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">
          About
        </p>
        <h1 className="font-display mb-8 max-w-2xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-[2.75rem]">
          I’m Micah. I make things here in Cullman.
        </h1>

        <div className="grid gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
          <div className="space-y-5 leading-relaxed text-zinc-300">
            <p>
              Individual is one person — me — with a workshop in Cullman, Alabama. Cullman is
              home. When you order something, it gets made a few miles from wherever you’re
              reading this, and you’re welcome to come pick it up instead of waiting on a
              shipping label.
            </p>
            <p>
              I started this for two reasons. The first is that I wanted to make useful things
              properly, close to home, instead of drop-shipping generic goods in from somewhere
              far away. The second is that if you live around here and you want something
              personalized — a name on a tumbler, a sign for the porch, a run of tags for your
              shop — the options have mostly been faceless online sellers. You upload a file,
              hope for the best, and there’s nobody to call when it comes back wrong.
            </p>
            <p className="font-display text-xl text-zinc-100">There’s somebody to call now.</p>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
              At a glance
            </p>
            <dl className="space-y-4">
              {[
                { k: "Workshop", v: "Cullman, Alabama" },
                { k: "Made", v: "To order, one job at a time" },
                { k: "Turnaround", v: "7–10 days" },
                { k: "Pickup", v: "Local, by arrangement" },
                { k: "Reply", v: "Within one business day" },
              ].map((i) => (
                <div key={i.k} className="border-b border-white/10 pb-3 last:border-0">
                  <dt className="text-[11px] uppercase tracking-wider text-zinc-500">{i.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-200">{i.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Honest about the constraints */}
      <div className="mt-6 glass p-8 sm:p-10">
        <h2 className="font-display mb-3 text-2xl font-medium tracking-tight text-zinc-50">
          What being small actually means
        </h2>
        <p className="mb-7 max-w-2xl leading-relaxed text-zinc-400">
          I’d rather tell you the constraints up front than have you find them out after you’ve
          ordered.
        </p>
        <ul className="grid gap-5 sm:grid-cols-2">
          {[
            {
              c: "#ff2d8a",
              t: "This runs alongside a day job",
              d: "Evenings and weekends. That’s the honest reason turnaround is 7–10 days and not two. If you have a hard date, tell me and I’ll say yes or no before you pay anything.",
            },
            {
              c: "#ff8c42",
              t: "Nothing is sitting on a shelf",
              d: "Every piece is made after you order it. No surplus inventory, no warehouse, no clearance bin of somebody else’s name.",
            },
            {
              c: "#ffe14a",
              t: "You get the price first",
              d: "A quote and a lead time before anything is cut, printed, or engraved. No surprises at the end.",
            },
            {
              c: "#ff7ab8",
              t: "You’re talking to me",
              d: "Not a ticket queue and not a chatbot. The person answering your email is the person making your order.",
            },
          ].map((i) => (
            <li key={i.t}>
              <div className="mb-2 h-px w-8" style={{ backgroundColor: i.c }} aria-hidden="true" />
              <div className="mb-1.5 font-medium text-zinc-100">{i.t}</div>
              <p className="text-sm leading-relaxed text-zinc-400">{i.d}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Two audiences */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="glass-pink p-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
            For neighbors
          </p>
          <h2 className="font-display mb-3 text-2xl font-medium tracking-tight text-zinc-50">
            The gift that had to be right
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-400">
            Weddings, new houses, graduations, teacher gifts, memorials. The pieces people keep
            are usually the ones with a name, a date, or a few words that mean something to one
            family and nothing to anybody else.
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            Bring me the words. I’ll tell you what it costs and when it’ll be ready — and if
            you’re in town, you can pick it up rather than trusting it to a box.
          </p>
        </div>

        <div className="glass-yellow p-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ffe14a]">
            For local businesses
          </p>
          <h2 className="font-display mb-3 text-2xl font-medium tracking-tight text-zinc-50">
            Small runs, without the minimums
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-zinc-400">
            Signage, branded drinkware, staff and client gifts, identification tags, counter
            pieces, and short production runs. If you need twelve of something, you should be
            able to order twelve of something.
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            And if what’s slowing you down isn’t a physical object — it’s the invoicing, the
            follow-up, the same email answered twenty times a week — I also build{" "}
            <Link href="/ai" className="text-[#ffe14a] underline-offset-4 hover:underline">
              AI tools and automations
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Close */}
      <div className="mt-6 glass-strong p-8 sm:p-10">
        <h2 className="font-display mb-4 max-w-2xl text-2xl font-medium tracking-tight text-zinc-50 sm:text-3xl">
          If you’re in Cullman, you’re not a support ticket.
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-zinc-400">
          You’re a neighbor with a project. Tell me what you’re trying to make — even if you’re
          not sure it’s possible yet — and I’ll tell you straight whether I can do it, what it
          costs, and how long it takes.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/#request" className="btn-pill-pink px-7 py-3.5 text-sm">
            Start a request
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
          >
            Contact
          </Link>
        </div>
        <p className="mt-9 border-t border-white/10 pt-6 text-sm text-zinc-500">
          — Micah
          <br />
          Founder, Individual
          <br />
          Cullman, Alabama
        </p>
      </div>
    </main>
  );
}
