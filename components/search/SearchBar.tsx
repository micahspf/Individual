'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data/products';
import Link from 'next/link';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (p.badge && p.badge.toLowerCase().includes(term))
      )
      .slice(0, 6);
  }, [q]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    <div ref={ref} className="relative w-full max-w-xs">
      <form onSubmit={submit}>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products…"
          className="w-full bg-neutral-950 border border-neutral-800 rounded-full px-4 py-2 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-pink-500/50 transition"
        />
      </form>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-neutral-800 bg-neutral-950 shadow-xl z-50 overflow-hidden">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              onClick={() => {
                setOpen(false);
                setQ('');
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-900 transition text-sm"
            >
              <span className="text-white">{p.name}</span>
              <span className="text-yellow-300 text-xs">
                {p.isTokenOnly ? `${p.tokenPrice} tokens` : `$${p.price}`}
              </span>
            </Link>
          ))}
          <button
            onClick={submit}
            className="w-full text-left px-4 py-2.5 text-xs text-pink-400 border-t border-neutral-800 hover:bg-neutral-900"
          >
            View all results for “{q}” →
          </button>
        </div>
      )}
    </div>
  );
}
