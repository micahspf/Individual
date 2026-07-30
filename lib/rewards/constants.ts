/** Official Individual Token economy — single source of truth */

export const WELCOME_BONUS = 20;
export const DAILY_BASE = 3;
export const STREAK_BONUS_DAY_3 = 5;
export const STREAK_BONUS_EVERY_7 = 12;
/** Cost per wheel spin */
export const SPIN_COST = 5;
export const FOUNDERS_CAP = 100;

export type SpinPrizeValue = 20 | 5 | 0 | "ship" | "delivery" | "mystery";

export const SPIN_SEGMENTS: {
  label: string;
  value: SpinPrizeValue;
  color: string;
  text: string;
}[] = [
  { label: "20 Tokens", value: 20, color: "#ec4899", text: "#fff" },
  { label: "5 Tokens", value: 5, color: "#facc15", text: "#111" },
  { label: "0 Tokens", value: 0, color: "#404040", text: "#e5e5e5" },
  { label: "Free Shipping", value: "ship", color: "#a855f7", text: "#fff" },
  { label: "Free Local Delivery", value: "delivery", color: "#22d3ee", text: "#0a0a0a" },
  { label: "Mystery Gift", value: "mystery", color: "#db2777", text: "#fff" },
];

/** Local calendar date YYYY-MM-DD (not UTC) */
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

  const base = DAILY_BASE;
  const streak3 = newStreak === 3 ? STREAK_BONUS_DAY_3 : 0;
  const streak7 = newStreak > 0 && newStreak % 7 === 0 ? STREAK_BONUS_EVERY_7 : 0;
  const earned = base + streak3 + streak7;

  return {
    alreadyClaimed: false,
    newStreak,
    earned,
    today,
    breakdown: { base, streak3, streak7 },
  };
}

export type SpinFlags = {
  freeShipping: boolean;
  freeLocalDelivery: boolean;
  mysteryGift: boolean;
};

/**
 * Charge SPIN_COST first, then apply prize.
 * Token prizes: +20, +5, or +0.
 * Non-token prizes: set flags only (no token bonus).
 */
export function computeSpinResult(params: {
  tokens: number;
  lifetimeSpent: number;
  prize: { label: string; value: number | string };
  flags?: SpinFlags;
}):
  | { ok: false; reason: string }
  | {
      ok: true;
      nextTokens: number;
      nextLifetimeSpent: number;
      prizeTokens: number;
      message: string;
      flags: SpinFlags;
    } {
  if (params.tokens < SPIN_COST) {
    return { ok: false, reason: `Need ${SPIN_COST} tokens to spin` };
  }

  let nextTokens = params.tokens - SPIN_COST;
  const nextLifetimeSpent = params.lifetimeSpent + SPIN_COST;
  let prizeTokens = 0;
  const flags: SpinFlags = {
    freeShipping: params.flags?.freeShipping ?? false,
    freeLocalDelivery: params.flags?.freeLocalDelivery ?? false,
    mysteryGift: params.flags?.mysteryGift ?? false,
  };
  let message = "Spin complete";

  const v = params.prize.value;

  if (v === 20 || v === 5) {
    prizeTokens = v;
    nextTokens += v;
    message = `You won ${v} tokens!`;
  } else if (v === 0) {
    prizeTokens = 0;
    message = "0 tokens this spin — better luck next time.";
  } else if (v === "ship") {
    flags.freeShipping = true;
    message = "Free Shipping unlocked on your next order!";
  } else if (v === "delivery") {
    flags.freeLocalDelivery = true;
    message = "Free Local Delivery unlocked (Cullman area)!";
  } else if (v === "mystery") {
    flags.mysteryGift = true;
    message = "Mystery Gift reserved — we'll reveal it on your next order.";
  }

  return {
    ok: true,
    nextTokens,
    nextLifetimeSpent,
    prizeTokens,
    message,
    flags,
  };
}

export function streakBarFill(streak: number): number {
  if (streak <= 0) return 0;
  const mod = streak % 7;
  return mod === 0 ? 7 : mod;
}
