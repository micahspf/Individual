import Link from "next/link";
import { catalogTabs } from "@/lib/catalog";

/**
 * Homepage entry into the catalog: the same bubbly tabs as /shop,
 * rendered as links. Scrolls left-to-right.
 */
export default function CatalogStrip() {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide snap-x snap-proximity">
      <div className="flex min-w-max gap-2.5 px-1 py-1.5">
        {catalogTabs.map((tab) => (
          <Link
            key={tab.id}
            href={`/shop?cat=${tab.id}`}
            className="flex snap-start items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/40 hover:bg-white/10 hover:text-pink-200 sm:px-6"
          >
            <span className="text-lg leading-none" aria-hidden="true">
              {tab.icon}
            </span>
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
