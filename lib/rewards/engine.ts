import { UserRewards, TokenTransaction, Product } from './types';

// ============================================
// In-memory store (replace with DB later)
// ============================================
const rewardsStore = new Map<string, UserRewards>();
const transactions: TokenTransaction[] = [];

const WELCOME_BONUS = 20;

/**
 * Get or create rewards profile for an email
 */
export function getOrCreateRewards(email: string): UserRewards {
  const key = email.toLowerCase().trim();
  
  if (!rewardsStore.has(key)) {
    const now = new Date().toISOString();
    const profile: UserRewards = {
      email: key,
      tokens: 0,
      lifetimeEarned: 0,
      lifetimeSpent: 0,
      isFounder: rewardsStore.size < 100, // first 100 accounts = founders
      createdAt: now,
      updatedAt: now,
    };
    rewardsStore.set(key, profile);
  }
  
  return rewardsStore.get(key)!;
}

/**
 * Award welcome bonus (+20 tokens) — call this on account creation
 */
export function awardWelcomeBonus(email: string): UserRewards {
  const profile = getOrCreateRewards(email);
  
  // Only award once
  const alreadyAwarded = transactions.some(
    (t) => t.email === profile.email && t.reason === 'welcome_bonus'
  );
  
  if (alreadyAwarded) return profile;
  
  profile.tokens += WELCOME_BONUS;
  profile.lifetimeEarned += WELCOME_BONUS;
  profile.updatedAt = new Date().toISOString();
  
  transactions.push({
    id: `txn_${Date.now()}`,
    email: profile.email,
    amount: WELCOME_BONUS,
    reason: 'welcome_bonus',
    createdAt: new Date().toISOString(),
  });
  
  return profile;
}

/**
 * Add tokens for any reason
 */
export function addTokens(email: string, amount: number, reason: string): UserRewards {
  const profile = getOrCreateRewards(email);
  profile.tokens += amount;
  profile.lifetimeEarned += amount;
  profile.updatedAt = new Date().toISOString();
  
  transactions.push({
    id: `txn_${Date.now()}`,
    email: profile.email,
    amount,
    reason,
    createdAt: new Date().toISOString(),
  });
  
  return profile;
}

/**
 * Spend tokens (returns false if not enough)
 */
export function spendTokens(email: string, amount: number, reason: string): boolean {
  const profile = getOrCreateRewards(email);
  
  if (profile.tokens < amount) return false;
  
  profile.tokens -= amount;
  profile.lifetimeSpent += amount;
  profile.updatedAt = new Date().toISOString();
  
  transactions.push({
    id: `txn_${Date.now()}`,
    email: profile.email,
    amount: -amount,
    reason,
    createdAt: new Date().toISOString(),
  });
  
  return true;
}

/**
 * Check if user can afford a token-only product
 */
export function canAfford(email: string, product: Product): boolean {
  if (!product.isTokenOnly || !product.tokenPrice) return true;
  const profile = getOrCreateRewards(email);
  return profile.tokens >= product.tokenPrice;
}

/**
 * Get transaction history for a user
 */
export function getTransactions(email: string): TokenTransaction[] {
  const key = email.toLowerCase().trim();
  return transactions
    .filter((t) => t.email === key)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
