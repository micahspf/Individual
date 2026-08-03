export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="glass-strong p-8 sm:p-10">
        <p className="text-pink-400 text-sm font-medium mb-3">LEGAL</p>
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-8">
          Last updated: {/* [FOUNDER: confirm date] */} July 2026
        </p>

        <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Agreement</h2>
            <p className="text-zinc-400">
              By using madebyindividual.com and placing an order with Made by Individual
              (Cullman, Alabama), you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Made-to-order products</h2>
            <p className="text-zinc-400">
              Products are manufactured after you order. Catalog turnaround is typically 7–10
              days unless we quote otherwise. Custom work begins only after you accept a quote.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Pricing and payment</h2>
            <p className="text-zinc-400">
              Prices are listed in USD. Payment is collected via Stripe at checkout (or per
              quote for custom work). {/* [FOUNDER: sales tax handling when registered] */}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Shipping and pickup</h2>
            <p className="text-zinc-400">
              Shipping rates are shown at checkout or quoted with custom orders. Local Cullman
              pickup may be arranged. Risk of loss passes when the carrier receives the package.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Returns</h2>
            <p className="text-zinc-400">
              Because items are made to order, returns are limited. Defects or errors on our
              side will be repaired, remade, or refunded. See our{" "}
              <a href="/returns" className="text-pink-400 hover:text-pink-300">
                Returns
              </a>{" "}
              page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Intellectual property</h2>
            <p className="text-zinc-400">
              You confirm you have rights to any logos, text, or artwork you submit for
              custom work. We do not sell unlicensed collegiate marks. You grant us a limited
              license to produce the ordered piece only.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Limitation of liability</h2>
            <p className="text-zinc-400">
              To the fullest extent allowed by Alabama law, Individual is not liable for
              indirect or consequential damages. Our total liability for any order is limited
              to the amount you paid for that order.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
            <p className="text-zinc-400">
              Questions:{" "}
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
