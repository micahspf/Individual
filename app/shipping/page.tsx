export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">
        Shipping
      </p>
      <h1 className="font-display mb-6 text-4xl font-medium tracking-tight">
        Shipping & turnaround
      </h1>
      <div className="space-y-5 leading-relaxed text-zinc-300">
        <p>
          Everything is manufactured to order. Plan on a 7–10 day turnaround for standard
          catalog items. Commission work includes a written timeline with every quote.
        </p>
        <p>
          <strong className="text-white">Local (Cullman area):</strong> Pickup is available by
          arrangement — often the fastest option.
        </p>
        <p>
          <strong className="text-white">Shipping:</strong> We ship via standard USPS or
          equivalent. Rates are calculated at checkout or quoted with your commission.
        </p>
        <p className="text-sm text-zinc-400">
          Free shipping thresholds are not offered yet — shipping is calculated per order.
        </p>
      </div>
    </main>
  );
}
