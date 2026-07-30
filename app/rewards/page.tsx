'use client';

import { useState, useEffect } from 'react';
import SpinWheel from '@/components/games/SpinWheel';
import DailyCheckIn from '@/components/rewards/DailyCheckIn';
import TokenBalance from '@/components/rewards/TokenBalance';
import ProgressBar from '@/components/rewards/ProgressBar';
import Link from 'next/link';

// Demo email for local testing — replace with real auth later
const DEMO_EMAIL = 'demo@individual.com';

export default function RewardsPage() {
  const [tokens, setTokens] = useState(20);
  const [streak, setStreak] = useState(0);
  const [lastCheckIn, setLastCheckIn] = useState<string | null>(null);
  const [isFounder, setIsFounder] = useState(true);
  const [lifetimeSpent, setLifetimeSpent] = useState(0);
  const [checkInEarned, setCheckInEarned] = useState<number | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load demo state from localStorage so it persists across refreshes
  useEffect(() => {
    try {
      const raw = localStorage.getItem('individual_rewards_demo');
      if (raw) {
        const data = JSON.parse(raw);
        setTokens(data.tokens ?? 20);
        setStreak(data.streak ?? 0);
        setLastCheckIn(data.lastCheckIn ?? null);
        setLifetimeSpent(data.lifetimeSpent ?? 0);
        setIsFounder(data.isFounder ?? true);
      }
    } catch {}
  }, []);

  function save(next: {
    tokens: number;
    streak: number;
    lastCheckIn: string | null;
    lifetimeSpent: number;
    isFounder: boolean;
  }) {
    localStorage.setItem('individual_rewards_demo', JSON.stringify(next));
  }

  async function handleCheckIn() {
    setLoading(true);
    // Simulate API
    await new Promise((r) => setTimeout(r, 500));

    const today = new Date().toISOString().slice(0, 10);
    if (lastCheckIn === today) {
      setAlreadyClaimed(true);
      setLoading(false);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);

    let newStreak = lastCheckIn === yKey ? streak + 1 : 1;
    let earned = 3;
    if (newStreak === 3) earned += 5;
    if (newStreak >= 7 && newStreak % 7 === 0) earned += 12;

    const nextTokens = tokens + earned;
    setTokens(nextTokens);
    setStreak(newStreak);
    setLastCheckIn(today);
    setCheckInEarned(earned);
    setAlreadyClaimed(true);
    setMessage(`+${earned} tokens claimed!`);
    save({
      tokens: nextTokens,
      streak: newStreak,
      lastCheckIn: today,
      lifetimeSpent,
      isFounder,
    });
    setLoading(false);
  }

  function handleSpin(result: { label: string; value: number | string }) {
    const cost = 12;
    let nextTokens = tokens - cost;
    let nextSpent = lifetimeSpent + cost;

    if (typeof result.value === 'number' && result.value > 0) {
      nextTokens += result.value;
      setMessage(`You won ${result.label}!`);
    } else if (result.value === 'ship') {
      setMessage('Free shipping unlocked on your next order!');
    } else if (result.value === 'mystery') {
      nextTokens += 7;
      setMessage('Mystery prize: +7 tokens!');
    } else {
      setMessage('Try again next spin');
    }

    setTokens(nextTokens);
    setLifetimeSpent(nextSpent);
    save({
      tokens: nextTokens,
      streak,
      lastCheckIn,
      lifetimeSpent: nextSpent,
      isFounder,
    });
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-neutral-900">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-pink-400 text-sm font-medium mb-2 tracking-wide">✦ REWARDS</p>
          <h1 className="text-4xl font-bold tracking-tight">
            Play. Earn. <span className="text-pink-400">Unlock.</span>
          </h1>
          <p className="text-neutral-500 mt-2 max-w-lg">
            Check in daily, spin the wheel, and unlock Founders & Nova drops.
            Made for the people who keep coming back.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {message && (
          <div className="mb-6 text-center py-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column — status */}
          <div className="lg:col-span-2 space-y-5">
            <TokenBalance tokens={tokens} isFounder={isFounder} />
            <DailyCheckIn
              streak={streak}
              lastCheckIn={lastCheckIn}
              onCheckIn={handleCheckIn}
              earned={checkInEarned}
              alreadyClaimed={alreadyClaimed}
              loading={loading}
            />
            <ProgressBar current={lifetimeSpent} target={100} />
            <Link
              href="/shop"
              className="block text-center py-3 rounded-xl border border-neutral-800 text-sm text-neutral-400 hover:border-pink-500/40 hover:text-pink-300 transition"
            >
              Spend tokens in the shop →
            </Link>
          </div>

          {/* Right column — Wheel */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-8 flex flex-col items-center">
              <h2 className="text-xl font-bold mb-1">Spin the Wheel</h2>
              <p className="text-neutral-500 text-sm mb-8">
                12 tokens per spin · Win more tokens & perks
              </p>
              <SpinWheel tokens={tokens} onSpin={handleSpin} />
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-center">
          {[
            { t: 'Check in daily', d: 'Build a streak for bigger bonuses' },
            { t: 'Spin for rewards', d: 'Tokens, free shipping, mystery prizes' },
            { t: 'Unlock exclusives', d: 'Founders & Nova drops for regulars' },
          ].map((item) => (
            <div key={item.t} className="p-5 rounded-2xl border border-neutral-900">
              <div className="font-medium text-white mb-1">{item.t}</div>
              <div className="text-sm text-neutral-500">{item.d}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
