"use client";

import { useState } from "react";
import { SPIN_COST, SPIN_SEGMENTS } from "@/lib/rewards/constants";
import TokenIcon from "@/components/rewards/TokenIcon";

const N = SPIN_SEGMENTS.length;
const SLICE = 360 / N;

interface SpinWheelProps {
  tokens: number;
  onSpin: (result: { label: string; value: number | string }) => void;
  disabled?: boolean;
}

/**
 * Vegas-style wheel with conic segments.
 * Labels sit at mid-radius of each wedge, rotated so text is upright-ish and centered.
 */
export default function SpinWheel({ tokens, onSpin, disabled }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canSpin = tokens >= SPIN_COST && !spinning && !disabled;

  // Start gradient so segment 0 is centered under the top pointer when rotation = 0
  const conic = SPIN_SEGMENTS.map((seg, i) => {
    const start = i * SLICE;
    const end = (i + 1) * SLICE;
    return `${seg.color} ${start}deg ${end}deg`;
  }).join(", ");

  function spin() {
    if (!canSpin) return;
    setSpinning(true);
    setResult(null);

    const index = Math.floor(Math.random() * N);
    // With conic-gradient from 0deg, segment i spans [i*SLICE, (i+1)*SLICE).
    // Center of segment i at i*SLICE + SLICE/2 from top when wheel rotation is 0
    // if we offset gradient with from -SLICE/2... Actually from 0:
    // top pointer is at 0deg (12 o'clock). After rotating wheel by R deg clockwise,
    // the point at angle A on the wheel moves to A+R.
    // We want segment center C to land at 0: R = -C (mod 360) = 360 - C.
    const segmentCenter = index * SLICE + SLICE / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const delta = extraSpins * 360 + (360 - segmentCenter);

    setRotation((prev) => prev + delta);

    window.setTimeout(() => {
      const won = SPIN_SEGMENTS[index];
      setResult(won.label);
      setSpinning(false);
      onSpin({ label: won.label, value: won.value });
    }, 4500);
  }

  // Radius for label placement (px) — mid between hub and rim
  const labelRadius = 88; // tuned for 288px wheel (72*4)

  return (
    <div className="flex flex-col items-center">
      {/* Pointer at top */}
      <div className="relative z-20 mb-[-8px]">
        <div className="h-0 w-0 border-l-[11px] border-r-[11px] border-t-[18px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.85)]" />
      </div>

      <div className="relative">
        <div className="absolute inset-[-12px] rounded-full bg-gradient-to-br from-pink-500/25 via-yellow-400/15 to-pink-500/25 blur-xl" />

        <div
          className="relative h-64 w-64 rounded-full border-[6px] border-white/15 shadow-[0_0_48px_rgba(236,72,153,0.28)] sm:h-72 sm:w-72"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4.5s cubic-bezier(0.12, 0.78, 0.12, 1)"
              : "none",
          }}
        >
          {/* Segments */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, ${conic})`,
            }}
          />

          {/* Soft rim highlight */}
          <div className="pointer-events-none absolute inset-[3px] rounded-full border border-white/10" />

          {/* Labels — each at segment center, counter-rotated so text is horizontal relative to screen when wheel is at rest... 
              Actually for a spinning wheel labels should rotate WITH the wheel and be readable along the radius.
              Best approach: place text at mid-angle, rotate text so it reads outward (or upright along radius).
              User asked: centered inside each segment, readable, not clipped.
              Use: rotate to segment center, translate outward, rotate text +90 or so for radial readability.
              For horizontal text in segment: rotate(angle) translate(0, -r) rotate(-angle) so text stays upright on screen when wheel turns... that means text is always upright which is best for readability.
          */}
          {SPIN_SEGMENTS.map((seg, i) => {
            const mid = i * SLICE + SLICE / 2;
            // Upright labels that stay readable as wheel spins
            return (
              <div
                key={seg.label}
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{
                  width: 0,
                  height: 0,
                  transform: `rotate(${mid}deg) translateY(-${labelRadius}px)`,
                }}
              >
                <span
                  className="absolute left-1/2 top-1/2 block w-[72px] -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-bold leading-tight sm:w-[80px] sm:text-[11px]"
                  style={{
                    color: seg.text,
                    transform: `rotate(${-mid}deg)`,
                    textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                  }}
                >
                  {seg.label}
                </span>
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute inset-0 m-auto flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border-2 border-yellow-400/90 bg-[#1c1c21] shadow-[0_0_24px_rgba(250,204,21,0.5)]">
            <span className="text-xs font-bold tracking-wide text-yellow-400">SPIN</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={spin}
          disabled={!canSpin}
          className={`rounded-full px-10 py-3.5 text-sm font-bold tracking-wide transition-all ${
            canSpin
              ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-black shadow-[0_0_28px_rgba(236,72,153,0.45)] hover:scale-[1.03] active:scale-95"
              : "cursor-not-allowed bg-neutral-800 text-neutral-500"
          }`}
        >
          {spinning ? (
            "Spinning…"
          ) : (
            <span className="inline-flex items-center gap-2">
              Spin · {SPIN_COST} <TokenIcon size={16} />
            </span>
          )}
        </button>

        {result && !spinning && (
          <div className="mt-4 text-lg font-bold text-yellow-300">Result: {result}</div>
        )}

        <p className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-neutral-500">
          Balance <TokenIcon size={14} />{" "}
          <span className="font-medium text-yellow-300">{tokens}</span>
          {tokens < SPIN_COST && !spinning && (
            <span className="text-neutral-600"> · need {SPIN_COST} to spin</span>
          )}
        </p>
        <p className="mt-2 text-[11px] text-neutral-600">Each spin costs exactly {SPIN_COST} tokens</p>
      </div>
    </div>
  );
}
