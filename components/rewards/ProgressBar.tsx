'use client';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}

export default function ProgressBar({ current, target, label = 'Next Exclusive Drop' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="glass p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-100">{label}</span>
        <span className="text-xs text-zinc-400">
          {current} / {target} tokens spent
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.5)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-2 text-[11px] text-zinc-500">
        {pct >= 100
          ? 'You’re eligible for the next Founders / Nova drop'
          : `${target - current} more tokens spent to unlock early access`}
      </p>
    </div>
  );
}
