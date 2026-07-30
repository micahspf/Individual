'use client';

interface TokenBalanceProps {
  tokens: number;
  isFounder?: boolean;
  compact?: boolean;
}

export default function TokenBalance({ tokens, isFounder, compact }: TokenBalanceProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-yellow-400/30 text-yellow-300 text-sm font-medium">
        <span className="text-yellow-400">●</span>
        {tokens}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-yellow-400/20 bg-neutral-950 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-pink-500/5" />
      <div className="relative">
        <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Individual Tokens</div>
        <div className="text-4xl font-bold text-yellow-300 flex items-center gap-2">
          <span className="text-yellow-400 text-3xl">●</span>
          {tokens}
        </div>
        {isFounder && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 text-[11px] font-semibold">
            ★ Founders Edition
          </div>
        )}
        <p className="text-neutral-600 text-sm mt-3">
          Spend on the wheel, exclusive drops, and token-only items
        </p>
      </div>
    </div>
  );
}
