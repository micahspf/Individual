/**
 * Token + Daily Check-in + Streak engine
 * In-memory for now — swap to DB later
 */

export interface UserRewards {
  email: string;
  tokens: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  isFounder: boolean;
  streak: number;
  lastCheckIn: string | null; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

const store = new Map<string, UserRewards>();

const WELCOME_BONUS = 20;
const DAILY_BASE = 3;
const STREAK_BONUS_3 = 5;
const STREAK_BONUS_7 = 12;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getOrCreateRewards(email: string): UserRewards {
  const key = email.toLowerCase().trim();
  if (!store.has(key)) {
    const now = new Date().toISOString();
    store.set(key, {
      email: key,
      tokens: 0,
      lifetimeEarned: 0,
      lifetimeSpent: 0,
      isFounder: store.size < 100,
      streak: 0,
      lastCheckIn: null,
      createdAt: now,
      updatedAt: now,
    });
  }
  return store.get(key)!;
}

export function awardWelcomeBonus(email: string): UserRewards {
  const profile = getOrCreateRewards(email);
  if (profile.lifetimeEarned > 0) return profile;
  profile.tokens += WELCOME_BONUS;
  profile.lifetimeEarned += WELCOME_BONUS;
  profile.updatedAt = new Date().toISOString();
  return profile;
}

export function dailyCheckIn(email: string): {
  profile: UserRewards;
  earned: number;
  alreadyClaimed: boolean;
  streak: number;
} {
  const profile = getOrCreateRewards(email);
  const today = todayKey();

  if (profile.lastCheckIn === today) {
    return { profile, earned: 0, alreadyClaimed: true, streak: profile.streak };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  if (profile.lastCheckIn === yesterdayKey) {
    profile.streak += 1;
  } else {
    profile.streak = 1;
  }

  let earned = DAILY_BASE;
  if (profile.streak === 3) earned += STREAK_BONUS_3;
  if (profile.streak >= 7 && profile.streak % 7 === 0) earned += STREAK_BONUS_7;

  profile.tokens += earned;
  profile.lifetimeEarned += earned;
  profile.lastCheckIn = today;
  profile.updatedAt = new Date().toISOString();

  return { profile, earned, alreadyClaimed: false, streak: profile.streak };
}

export function spendTokens(email: string, amount: number): boolean {
  const profile = getOrCreateRewards(email);
  if (profile.tokens < amount) return false;
  profile.tokens -= amount;
  profile.lifetimeSpent += amount;
  profile.updatedAt = new Date().toISOString();
  return true;
}

export function addTokens(email: string, amount: number): UserRewards {
  const profile = getOrCreateRewards(email);
  profile.tokens += amount;
  profile.lifetimeEarned += amount;
  profile.updatedAt = new Date().toISOString();
  return profile;
}

export function getRewards(email: string): UserRewards {
  return getOrCreateRewards(email);
}
