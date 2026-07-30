'use client';

interface TokenBalanceProps {
  tokens: number;
  compact?: boolean;
}

export default function TokenBalance({ tokens, compact = false }: TokenBalanceProps) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-yellow-400/30 text-yellow-300 text-sm font-medium">
        <span className="text-base">●</span>
        {tokens}
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-5">
      <div className="text-neutral-500 text-xs uppercase tracking-wider mb-1">
        Individual Tokens
      </div>
      <div className="text-3xl font-bold text-yellow-300 flex items-center gap-2">
        <span className="text-yellow-400/80">●</span>
        {tokens}
      </div>
      <p className="text-neutral-600 text-sm mt-2">
        Use on exclusive drops & editions
      </p>
    </div>
  );
}
