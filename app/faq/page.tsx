export default function FAQPage() {
  const faqs = [
    {
      q: 'How long does it take?',
      a: 'Most standard items ship in 2–5 days. Custom requests are quoted with a timeline before we start. Same-week custom is often possible for simpler pieces.',
    },
    {
      q: 'What materials do you use?',
      a: 'PLA and TPU for 3D prints. Stainless steel for tumblers and can coolers. Basswood/birch for signs. Anodized aluminum for pet tags. Everything is chosen for the job.',
    },
    {
      q: 'Do you do Alabama or Auburn logos?',
      a: 'We do not sell unlicensed collegiate logos or trade dress. Personalization with names, dates, and colors is fine. Licensed collegiate work requires the official Community Connect crafter path and is capped.',
    },
    {
      q: 'Are the fidgets for kids?',
      a: 'Our fidget and sensory items are marketed for ages 13+. Small parts can be a choking hazard for younger children. We do not currently sell toys intended primarily for children under 12.',
    },
    {
      q: 'Can I pick up locally in Cullman?',
      a: 'Yes — local pickup can be arranged. Mention it when you order or request.',
    },
    {
      q: 'What if I need something that isn’t listed?',
      a: 'That’s what the Custom Request form is for. Describe what you want and we’ll quote it.',
    },
  ];

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <p className="text-pink-400 text-sm font-medium mb-3">FAQ</p>
      <h1 className="text-4xl font-bold mb-10">Questions</h1>
      <div className="space-y-8">
        {faqs.map((f) => (
          <div key={f.q}>
            <h2 className="font-medium text-white mb-2">{f.q}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
