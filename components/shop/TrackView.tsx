'use client';

import { useEffect } from 'react';
import { recordProductView } from '@/lib/recs';
import { resolveRecsIdentity } from '@/components/shop/recs-client';

/** Records once per page load (guards React strict-mode double effects). */
const recorded = new Set<string>();

export default function TrackView({
  productId,
  category,
}: {
  productId: string;
  category: string;
}) {
  useEffect(() => {
    if (recorded.has(productId)) return;
    recorded.add(productId);
    resolveRecsIdentity().then((who) => recordProductView(who, productId, category));
  }, [productId, category]);

  return null;
}
