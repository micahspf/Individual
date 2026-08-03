export default function AboutPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Made by Individual",
    description:
      "Custom 3D printing and laser engraving made to order in Cullman, Alabama.",
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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <div className="glass-strong p-8 sm:p-10">
        <p className="text-pink-400 text-sm font-medium mb-3">ABOUT</p>
        <h1 className="text-4xl font-bold mb-6">Made in Cullman, Alabama</h1>
        <div className="space-y-5 text-zinc-300 leading-relaxed">
          <p>
            Individual is a solo, part-time maker operation based in Cullman. Every product is made to order — we design or adapt what you ask for, then print or engrave only that piece. Nothing sits on a shelf waiting to be sold.
          </p>
          <p>
            The goal is simple: useful, personal, locally-made goods without the waste of traditional inventory. Personalized tumblers for lake days and gifts, wood signs for homes and churches, flexi animal multipacks for parties, pet tags with honest turnaround, and custom requests when you need something that doesn’t already exist.
          </p>
          <p>
            We’re not a big company. We’re one person with a Bambu Lab H2D, a laser, and a commitment to keep things small, honest, and local.
          </p>
          <p className="text-zinc-500 text-sm pt-4">
            — Micah<br />
            Founder, Made by Individual<br />
            Cullman, Alabama
          </p>
        </div>
      </div>
    </main>
  );
}
