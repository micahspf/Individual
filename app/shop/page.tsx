import ShopClient from '@/components/shop/ShopClient';

/**
 * Server component so the initial catalog view (grid + tabs) ships in the
 * HTML for search engines. All interactivity lives in ShopClient; reading
 * searchParams here (instead of useSearchParams in the client) is what keeps
 * the page from bailing out to client-side rendering in production.
 */

/** Old links use ?cat=home; the tab id is home-office now. */
function normalizeCat(raw: string): string {
  return raw === 'home' ? 'home-office' : raw;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialCat = normalizeCat(first(params.cat) || 'all');
  const initialQ = first(params.q) || '';
  return <ShopClient initialCat={initialCat} initialQ={initialQ} />;
}
