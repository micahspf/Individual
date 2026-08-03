export default function AboutPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Individual",
    description:
      "Individual manufacturer of made-to-order goods in Cullman, Alabama.",
    url: "https://www.madebyindividual.com",
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
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <div className="glass-strong p-8 sm:p-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">
          About
        </p>
        <h1 className="font-display mb-6 text-4xl font-medium tracking-tight">
          An individual manufacturer in Cullman
        </h1>
        <div className="space-y-5 leading-relaxed text-zinc-300">
          <p>
            Individual is a solo manufacturing practice based in Cullman, Alabama. Every
            product is made to order — designed or adapted to your brief, then produced only
            for that job. Nothing sits on a shelf waiting to be sold.
          </p>
          <p>
            The work is simple and deliberate: useful, personal goods without the waste of
            traditional inventory. Engraved drinkware, home signs, precision-fabricated
            forms, identification tags, and commissions when the catalog is not enough.
          </p>
          <p>
            This is not a factory brand. It is one manufacturer with professional equipment
            and a commitment to stay small, clear, and local — with honest lead times and
            quotes before production starts.
          </p>
          <p className="pt-4 text-sm text-zinc-500">
            — Micah
            <br />
            Founder, Individual
            <br />
            Cullman, Alabama
          </p>
        </div>
      </div>
    </main>
  );
}
