export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="glass-strong p-8 sm:p-10">
        <p className="text-pink-400 text-sm font-medium mb-3">LEGAL</p>
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-8">
          Last updated: {/* [FOUNDER: confirm date] */} July 2026
        </p>

        <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Who we are</h2>
            <p>
              Made by Individual (“Individual,” “we,” “us”) is a made-to-order custom
              manufacturing business based in Cullman, Alabama. Contact:{" "}
              <a
                href="mailto:founder@madebyindividual.com"
                className="text-pink-400 hover:text-pink-300"
              >
                founder@madebyindividual.com
              </a>
              . {/* [FOUNDER: add phone if used for SMS] */}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Information we collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Contact details you provide (name, email, shipping address, phone if given)</li>
              <li>Order and payment details processed by Stripe (we do not store full card numbers)</li>
              <li>Messages and custom request content you send us</li>
              <li>Basic site analytics (e.g. Vercel Speed Insights) about page performance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">How we use information</h2>
            <p className="text-zinc-400">
              To fulfill orders, quote custom work, provide support, improve the site, and
              (only if you opt in) send product or drop updates. We do not sell your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">SMS / text messaging</h2>
            <p className="text-zinc-200 border border-white/10 rounded-xl bg-white/5 p-4">
              Mobile opt-in data and consent are{" "}
              <strong>not shared or sold to third parties or lead generators</strong>.
              Text message opt-in information is used only to deliver messages you requested
              from Made by Individual (for example order updates or alerts you explicitly
              subscribed to). Message and data rates may apply. Reply STOP to opt out and
              HELP for help. {/* [FOUNDER: confirm SMS program name/frequency when live] */}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Payments</h2>
            <p className="text-zinc-400">
              Payments are processed by Stripe. Their privacy policy applies to card data they
              process on our behalf.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Retention</h2>
            <p className="text-zinc-400">
              We keep order records as long as needed for production, taxes, and legal
              obligations. You may email us to request access or correction of your contact
              information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
            <p className="text-zinc-400">
              Privacy questions:{" "}
              <a
                href="mailto:founder@madebyindividual.com"
                className="text-pink-400 hover:text-pink-300"
              >
                founder@madebyindividual.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
