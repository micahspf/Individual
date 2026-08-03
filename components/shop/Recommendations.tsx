'use client';

import Link from 'next/link';

const suggestions = [
  {
    trigger: 'drinkware',
    text: 'Pair drinkware with a monogram coaster set for a complete host gift',
    href: '/shop?cat=home',
  },
  {
    trigger: 'home',
    text: 'Housewarming favorites: family name sign + engraved cutting board',
    href: '/shop?q=cutting',
  },
  {
    trigger: 'fidget',
    text: 'Build a custom squish with your choice of fill — or grab a sensory favor pack for events',
    href: '/shop?cat=fidget-sensory',
  },
  {
    trigger: 'form',
    text: 'Event sets pair well with sensory favor packs and bag tags',
    href: '/shop?cat=fidget-sensory',
  },
  {
    trigger: 'default',
    text: 'Most gifts start with a personalized tumbler or family name sign',
    href: '/shop?cat=drinkware',
  },
];

export default function Recommendations({ context = 'default' }: { context?: string }) {
  const item =
    suggestions.find((s) => context.toLowerCase().includes(s.trigger)) ||
    suggestions[suggestions.length - 1];

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
      <p className="text-sm text-zinc-400">
        <span className="text-pink-400/80">✦</span> {item.text}
      </p>
      <Link
        href={item.href}
        className="text-xs text-yellow-300 hover:text-yellow-200 whitespace-nowrap"
      >
        View →
      </Link>
    </div>
  );
}
