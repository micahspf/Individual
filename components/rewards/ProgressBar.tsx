'use client';

interface ProgressBarProps {
  current: number;
  target: number;
  label?: string;
}

export default function ProgressBar({ current, target, label = 'Next Exclusive Drop' }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="text-xs text-neutral-500">
          {current} / {target} tokens spent
        </span>
      </div>

      <div className="h-3 rounded-full bg-neutral-900 overflow-hidden border border-neutral-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 transition-all duration-700 shadow-[0_0_12px_rgba(236,72,153,0.5)]"
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-[11px] text-neutral-600 mt-2">
        {pct >= 100
          ? 'You’re eligible for the next Founders / Nova drop'
          : `${target - current} more tokens spent to unlock early access`}
      </p>
    </div>
  );
}
