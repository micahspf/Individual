import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

export const metadata: Metadata = {
  // Root layout applies the "%s · Individual" template
  title: "AI Services",
  description:
    "Custom AI tools and automations built for your exact business — no bloat. Specified, quoted, and built to order in Cullman, Alabama.",
  alternates: { canonical: "https://www.madebyindividual.com/ai" },
};

const capabilityGroups = [
  {
    title: "Customer & sales",
    accent: "#ff2d8a",
    items: [
      "Instant lead response and follow-up",
      "Appointment booking and reminders",
      "Review requests and reply drafting",
      "A simple chatbot for the questions you answer twenty times a week",
      "Personalized email and text sequences",
    ],
  },
  {
    title: "Operations & admin",
    accent: "#ff8c42",
    items: [
      "Invoice and receipt processing",
      "Expense categorization",
      "Meeting notes and action-item extraction",
      "Document summarization",
      "Data entry between the apps you already use — CRM, spreadsheets, email",
    ],
  },
  {
    title: "Marketing & visibility",
    accent: "#ffe14a",
    items: [
      "Google Business Profile posts and updates",
      "Social media content drafts",
      "Local SEO pages and FAQ writing",
      "Ad copy variations",
      "Monthly performance summaries",
    ],
  },
  {
    title: "Custom tools & agents",
    accent: "#ff7ab8",
    items: [
      "Simple internal dashboards",
      "Custom scripts and automations",
      "AI agents that handle a recurring task start to finish",
      "Website forms and landing pages",
      "Order and request intake systems",
    ],
  },
  {
    title: "Business ecosystem",
    accent: "#ff2d8a",
    items: [
      "A connected system where your own lightweight agents hand work to each other — lead → follow-up → booking → review → reporting",
      "Managed monthly instead of rebuilt as one-off projects",
    ],
  },
];

const process = [
  {
    n: "01",
    t: "Specify",
    d: "Describe the task you keep repeating, the apps involved, and what a good result looks like.",
  },
  {
    n: "02",
    t: "Quote",
    d: "You receive a clear price and timeline before any work starts.",
  },
  {
    n: "03",
    t: "Build",
    d: "The tool is built for your workflow, handed over working, and adjusted until it fits.",
  },
];

/** Smaller on-ramps for businesses not ready for a monthly system. */
const smallOptions = [
  {
    name: "One task, one time",
    price: "from $75",
    d: "Pick the single thing you keep doing by hand. It gets built, handed over, and it's yours — no monthly anything.",
  },
  {
    name: "Essentials",
    price: "$250",
    unit: "/ month",
    d: "One system running — usually missed-call capture — kept working and adjusted as you go. The smallest sensible monthly.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$500",
    d: "Core automations for one part of the business — usually lead response and follow-up — with light monthly support.",
    items: [
      "Missed calls get an instant text back, day or night",
      "After-hours callers captured with name, contact, and what they need",
      "Booking and quote requests routed straight to your phone",
      "Urgent messages flagged so real ones reach you fast",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    d: "Several agents working together across sales, admin, and marketing, tuned every month as the business shifts.",
    items: [
      "Everything in Starter",
      "Automatic follow-up on leads that went quiet",
      "Review request after every finished job",
      "Invoices and receipts read and filed",
      "One-page monthly summary of what came in",
    ],
    featured: true,
  },
  {
    name: "Full Custom",
    price: "$2,500",
    d: "A system designed end to end around your exact workflow, with ongoing development and priority turnaround.",
    items: [
      "Everything in Growth",
      "Intake that knows your hours, services, and schedule",
      "Agents that run a recurring job start to finish",
      "A dashboard showing enquiries, jobs, and revenue together",
      "Priority builds as the business changes",
    ],
    featured: false,
  },
];

export default function AIPage() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Coding & Business Systems",
    serviceType: "Custom AI tools, automations, and business systems",
    description:
      "Custom AI tools and automations built for local small businesses — lead response, booking, invoicing, reporting, internal dashboards, and connected AI agent ecosystems.",
    provider: {
      "@type": "LocalBusiness",
      name: "Individual",
      url: "https://www.madebyindividual.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cullman",
        addressRegion: "AL",
        addressCountry: "US",
      },
    },
    areaServed: "Cullman County, Alabama",
    url: "https://www.madebyindividual.com/ai",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-14 text-center lg:pb-20 lg:pt-20">
          <div className="mb-6 flex justify-center">
            <BrandLogo size="lg" link={false} hero priority />
          </div>
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff7ab8] sm:text-xs">
            AI Services · Cullman, Alabama
          </p>
          <h1 className="font-display mx-auto max-w-2xl text-4xl font-medium leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl">
            Individual also offers AI services.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Most small businesses get offered the same two things: enterprise software priced
            for a company ten times their size, or a generic tool that almost fits. Neither is
            built for how you actually work.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
            This is the other option. Automations, internal tools, and AI agents specified
            around your workflow and built one at a time. You get a clear quote and a timeline
            before anything is built. No seats, no bloat, no platform to migrate onto.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/#request" className="btn-pill-pink px-7 py-3.5 text-sm">
              Request a quote
            </Link>
            <Link
              href="#capabilities"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
            >
              What AI can do
            </Link>
          </div>
        </div>
      </section>

      {/* Service card */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="glass-strong p-8 sm:p-12">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ffe14a]">
            Service
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
            AI Coding &amp; Business Systems
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Custom AI tools and automations built for your exact business — no bloat.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Instant lead response and follow-up",
              "Appointment booking, reminders, and review requests",
              "Invoice, receipt, and expense processing",
              "Meeting notes turned into action items",
              "Internal dashboards and intake forms",
              "AI agents that handle a recurring task end to end",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm text-zinc-300">
                <span className="text-pink-400">—</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-zinc-400">
            One-off automations start at{" "}
            <span className="font-medium text-yellow-300">$75</span>. Systems that run every
            day are{" "}
            <span className="font-medium text-yellow-300">$250–$2,500 a month</span>{" "}
            depending on how much is running. You approve the price and timeline before any
            work starts.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Capabilities
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          What AI can do for a local business
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Practical uses, grouped. Most businesses start with one item on this list and add
          from there.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilityGroups.map((g) => (
            <div key={g.title} className="glass p-6">
              <div
                className="mb-4 h-px w-10"
                style={{ backgroundColor: g.accent }}
                aria-hidden="true"
              />
              <h3 className="font-display mb-4 text-xl font-medium text-zinc-50">{g.title}</h3>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-snug text-zinc-400">
                    <span style={{ color: g.accent }}>—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
            Process
          </p>
          <h2 className="font-display mb-12 text-center text-3xl font-medium tracking-tight sm:text-4xl">
            How a build works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((s) => (
              <div key={s.n} className="glass p-7">
                <div className="mb-4 text-xs font-medium tracking-[0.18em] text-pink-400">
                  {s.n}
                </div>
                <div className="font-display mb-2 text-xl font-medium text-zinc-50">{s.t}</div>
                <p className="text-sm leading-relaxed text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem plans */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ffe14a]">
            Monthly
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
            Your own business AI ecosystem
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Not a subscription to someone else’s software — a system built around your
            workflow, maintained and improved every month. Predictable fee, no seat counts, no
            platform lock-in. Start anywhere on this list and move when it makes sense.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`flex flex-col p-7 ${p.featured ? "glass-pink" : "glass-strong"}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-display text-xl font-medium text-zinc-50">
                    {p.name}
                  </div>
                  {p.featured && (
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-pink-400">
                      Most chosen
                    </span>
                  )}
                </div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-50">
                    {p.price}
                  </span>
                  <span className="text-sm text-zinc-400">/ month</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.d}</p>
                <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-snug text-zinc-300">
                      <span className="text-pink-400">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-400">
            <span className="font-medium text-yellow-300">Setup: $500–$1,000 one time</span>,
            quoted before anything is built. Month to month — no contract, no seat counts.
            Every plan is built for one business. Nothing is shared between clients, and
            nothing is a template with your logo on it.
          </p>

          {/* Smaller on-ramps */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ff7ab8]">
              Start smaller
            </p>
            <h3 className="font-display text-2xl font-medium tracking-tight text-zinc-50 sm:text-3xl">
              Too small for a monthly system? Start with one.
            </h3>
            <p className="mt-3 max-w-2xl text-zinc-400">
              A one-person shop does not need an ecosystem. It needs the one job that eats
              every Thursday to stop eating every Thursday.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {smallOptions.map((o) => (
                <div key={o.name} className="glass p-7">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="font-display text-xl font-medium text-zinc-50">
                      {o.name}
                    </div>
                    <div className="flex items-baseline gap-1 whitespace-nowrap">
                      <span className="text-xl font-semibold tracking-tight text-yellow-300">
                        {o.price}
                      </span>
                      {o.unit && <span className="text-xs text-zinc-400">{o.unit}</span>}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{o.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PDF + CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-4 lg:grid-cols-2">
            <a
              href="/what-ai-can-do-for-your-local-business.pdf"
              className="glass-yellow group p-8 transition hover:border-[#ffe14a]/40"
              download
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#ffe14a]">
                Free download · PDF
              </p>
              <h3 className="font-display mb-2 text-2xl font-medium text-zinc-50">
                What AI Can Actually Do for Your Local Business
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                The full list, in plain language. No jargon, no hype — two pages you can read
                before deciding anything.
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-[#ffe14a]">
                Download the PDF →
              </span>
            </a>

            <div className="glass-strong flex flex-col justify-center p-8">
              <h3 className="font-display mb-3 text-2xl font-medium text-zinc-50">
                Start with one task.
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                Describe something you keep doing by hand. You get a price and a timeline
                before any work starts — same process as everything else here.
              </p>
              <div className="mt-7">
                <Link href="/#request" className="btn-pill-pink inline-block px-7 py-3.5 text-sm">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
