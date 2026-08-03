export default function FAQPage() {
  const faqs = [
    {
      q: "How long does manufacturing take?",
      a: "Plan on 7–10 days for standard catalog items. Commission work receives a written timeline before production begins.",
    },
    {
      q: "What materials do you work with?",
      a: "Stainless steel for drinkware, basswood and birch for signs, anodized aluminum for tags, and durable polymers for fabricated forms and desk pieces. Material is chosen for the job.",
    },
    {
      q: "Do you reproduce licensed logos?",
      a: "We do not sell unlicensed collegiate or brand logos. Personalization with names, dates, and original artwork is welcome. Licensed work requires the proper rights path.",
    },
    {
      q: "Who are the desk accessories for?",
      a: "Desk sliders and multi-mechanism boards are intended for ages 13+. Small parts can be a hazard for younger children. We do not market toys for children under 12.",
    },
    {
      q: "Can I pick up locally in Cullman?",
      a: "Yes — local pickup can be arranged. Mention it when you order or request a quote.",
    },
    {
      q: "What if I need something that is not listed?",
      a: "Use the commission request form. Describe the piece and we will quote price and lead time before any work starts.",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">FAQ</p>
      <h1 className="font-display mb-10 text-4xl font-medium tracking-tight">Questions</h1>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="glass p-5">
            <h2 className="mb-2 font-medium text-white">{f.q}</h2>
            <p className="text-sm leading-relaxed text-zinc-400">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
