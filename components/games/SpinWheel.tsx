'use client';

import { useState, useRef } from 'react';

const SEGMENTS = [
  { label: '+5 Tokens', value: 5, color: '#ec4899' },
  { label: '+10 Tokens', value: 10, color: '#facc15' },
  { label: 'Free Ship', value: 'ship', color: '#a855f7' },
  { label: '+3 Tokens', value: 3, color: '#ec4899' },
  { label: '+15 Tokens', value: 15, color: '#facc15' },
  { label: 'Mystery', value: 'mystery', color: '#22d3ee' },
  { label: '+8 Tokens', value: 8, color: '#ec4899' },
  { label: 'Try Again', value: 0, color: '#525252' },
];

const SPIN_COST = 12;

interface SpinWheelProps {
  tokens: number;
  onSpin: (result: { label: string; value: number | string }) => void;
  disabled?: boolean;
}

export default function SpinWheel({ tokens, onSpin, disabled }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const canSpin = tokens >= SPIN_COST && !spinning && !disabled;

  function spin() {
    if (!canSpin) return;

    setSpinning(true);
    setResult(null);

    // Random segment
    const index = Math.floor(Math.random() * SEGMENTS.length);
    const segmentAngle = 360 / SEGMENTS.length;
    // Land in the middle of the chosen segment + extra spins
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const target = extraSpins * 360 + (360 - index * segmentAngle - segmentAngle / 2);

    setRotation((prev) => prev + target);

    setTimeout(() => {
      const won = SEGMENTS[index];
      setResult(won.label);
      setSpinning(false);
      onSpin(won);
    }, 4500);
  }

  return (
    <div className="flex flex-col items-center">
      {/* Pointer */}
      <div className="relative z-20 mb-[-12px]">
        <div className="w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
      </div>

      {/* Wheel */}
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 opacity-60 blur-md animate-pulse" />
        
        <div
          ref={wheelRef}
          className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-yellow-400/80 shadow-[0_0_40px_rgba(236,72,153,0.4)]"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.7, 0.2, 1)' : 'none',
          }}
        >
          {SEGMENTS.map((seg, i) => {
            const angle = (360 / SEGMENTS.length) * i;
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 origin-bottom-right"
                style={{
                  transform: `rotate(${angle}deg)`,
                  background: seg.color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                  left: '0',
                  top: '0',
                  width: '50%',
                  height: '50%',
                }}
              >
                <span
                  className="absolute text-[10px] sm:text-xs font-bold text-black whitespace-nowrap"
                  style={{
                    transform: `rotate(${180 / SEGMENTS.length}deg) translateY(28px)`,
                    left: '30%',
                    top: '15%',
                  }}
                >
                  {seg.label}
                </span>
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-black border-2 border-yellow-400 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.5)]">
            <span className="text-yellow-400 font-bold text-xs">SPIN</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 text-center">
        <button
          onClick={spin}
          disabled={!canSpin}
          className={`
            px-10 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all
            ${canSpin
              ? 'bg-gradient-to-r from-pink-500 to-yellow-400 text-black shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95'
              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
            }
          `}
        >
          {spinning ? 'Spinning…' : `Spin · ${SPIN_COST} tokens`}
        </button>

        {result && !spinning && (
          <div className="mt-4 text-lg font-bold text-yellow-300 animate-bounce">
            {result === 'Try Again' ? 'Better luck next time' : `You won: ${result}!`}
          </div>
        )}

        <p className="mt-3 text-xs text-neutral-500">
          You have <span className="text-yellow-300 font-medium">{tokens}</span> tokens
        </p>
      </div>
    </div>
  );
}
