"use client";

import TokenIcon from "@/components/rewards/TokenIcon";

interface TokenBalanceProps {
  tokens: number;
  isFounder?: boolean;
  compact?: boolean;
}

export default function TokenBalance({ tokens, isFounder, compact }: TokenBalanceProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-neutral-900 px-3 py-1 text-sm font-medium text-yellow-300">
        <TokenIcon size={16} />
        {tokens}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-pink-500/25 bg-neutral-950 p-6">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-500/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-yellow-400/10 blur-2xl" />
      <div className="relative">
        <div className="mb-1 text-xs uppercase tracking-wider text-neutral-500">
          Individual Tokens
        </div>
        <div className="flex items-center gap-3">
          <TokenIcon size={40} />
          <div className="text-4xl font-bold text-yellow-300">{tokens}</div>
        </div>
        {isFounder && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 text-[11px] font-semibold text-yellow-300">
            ★ Founders Edition · First 100
          </div>
        )}
        <p className="mt-3 text-sm text-neutral-500">
          Spend on the wheel, exclusive drops, and token-only items
        </p>
      </div>
    </div>
  );
}
