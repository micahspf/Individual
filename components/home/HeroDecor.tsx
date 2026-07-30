/** Subtle maker-tech accents on medium-dark grey glass UI */
export default function HeroDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-pink-500/12 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />

      <svg
        className="absolute right-4 top-16 h-40 w-40 opacity-[0.2] sm:right-16 sm:h-52 sm:w-52"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M100 100 C100 70 130 40 160 40" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M100 100 C100 55 145 20 180 20" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M100 100 C100 40 155 5 190 5" stroke="#ec4899" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
        <circle cx="100" cy="100" r="3" fill="#ec4899" opacity="0.6" />
      </svg>

      <svg className="absolute left-0 top-1/3 h-24 w-48 opacity-[0.16] sm:w-64" viewBox="0 0 260 80" fill="none">
        <line x1="0" y1="40" x2="220" y2="40" stroke="#facc15" strokeWidth="1" />
        <line x1="0" y1="40" x2="200" y2="40" stroke="#ec4899" strokeWidth="2" opacity="0.5" />
        <circle cx="230" cy="40" r="4" fill="#ec4899" opacity="0.7" />
        <circle cx="230" cy="40" r="8" stroke="#facc15" strokeWidth="1" opacity="0.4" />
      </svg>

      <svg className="absolute bottom-8 left-1/4 h-20 w-64 opacity-[0.14] sm:left-1/3" viewBox="0 0 280 60" fill="none">
        <path d="M0 30 C40 10, 80 50, 120 30 S200 10, 280 30" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M0 40 C50 20, 90 55, 140 35 S220 15, 280 40" stroke="#facc15" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}
