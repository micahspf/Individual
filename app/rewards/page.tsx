"use client";

import { useState, useEffect, useCallback } from "react";
import SpinWheel from "@/components/games/SpinWheel";
import DailyCheckIn from "@/components/rewards/DailyCheckIn";
import TokenBalance from "@/components/rewards/TokenBalance";
import ProgressBar from "@/components/rewards/ProgressBar";
import Link from "next/link";
import {
  WELCOME_BONUS,
  SPIN_COST,
  computeCheckIn,
  computeSpinResult,
  localDateKey,
  type SpinFlags,
} from "@/lib/rewards/constants";

const STORAGE_KEY = "individual_rewards_v3";

type RewardsState = {
  tokens: number;
  streak: number;
  lastCheckIn: string | null;
  lifetimeSpent: number;
  lifetimeEarned: number;
  isFounder: boolean;
  welcomeClaimed: boolean;
  flags: SpinFlags;
};

const defaultState = (): RewardsState => ({
  tokens: WELCOME_BONUS,
  streak: 0,
  lastCheckIn: null,
  lifetimeSpent: 0,
  lifetimeEarned: WELCOME_BONUS,
  isFounder: true,
  welcomeClaimed: true,
  flags: {
    freeShipping: false,
    freeLocalDelivery: false,
    mysteryGift: false,
  },
});

export default function RewardsPage() {
  const [state, setState] = useState<RewardsState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [checkInEarned, setCheckInEarned] = useState<number | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [spinningLock, setSpinningLock] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as Partial<RewardsState>;
        const next: RewardsState = {
          ...defaultState(),
          ...data,
          tokens: Math.max(0, Number(data.tokens) || 0),
          lifetimeSpent: Math.max(0, Number(data.lifetimeSpent) || 0),
          lifetimeEarned: Math.max(0, Number(data.lifetimeEarned) || WELCOME_BONUS),
          streak: Math.max(0, Number(data.streak) || 0),
          flags: {
            ...defaultState().flags,
            ...(data.flags || {}),
          },
        };
        setState(next);
        setAlreadyClaimed(next.lastCheckIn === localDateKey());
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: RewardsState) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  async function handleCheckIn() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));

    const result = computeCheckIn({
      lastCheckIn: state.lastCheckIn,
      streak: state.streak,
    });

    if (result.alreadyClaimed) {
      setAlreadyClaimed(true);
      setMessage("Already checked in today.");
      setLoading(false);
      return;
    }

    const next: RewardsState = {
      ...state,
      tokens: state.tokens + result.earned,
      streak: result.newStreak,
      lastCheckIn: result.today,
      lifetimeEarned: state.lifetimeEarned + result.earned,
    };

    setCheckInEarned(result.earned);
    setAlreadyClaimed(true);
    setMessage(`+${result.earned} tokens claimed!`);
    persist(next);
    setLoading(false);
  }

  function handleSpin(prize: { label: string; value: number | string }) {
    if (spinningLock) return;
    setSpinningLock(true);

    const result = computeSpinResult({
      tokens: state.tokens,
      lifetimeSpent: state.lifetimeSpent,
      prize,
      flags: state.flags,
    });

    if (!result.ok) {
      setMessage(result.reason);
      setSpinningLock(false);
      return;
    }

    const next: RewardsState = {
      ...state,
      tokens: result.nextTokens,
      lifetimeSpent: result.nextLifetimeSpent,
      lifetimeEarned: state.lifetimeEarned + result.prizeTokens,
      flags: result.flags,
    };

    setMessage(result.message);
    persist(next);
    setSpinningLock(false);
  }

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center text-neutral-500">
        Loading rewards…
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="border-b border-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="mb-2 text-sm font-medium tracking-wide text-pink-400">✦ REWARDS</p>
          <h1 className="text-4xl font-bold tracking-tight">
            Earn. Spin. <span className="text-pink-400">Unlock.</span>
          </h1>
          <p className="mt-2 max-w-lg text-neutral-500">
            Daily check-ins, streak bonuses, and a premium spin wheel. Spend tokens on Founders
            & Nova exclusives.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {message && (
          <div className="mb-6 rounded-xl border border-pink-500/30 bg-pink-500/10 py-3 text-center text-sm text-pink-300">
            {message}
          </div>
        )}

        {/* Active perks */}
        {(state.flags.freeShipping ||
          state.flags.freeLocalDelivery ||
          state.flags.mysteryGift) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {state.flags.freeShipping && (
              <span className="rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-200">
                Free Shipping active
              </span>
            )}
            {state.flags.freeLocalDelivery && (
              <span className="rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                Free Local Delivery active
              </span>
            )}
            {state.flags.mysteryGift && (
              <span className="rounded-full border border-pink-400/40 bg-pink-500/15 px-3 py-1 text-xs font-semibold text-pink-200">
                Mystery Gift reserved
              </span>
            )}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <TokenBalance tokens={state.tokens} isFounder={state.isFounder} />
            <DailyCheckIn
              streak={state.streak}
              lastCheckIn={state.lastCheckIn}
              onCheckIn={handleCheckIn}
              earned={checkInEarned}
              alreadyClaimed={alreadyClaimed}
              loading={loading}
            />
            <ProgressBar current={state.lifetimeSpent} target={100} />
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-xs text-neutral-500">
              <p className="mb-1 font-medium text-neutral-400">Token math</p>
              <p>
                Daily base +3 · Day 3 +5 · Every 7 days +12 · Spin costs{" "}
                <strong className="text-yellow-300">{SPIN_COST}</strong>
              </p>
              <p className="mt-1">
                Prizes: 20 / 5 / 0 tokens · Free Shipping · Free Local Delivery · Mystery Gift
              </p>
              <p className="mt-2">
                Earned lifetime:{" "}
                <span className="text-yellow-300">{state.lifetimeEarned}</span> · Spent:{" "}
                <span className="text-pink-300">{state.lifetimeSpent}</span>
              </p>
            </div>
            <Link
              href="/shop"
              className="block rounded-xl border border-neutral-800 py-3 text-center text-sm text-neutral-400 transition hover:border-pink-500/40 hover:text-pink-300"
            >
              Spend tokens in the shop →
            </Link>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col items-center rounded-2xl border border-neutral-800 bg-neutral-950 p-8">
              <h2 className="mb-1 text-xl font-bold">Spin the Wheel</h2>
              <p className="mb-8 text-sm text-neutral-500">
                {SPIN_COST} tokens per spin · Six premium outcomes
              </p>
              <SpinWheel tokens={state.tokens} onSpin={handleSpin} disabled={spinningLock} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
