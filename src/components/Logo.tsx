export function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill="url(#logo-gradient)" stroke="#f59030" strokeWidth="2"/>
      <text x="60" y="38" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif" letterSpacing="0.5">LEARN WITH</text>
      <text x="60" y="72" textAnchor="middle" fill="white" fontSize="28" fontWeight="800" fontFamily="Georgia, serif" fontStyle="italic" letterSpacing="0.5">Skriuwer</text>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f07010"/>
          <stop offset="1" stopColor="#e8640a"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
