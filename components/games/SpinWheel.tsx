"use client";

import { useState } from "react";
import { SPIN_COST } from "@/lib/rewards/constants";
import TokenIcon from "@/components/rewards/TokenIcon";

const SEGMENTS = [
  { label: "+5", value: 5, color: "#ec4899" },
  { label: "+10", value: 10, color: "#facc15" },
  { label: "Ship", value: "ship", color: "#a855f7" },
  { label: "+3", value: 3, color: "#f472b6" },
  { label: "+15", value: 15, color: "#eab308" },
  { label: "Mystery", value: "mystery", color: "#22d3ee" },
  { label: "+8", value: 8, color: "#db2777" },
  { label: "Again", value: 0, color: "#404040" },
];

const N = SEGMENTS.length;
const SLICE = 360 / N;

interface SpinWheelProps {
  tokens: number;
  onSpin: (result: { label: string; value: number | string }) => void;
  disabled?: boolean;
}

export default function SpinWheel({ tokens, onSpin, disabled }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canSpin = tokens >= SPIN_COST && !spinning && !disabled;

  const conic = SEGMENTS.map((seg, i) => {
    const start = i * SLICE;
    const end = (i + 1) * SLICE;
    return `${seg.color} ${start}deg ${end}deg`;
  }).join(", ");

  function spin() {
    if (!canSpin) return;

    setSpinning(true);
    setResult(null);

    const index = Math.floor(Math.random() * N);
    // Pointer is at top (0deg). Segments drawn clockwise from 0.
    // Center of segment i is at index * SLICE + SLICE/2 from start.
    // We rotate wheel so that center lands under top pointer.
    const segmentCenter = index * SLICE + SLICE / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const target = extraSpins * 360 + (360 - segmentCenter);

    setRotation((prev) => prev + target);

    window.setTimeout(() => {
      const won = SEGMENTS[index];
      setResult(won.label);
      setSpinning(false);
      onSpin({ label: won.label, value: won.value });
    }, 4500);
  }

  return (
    <div className="flex flex-col items-center">
      {/* Pointer */}
      <div className="relative z-20 mb-[-10px]">
        <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.85)]" />
      </div>

      <div className="relative">
        {/* Soft outer glow — premium, not childish */}
        <div className="absolute inset-[-10px] rounded-full bg-gradient-to-br from-pink-500/30 via-yellow-400/20 to-pink-500/30 blur-xl" />

        <div
          className="relative h-64 w-64 overflow-hidden rounded-full border-[6px] border-neutral-800 shadow-[0_0_50px_rgba(236,72,153,0.25)] sm:h-72 sm:w-72"
          style={{
            background: `conic-gradient(from -${SLICE / 2}deg, ${conic})`,
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4.5s cubic-bezier(0.12, 0.75, 0.15, 1)"
              : "none",
          }}
        >
          {/* Segment labels */}
          {SEGMENTS.map((seg, i) => {
            const angle = i * SLICE + SLICE / 2;
            return (
              <div
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 origin-center"
                style={{
                  transform: `rotate(${angle}deg) translateY(-105px)`,
                }}
              >
                <span
                  className="block -translate-x-1/2 text-[11px] font-bold text-black/90 sm:text-xs"
                  style={{ transform: "translateX(-50%)" }}
                >
                  {seg.label}
                </span>
              </div>
            );
          })}

          {/* Soft inner vignette */}
          <div className="pointer-events-none absolute inset-3 rounded-full border border-white/5 bg-gradient-to-b from-white/5 to-transparent" />
        </div>

        {/* Center hub */}
        <div className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-yellow-400/80 bg-black shadow-[0_0_24px_rgba(250,204,21,0.45)]">
          <span className="text-xs font-bold tracking-wide text-yellow-400">SPIN</span>
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
          {spinning ? "Spinning…" : (
            <span className="inline-flex items-center gap-2">
              Spin · {SPIN_COST} <TokenIcon size={16} />
            </span>
          )}
        </button>

        {result && !spinning && (
          <div className="mt-4 text-lg font-bold text-yellow-300">
            {result === "Again" ? "Better luck next time" : `Result: ${result}`}
          </div>
        )}

        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
          Balance <TokenIcon size={14} />{" "}
          <span className="font-medium text-yellow-300">{tokens}</span>
          {tokens < SPIN_COST && !spinning && (
            <span className="text-neutral-600"> · need {SPIN_COST} to spin</span>
          )}
        </p>
      </div>
    </div>
  );
}
