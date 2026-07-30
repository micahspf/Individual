"use client";

import { DAILY_BASE, STREAK_BONUS_DAY_3, STREAK_BONUS_EVERY_7, localDateKey, streakBarFill } from "@/lib/rewards/constants";

interface DailyCheckInProps {
  streak: number;
  lastCheckIn: string | null;
  onCheckIn: () => void;
  earned?: number | null;
  alreadyClaimed?: boolean;
  loading?: boolean;
}

export default function DailyCheckIn({
  streak,
  lastCheckIn,
  onCheckIn,
  earned,
  alreadyClaimed,
  loading,
}: DailyCheckInProps) {
  const today = localDateKey();
  const claimedToday = lastCheckIn === today || alreadyClaimed;
  const fill = streakBarFill(streak);

  return (
    <div className="glass relative overflow-hidden p-6">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-zinc-100">Daily Check-in</h3>
            <p className="mt-0.5 text-xs text-zinc-400">Come back every day for tokens</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-300">{streak}</div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">Day streak</div>
          </div>
        </div>

        <div className="mb-5 flex gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i < fill
                  ? "bg-gradient-to-r from-pink-500 to-yellow-400 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  : "bg-neutral-800"
              }`}
            />
          ))}
        </div>

        {claimedToday ? (
          <div className="rounded-xl border border-white/10 bg-white/5 py-3 text-center">
            <p className="text-sm text-zinc-400">
              {earned && earned > 0 ? (
                <>
                  You claimed <span className="font-medium text-yellow-300">+{earned} tokens</span>{" "}
                  today
                </>
              ) : (
                <>Already checked in today. See you tomorrow.</>
              )}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onCheckIn}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(236,72,153,0.3)] transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Claiming…" : "Claim Daily Tokens"}
          </button>
        )}

        <p className="mt-3 text-center text-[11px] text-neutral-600">
          Base +{DAILY_BASE} · Day 3 +{STREAK_BONUS_DAY_3} · Every 7 days +{STREAK_BONUS_EVERY_7}
        </p>
      </div>
    </div>
  );
}
