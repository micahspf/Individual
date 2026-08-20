'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { shopProducts } from '@/lib/data/products';
import Link from 'next/link';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return shopProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          (p.occasions && p.occasions.some((o) => o.toLowerCase().includes(term)))
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
          placeholder="Search past work…"
          className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 transition focus:border-pink-500/50 focus:outline-none"
        />
      </form>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#24242b]/95 shadow-xl backdrop-blur-xl">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              onClick={() => {
                setOpen(false);
                setQ('');
              }}
              className="flex items-center justify-between px-4 py-3 text-sm transition hover:bg-white/5"
            >
              <span className="text-zinc-100">{p.name}</span>
              <span className="text-xs text-yellow-300">${p.price}</span>
            </Link>
          ))}
          <button
            onClick={submit}
            className="w-full border-t border-white/10 px-4 py-2.5 text-left text-xs text-pink-400 hover:bg-white/5"
          >
            View all results for “{q}” →
          </button>
        </div>
      )}
    </div>
  );
}
