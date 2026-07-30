'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: '3d-printed', label: '3D Printed', icon: '🖨️' },
  { id: 'viral-toys', label: 'Viral Toys', icon: '🧸' },
  { id: 'apparel', label: 'Apparel', icon: '👕' },
  { id: 'drinkware', label: 'Drinkware', icon: '🥤' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'custom', label: 'Custom Request', icon: '✨' },
];

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max px-1 py-1">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                transition-all duration-300 whitespace-nowrap
                ${isActive
                  ? 'bg-pink-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] scale-[1.03]'
                  : 'bg-neutral-900/80 text-neutral-400 border border-neutral-800 hover:border-pink-500/40 hover:text-pink-300 hover:bg-neutral-900'
                }
              `}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-pink-400/20 blur-md -z-10" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
