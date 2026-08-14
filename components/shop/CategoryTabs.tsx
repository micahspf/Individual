'use client';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
  categories: Category[];
}

/**
 * Bubbly, thumb-friendly tab row. Scrolls left-to-right with snap points;
 * big targets so it works for any age on any screen.
 */
export default function CategoryTabs({ active, onChange, categories }: CategoryTabsProps) {
  return (
    <div
      className="w-full overflow-x-auto scrollbar-hide snap-x snap-proximity"
      role="tablist"
      aria-label="Catalog categories"
    >
      <div className="flex min-w-max gap-2.5 px-1 py-1.5">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.id)}
              className={`
                relative flex snap-start items-center gap-2 whitespace-nowrap rounded-full
                px-5 py-3 text-sm font-semibold transition-all duration-300 sm:px-6
                ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ff2d8a] to-[#ff8c42] text-white shadow-[0_0_28px_rgba(255,45,138,0.45)] scale-[1.05]'
                    : 'border border-white/10 bg-white/5 text-zinc-300 backdrop-blur-sm hover:scale-[1.03] hover:border-pink-500/40 hover:bg-white/10 hover:text-pink-200'
                }
              `}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {cat.icon}
              </span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
