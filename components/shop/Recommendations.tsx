'use client';

import Link from 'next/link';

const suggestions = [
  {
    trigger: 'tumbler',
    text: 'People who ordered a personalized tumbler also got a matching pet tag',
    href: '/shop?cat=home',
  },
  {
    trigger: 'sign',
    text: 'Based on popular local orders — a Smith Lake version of this sign is trending',
    href: '/shop?cat=home',
  },
  {
    trigger: 'flexi',
    text: 'Party planners often add a second multipack for goodie bags',
    href: '/shop?cat=3d-printed',
  },
  {
    trigger: 'default',
    text: 'Most customers start with a personalized tumbler or a custom wood sign',
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
