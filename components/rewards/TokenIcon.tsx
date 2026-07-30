/** Official Individual Token — black-hole mark */
export default function TokenIcon({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
        <defs>
          <radialGradient id="bhGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="45%" stopColor="#0a0a0a" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#facc15" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.15" />
          </radialGradient>
          <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Outer soft glow */}
        <circle cx="32" cy="32" r="30" fill="url(#bhGlow)" opacity="0.9" />
        {/* Accretion ring */}
        <circle
          cx="32"
          cy="32"
          r="22"
          stroke="url(#ring)"
          strokeWidth="3.5"
          opacity="0.95"
        />
        <circle
          cx="32"
          cy="32"
          r="18"
          stroke="#facc15"
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Event horizon */}
        <circle cx="32" cy="32" r="12" fill="#000000" />
        <circle cx="32" cy="32" r="12" stroke="#1a1a1a" strokeWidth="2" />
        {/* Photon highlight */}
        <ellipse
          cx="26"
          cy="26"
          rx="3"
          ry="2"
          fill="#f9a8d4"
          opacity="0.35"
          transform="rotate(-30 26 26)"
        />
      </svg>
    </span>
  );
}
