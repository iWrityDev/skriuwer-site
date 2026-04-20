export function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="44" rx="11" fill="url(#logo-gradient)" />
      {/* Open book, left page */}
      <path
        d="M21 12c-1.5-1-3.5-1.5-6-1.5H7a1 1 0 00-1 1v19a1 1 0 001 1h8c2.5 0 4.5.5 6 1.5V12z"
        fill="white"
      />
      {/* Open book, right page */}
      <path
        d="M23 12c1.5-1 3.5-1.5 6-1.5h7a1 1 0 011 1v19a1 1 0 01-1 1h-8c-2.5 0-4.5.5-6 1.5V12z"
        fill="white"
        opacity="0.75"
      />
      {/* Spine */}
      <rect x="21" y="10" width="2" height="24" rx="1" fill="rgba(200,70,0,0.8)" />
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f07010" />
          <stop offset="1" stopColor="#d85800" />
        </linearGradient>
      </defs>
    </svg>
  );
}
