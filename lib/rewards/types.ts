export type EditionType = 'founders' | 'nova' | 'one-time' | null;

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;               // USD price
  category: string;
  badge?: string;
  description?: string;
  
  // Rewards / Exclusive fields
  isTokenOnly?: boolean;       // can only be bought with tokens
  tokenPrice?: number;         // cost in Individual Tokens
  edition?: EditionType;       // founders | nova | one-time
  limitedQuantity?: number;    // total available
  remainingQuantity?: number;  // left in stock
}

export interface UserRewards {
  email: string;
  tokens: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  isFounder: boolean;          // early supporter flag
  createdAt: string;
  updatedAt: string;
}

export interface TokenTransaction {
  id: string;
  email: string;
  amount: number;              // positive = earned, negative = spent
  reason: string;
  createdAt: string;
}
