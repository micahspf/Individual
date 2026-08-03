/** Ambient brand accents matching the Individual wordmark (roots + stars) */
export default function HeroDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#ff2d8a]/15 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-[#ff8c42]/10 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#ffe14a]/10 blur-3xl" />

      {/* Root-like curves — logo language */}
      <svg
        className="absolute bottom-0 left-0 h-40 w-full opacity-[0.18] sm:h-52"
        viewBox="0 0 1200 200"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 160 C120 120, 180 180, 280 140 S420 100, 520 130 S680 170, 800 120 S1000 80, 1200 110"
          stroke="url(#brandStroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M0 180 C150 150, 220 190, 340 160 S500 120, 640 150 S820 190, 980 140 S1100 100, 1200 130"
          stroke="url(#brandStroke)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="brandStroke" x1="0" y1="0" x2="1200" y2="0">
            <stop stopColor="#ff2d8a" />
            <stop offset="0.5" stopColor="#ff8c42" />
            <stop offset="1" stopColor="#ffe14a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stars */}
      <svg
        className="absolute right-6 top-12 h-36 w-36 opacity-40 sm:right-20 sm:h-48 sm:w-48"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="40" cy="50" r="1.5" fill="white" opacity="0.7" />
        <circle cx="90" cy="30" r="1" fill="white" opacity="0.5" />
        <circle cx="140" cy="55" r="1.2" fill="white" opacity="0.6" />
        <circle cx="70" cy="90" r="1" fill="#ffe14a" opacity="0.5" />
        <path d="M120 20 L122 26 L128 28 L122 30 L120 36 L118 30 L112 28 L118 26 Z" fill="white" opacity="0.55" />
        <path d="M50 70 L51.5 74 L55.5 75.5 L51.5 77 L50 81 L48.5 77 L44.5 75.5 L48.5 74 Z" fill="#ff2d8a" opacity="0.45" />
        <path d="M160 80 L161.2 83 L164.2 84.2 L161.2 85.4 L160 88.4 L158.8 85.4 L155.8 84.2 L158.8 83 Z" fill="#ffe14a" opacity="0.5" />
      </svg>
    </div>
  );
}
