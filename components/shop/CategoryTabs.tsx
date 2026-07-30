"use client";

const categories = [
  { id: "all", label: "All", icon: "✦" },
  { id: "3d-printed", label: "3D Printed", icon: "🖨️" },
  { id: "viral-toys", label: "Viral Toys", icon: "🧸" },
  { id: "apparel", label: "Apparel", icon: "👕" },
  { id: "drinkware", label: "Drinkware", icon: "🥤" },
  { id: "home", label: "Home", icon: "🏠" },
  { id: "custom", label: "Custom Request", icon: "✨" },
];

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-2 px-1 py-1" role="tablist" aria-label="Product categories">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat.id)}
              className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "scale-[1.03] bg-pink-500 text-white shadow-[0_0_25px_rgba(236,72,153,0.45)]"
                  : "border border-neutral-800 bg-neutral-900/80 text-neutral-400 hover:border-pink-500/40 hover:bg-neutral-900 hover:text-pink-300"
              }`}
            >
              <span className="text-base" aria-hidden>
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
