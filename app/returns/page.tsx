export default function ReturnsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-pink-400 text-sm font-medium mb-3">RETURNS</p>
      <h1 className="text-4xl font-bold mb-6">Returns & Refunds</h1>
      <div className="space-y-5 text-neutral-300 leading-relaxed">
        <p>
          Because every piece is manufactured to order, returns are limited. If we made an error (wrong engraving, defective production, damage in transit), we’ll make it right — repair, remake, or refund.
        </p>
        <p>
          Custom designs and personalized items generally cannot be returned once production has started, unless there is a quality issue on our side.
        </p>
        <p>
          Contact us within 7 days of delivery if something isn’t right. Include photos and your order details.
        </p>
        <p className="text-neutral-500 text-sm">
          Email:{' '}
          <a href="mailto:founder@madebyindividual.com" className="text-pink-400">
            founder@madebyindividual.com
          </a>
        </p>
      </div>
    </main>
  );
}
