/**
 * Token + Daily Check-in + Streak engine
 * In-memory for now — swap to DB later
 */

import {
  WELCOME_BONUS,
  FOUNDERS_CAP,
  computeCheckIn,
  SPIN_COST,
  localDateKey,
} from "./constants";

export interface UserRewards {
  email: string;
  tokens: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  isFounder: boolean;
  streak: number;
  lastCheckIn: string | null;
  createdAt: string;
  updatedAt: string;
  welcomeClaimed: boolean;
}

const store = new Map<string, UserRewards>();
let founderSlotsUsed = 0;

export function getOrCreateRewards(email: string): UserRewards {
  const key = email.toLowerCase().trim();
  if (!store.has(key)) {
    const now = new Date().toISOString();
    const isFounder = founderSlotsUsed < FOUNDERS_CAP;
    if (isFounder) founderSlotsUsed += 1;
    store.set(key, {
      email: key,
      tokens: 0,
      lifetimeEarned: 0,
      lifetimeSpent: 0,
      isFounder,
      streak: 0,
      lastCheckIn: null,
      createdAt: now,
      updatedAt: now,
      welcomeClaimed: false,
    });
  }
  return store.get(key)!;
}

export function awardWelcomeBonus(email: string): UserRewards {
  const profile = getOrCreateRewards(email);
  if (profile.welcomeClaimed) return profile;
  profile.tokens += WELCOME_BONUS;
  profile.lifetimeEarned += WELCOME_BONUS;
  profile.welcomeClaimed = true;
  profile.updatedAt = new Date().toISOString();
  return profile;
}

export function dailyCheckIn(email: string): {
  profile: UserRewards;
  earned: number;
  alreadyClaimed: boolean;
  streak: number;
  breakdown: { base: number; streak3: number; streak7: number };
} {
  const profile = getOrCreateRewards(email);
  const result = computeCheckIn({
    lastCheckIn: profile.lastCheckIn,
    streak: profile.streak,
  });

  if (result.alreadyClaimed) {
    return {
      profile,
      earned: 0,
      alreadyClaimed: true,
      streak: profile.streak,
      breakdown: result.breakdown,
    };
  }

  profile.streak = result.newStreak;
  profile.tokens += result.earned;
  profile.lifetimeEarned += result.earned;
  profile.lastCheckIn = result.today;
  profile.updatedAt = new Date().toISOString();

  return {
    profile,
    earned: result.earned,
    alreadyClaimed: false,
    streak: profile.streak,
    breakdown: result.breakdown,
  };
}

export function spendTokens(email: string, amount: number): boolean {
  if (amount <= 0) return false;
  const profile = getOrCreateRewards(email);
  if (profile.tokens < amount) return false;
  profile.tokens -= amount;
  profile.lifetimeSpent += amount;
  profile.updatedAt = new Date().toISOString();
  return true;
}

export function addTokens(email: string, amount: number): UserRewards {
  const profile = getOrCreateRewards(email);
  if (amount > 0) {
    profile.tokens += amount;
    profile.lifetimeEarned += amount;
  }
  profile.updatedAt = new Date().toISOString();
  return profile;
}

export function getRewards(email: string): UserRewards {
  return getOrCreateRewards(email);
}

export { SPIN_COST, WELCOME_BONUS, localDateKey };
