/** Official Individual Token economy — single source of truth */

export const WELCOME_BONUS = 20;
export const DAILY_BASE = 3;
export const STREAK_BONUS_DAY_3 = 5; // extra on the 3rd consecutive day
export const STREAK_BONUS_EVERY_7 = 12; // extra on day 7, 14, 21, ...
export const SPIN_COST = 12;
export const MYSTERY_TOKEN_REWARD = 7;
export const FOUNDERS_CAP = 100; // first 100 customers

/** Local calendar date YYYY-MM-DD (not UTC — avoids Alabama day-shift bugs) */
export function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function yesterdayKey(from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() - 1);
  return localDateKey(d);
}

/**
 * Compute daily check-in reward and next streak.
 * Does not mutate state — pure math.
 */
export function computeCheckIn(params: {
  lastCheckIn: string | null;
  streak: number;
  now?: Date;
}): {
  alreadyClaimed: boolean;
  newStreak: number;
  earned: number;
  today: string;
  breakdown: { base: number; streak3: number; streak7: number };
} {
  const today = localDateKey(params.now);
  if (params.lastCheckIn === today) {
    return {
      alreadyClaimed: true,
      newStreak: params.streak,
      earned: 0,
      today,
      breakdown: { base: 0, streak3: 0, streak7: 0 },
    };
  }

  const yKey = yesterdayKey(params.now);
  const newStreak = params.lastCheckIn === yKey ? params.streak + 1 : 1;

  let base = DAILY_BASE;
  let streak3 = 0;
  let streak7 = 0;

  if (newStreak === 3) streak3 = STREAK_BONUS_DAY_3;
  if (newStreak > 0 && newStreak % 7 === 0) streak7 = STREAK_BONUS_EVERY_7;

  const earned = base + streak3 + streak7;

  return {
    alreadyClaimed: false,
    newStreak,
    earned,
    today,
    breakdown: { base, streak3, streak7 },
  };
}

/**
 * Apply a completed wheel spin: always charges SPIN_COST first, then adds winnings.
 * Returns null if insufficient balance.
 */
export function computeSpinResult(params: {
  tokens: number;
  lifetimeSpent: number;
  prize: { label: string; value: number | string };
}): {
  ok: false;
  reason: string;
} | {
  ok: true;
  nextTokens: number;
  nextLifetimeSpent: number;
  prizeTokens: number;
  message: string;
} {
  if (params.tokens < SPIN_COST) {
    return { ok: false, reason: `Need ${SPIN_COST} tokens to spin` };
  }

  let nextTokens = params.tokens - SPIN_COST;
  const nextLifetimeSpent = params.lifetimeSpent + SPIN_COST;
  let prizeTokens = 0;
  let message = "Try again next spin";

  const v = params.prize.value;
  if (typeof v === "number" && v > 0) {
    prizeTokens = v;
    nextTokens += v;
    message = `You won ${params.prize.label}!`;
  } else if (v === "ship") {
    message = "Free shipping unlocked on your next order!";
  } else if (v === "mystery") {
    prizeTokens = MYSTERY_TOKEN_REWARD;
    nextTokens += MYSTERY_TOKEN_REWARD;
    message = `Mystery prize: +${MYSTERY_TOKEN_REWARD} tokens!`;
  } else if (params.prize.label === "Try Again" || v === 0) {
    message = "Better luck next time";
  }

  return {
    ok: true,
    nextTokens,
    nextLifetimeSpent,
    prizeTokens,
    message,
  };
}

/** Fill of streak bar (0–7) for current cycle */
export function streakBarFill(streak: number): number {
  if (streak <= 0) return 0;
  const mod = streak % 7;
  return mod === 0 ? 7 : mod;
}
