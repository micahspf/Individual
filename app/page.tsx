import RequestForm from "@/components/RequestForm";

const capabilities = [
  {
    title: "3D printing",
    body: "Functional parts, fixtures, prototypes, and custom pieces — printed only when ordered.",
  },
  {
    title: "Custom design",
    body: "Send a photo, sketch, or idea. We adapt it into something manufacturable.",
  },
  {
    title: "Zero waste model",
    body: "No bulk inventory. No leftover stock. Made for you, then shipped.",
  },
  {
    title: "Small-batch friendly",
    body: "One piece or a short run. Start simple without factory minimums.",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us what you want",
    body: "Describe the item, size, material, and any details that matter.",
  },
  {
    n: "02",
    title: "We design & quote",
    body: "You get a clear quote and timeline before anything is made.",
  },
  {
    n: "03",
    title: "We manufacture it",
    body: "Printed and finished to order — only after you approve.",
  },
];

const examples = [
  "Name plates & signs",
  "Replacement parts",
  "Brackets & mounts",
  "Custom organizers",
  "Gift keepsakes",
  "Prototypes",
];

export default function Home() {
  return (
    <main className="grain min-h-screen">
      {/* Header */}
      <header className="relative z-10 border-b border-[var(--line)]/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="text-sm font-bold tracking-[0.18em] uppercase">
            Made by <span className="text-[var(--accent)]">Individual</span>
          </a>
          <nav className="flex items-center gap-5 text-sm text-[var(--fg-muted)]">
            <a href="#how" className="hidden transition hover:text-[var(--fg)] sm:inline">
              How it works
            </a>
            <a href="#capabilities" className="hidden transition hover:text-[var(--fg)] sm:inline">
              Capabilities
            </a>
            <a
              href="#request"
              className="rounded-full border border-[var(--line)] px-4 py-2 font-medium text-[var(--fg)] transition hover:border-[var(--fg)]/30 hover:bg-white/5"
            >
              Request a quote
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative z-10 overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
          <div>
            <p className="section-kicker mb-5">On-demand manufacturing</p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              We can individually manufacture{" "}
              <span className="text-[var(--accent)]">anything you want</span>
              <span className="text-[var(--fg-muted)]"> with no waste.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
              Custom 3D printing and made-to-order fabrication. You request it.
              We design it. We make only what you need.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#request" className="btn-primary !w-auto px-7">
                Start a request
              </a>
              <a href="#how" className="btn-ghost">
                See how it works
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-[var(--line)] pt-8">
              <div>
                <p className="text-xl font-semibold">No MOQ</p>
                <p className="mt-1 text-xs text-[var(--fg-soft)]">One is enough</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Made once</p>
                <p className="mt-1 text-xs text-[var(--fg-soft)]">Zero leftover stock</p>
              </div>
              <div>
                <p className="text-xl font-semibold">Clear quote</p>
                <p className="mt-1 text-xs text-[var(--fg-soft)]">Before we build</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card-surface relative overflow-hidden p-6 sm:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--accent)]/20 blur-3xl" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                Build envelope
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight">
                Up to ~12.8″ in each direction
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                Ideal for custom parts, household fixes, branded pieces, and
                one-off gifts that factories won’t touch.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["PLA / specialty filaments", "Functional prototypes", "Name & sign pieces", "Brackets & adapters"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[var(--line)] bg-white/[0.02] px-3 py-3 text-sm text-[var(--fg-muted)]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="section-kicker">Process</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple. Clear. Made to order.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="card-surface p-6">
                <p className="font-mono text-sm font-semibold text-[var(--accent)]">{step.n}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Capabilities</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for real requests
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--fg-muted)]">
              Not a catalog of leftover inventory. A manufacturing desk for the
              thing you actually need.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <article key={item.title} className="card-surface p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <span
                key={ex}
                className="rounded-full border border-[var(--line)] bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-[var(--fg-muted)]"
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">Start here</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What would you like made?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--fg-muted)] sm:text-base">
              Send the idea. You’ll get a human reply with next steps and a
              quote — not a spam sequence.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--fg-muted)]">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                Usually best for pieces that fit roughly within a 12.8″ cube
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                Photos, sketches, and rough dimensions all help
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                Based in Alabama · built part-time with care
              </li>
            </ul>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <RequestForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-bold tracking-[0.16em] uppercase">
              Made by <span className="text-[var(--accent)]">Individual</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-[var(--fg-soft)]">
              Custom manufacturing on demand. No waste inventory.
            </p>
          </div>
          <div className="text-sm text-[var(--fg-soft)]">
            <p>www.madebyindividual.com</p>
            <p className="mt-1">© {new Date().getFullYear()} Individual</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
