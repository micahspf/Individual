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

export default function CategoryTabs({ active, onChange, categories }: CategoryTabsProps) {
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
                  : 'bg-white/5 text-zinc-400 border border-white/10 backdrop-blur-sm hover:border-pink-500/40 hover:bg-white/10 hover:text-pink-300'
                }
              `}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
