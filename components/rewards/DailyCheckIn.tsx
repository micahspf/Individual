'use client';

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
  const today = new Date().toISOString().slice(0, 10);
  const claimedToday = lastCheckIn === today || alreadyClaimed;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 relative overflow-hidden">
      {/* subtle glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-white">Daily Check-in</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Come back every day for tokens</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-300">{streak}</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Day streak</div>
          </div>
        </div>

        {/* Streak dots */}
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i < (streak % 7 || (streak > 0 ? 7 : 0))
                  ? 'bg-gradient-to-r from-pink-500 to-yellow-400 shadow-[0_0_8px_rgba(236,72,153,0.5)]'
                  : 'bg-neutral-800'
              }`}
            />
          ))}
        </div>

        {claimedToday ? (
          <div className="text-center py-3 rounded-xl bg-neutral-900 border border-neutral-800">
            <p className="text-sm text-neutral-400">
              {earned && earned > 0 ? (
                <>You claimed <span className="text-yellow-300 font-medium">+{earned} tokens</span> today</>
              ) : (
                <>Already checked in today. See you tomorrow.</>
              )}
            </p>
          </div>
        ) : (
          <button
            onClick={onCheckIn}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
          >
            {loading ? 'Claiming…' : 'Claim Daily Tokens'}
          </button>
        )}

        <p className="text-[11px] text-neutral-600 text-center mt-3">
          Base +3 · 3-day bonus +5 · 7-day bonus +12
        </p>
      </div>
    </div>
  );
}
