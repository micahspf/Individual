export const metadata = {
  title: "About",
  description: "About Individual.com — premium custom products made to order.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight">About Individual.com</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Individual.com is a modern retail platform for high-quality custom products. We believe
        personalization should feel premium — not like a bulk print shop. From monogrammed
        apparel to engraved drinkware and photo canvases, every order is crafted with care.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { t: "Design", d: "Clean product pages built for conversion and clarity." },
          { t: "Craft", d: "Materials chosen to last: cotton, steel, canvas, leather." },
          { t: "Care", d: "Proofing on select items and straightforward support." },
        ].map((item) => (
          <div key={item.t} className="rounded-2xl border border-border p-5">
            <h2 className="font-semibold">{item.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{item.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
