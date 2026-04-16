import React from 'react';

export const Logo: React.FC<{ className?: string, size?: number }> = ({ className = "", size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logoGrad1" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6BA3FF" />
        <stop offset="1" stopColor="#4A7FD4" />
      </linearGradient>
      <linearGradient id="logoGrad2" x1="50" y1="10" x2="50" y2="70" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5A623" />
        <stop offset="1" stopColor="#D4892A" />
      </linearGradient>
      <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="warmGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Wand / Key shaft */}
    <rect x="44" y="20" width="12" height="50" rx="6" fill="url(#logoGrad1)" filter="url(#logoGlow)" />

    {/* Key bit (bottom teeth) */}
    <rect x="36" y="62" width="10" height="14" rx="2" fill="url(#logoGrad1)" filter="url(#logoGlow)" />
    <rect x="54" y="62" width="10" height="14" rx="2" fill="url(#logoGrad1)" filter="url(#logoGlow)" />

    {/* Rune circle at top (key bow) */}
    <circle cx="50" cy="20" r="14" stroke="url(#logoGrad2)" strokeWidth="3" fill="none" filter="url(#warmGlow)" className="animate-rune-glow" />

    {/* Inner spark */}
    <circle cx="50" cy="20" r="5" fill="#F5A623" opacity="0.8" className="animate-rune-glow" />

    {/* Decorative rune marks on shaft */}
    <line x1="48" y1="38" x2="52" y2="38" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <line x1="48" y1="46" x2="52" y2="46" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <line x1="48" y1="54" x2="52" y2="54" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

    {/* Corner brackets (brand element) */}
    <path d="M18 18 L18 28 M18 18 L28 18" stroke="#6BA3FF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <path d="M82 82 L82 72 M82 82 L72 82" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const IllustrationHero: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="400" y2="300">
        <stop stopColor="#0C1117" stopOpacity="0.9" />
        <stop offset="1" stopColor="#1C2536" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#6BA3FF" />
        <stop offset="1" stopColor="#F5A623" />
      </linearGradient>
      <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {/* Grid lines in background */}
    <g opacity="0.06">
      {[0,40,80,120,160,200,240,280,320,360,400].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#6BA3FF" strokeWidth="0.5" />
      ))}
      {[0,40,80,120,160,200,240,280].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#6BA3FF" strokeWidth="0.5" />
      ))}
    </g>

    {/* Floating scroll / document */}
    <g className="animate-float" style={{ animationDelay: '0s' }}>
      <rect x="40" y="70" width="120" height="170" rx="4" fill="#0C1117" stroke="#1C2536" strokeWidth="1.5" />
      {/* Corner brackets on document */}
      <path d="M44 74 L44 84 M44 74 L54 74" stroke="#6BA3FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M156 236 L156 226 M156 236 L146 236" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Text lines */}
      <rect x="58" y="96" width="84" height="6" rx="3" fill="#1C2536" />
      <rect x="58" y="112" width="64" height="6" rx="3" fill="#1C2536" opacity="0.7" />
      <rect x="58" y="128" width="76" height="6" rx="3" fill="#1C2536" opacity="0.7" />
      <rect x="58" y="144" width="50" height="6" rx="3" fill="#1C2536" opacity="0.5" />
      <rect x="58" y="168" width="84" height="6" rx="3" fill="#1C2536" opacity="0.4" />
      <rect x="58" y="184" width="70" height="6" rx="3" fill="#1C2536" opacity="0.4" />
    </g>

    {/* Transformation arrow with rune energy */}
    <g>
      <line x1="180" y1="155" x2="230" y2="155" stroke="#6BA3FF" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
      <polygon points="228,150 238,155 228,160" fill="#6BA3FF" opacity="0.8" />
      {/* Energy particles */}
      <circle cx="198" cy="148" r="2" fill="#F5A623" opacity="0.6" className="animate-pulse" />
      <circle cx="210" cy="162" r="1.5" fill="#6BA3FF" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
      <circle cx="220" cy="150" r="1" fill="#F5A623" opacity="0.4" className="animate-pulse" style={{ animationDelay: '1s' }} />
    </g>

    {/* Game UI panel */}
    <g className="animate-float" style={{ animationDelay: '1.5s' }}>
      <rect x="250" y="50" width="140" height="210" rx="8" fill="#0C1117" stroke="#6BA3FF" strokeWidth="1" opacity="0.9" />
      {/* Corner brackets */}
      <path d="M254 54 L254 66 M254 54 L266 54" stroke="#6BA3FF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M386 256 L386 244 M386 256 L374 256" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

      {/* Glow behind game */}
      <circle cx="320" cy="155" r="50" fill="#6BA3FF" fillOpacity="0.08" />

      {/* Question area */}
      <rect x="266" y="76" width="108" height="54" rx="6" fill="#1C2536" stroke="rgba(107,163,255,0.15)" strokeWidth="1" />
      <rect x="278" y="90" width="60" height="4" rx="2" fill="#6BA3FF" opacity="0.3" />
      <rect x="278" y="100" width="80" height="4" rx="2" fill="#6BA3FF" opacity="0.2" />

      {/* Answer buttons */}
      <rect x="266" y="148" width="108" height="28" rx="6" fill="#4A7FD4" opacity="0.3" stroke="#6BA3FF" strokeWidth="0.5" />
      <rect x="278" y="158" width="50" height="4" rx="2" fill="white" opacity="0.4" />

      <rect x="266" y="186" width="108" height="28" rx="6" fill="#1C2536" stroke="rgba(107,163,255,0.1)" strokeWidth="0.5" />
      <rect x="278" y="196" width="60" height="4" rx="2" fill="white" opacity="0.2" />

      {/* Score indicator */}
      <circle cx="320" cy="236" r="8" stroke="#F5A623" strokeWidth="1.5" fill="none" opacity="0.5" />
      <text x="320" y="240" textAnchor="middle" fill="#F5A623" fontSize="10" opacity="0.7">3</text>
    </g>
  </svg>
);

export const IllustrationFeatures: React.FC<{ type: 'speed' | 'game' | 'export' }> = ({ type }) => {
  if (type === 'speed') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="36" stroke="#6BA3FF" strokeWidth="1.5" fill="none" opacity="0.15"/>
        <circle cx="50" cy="50" r="36" stroke="#6BA3FF" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="8 16" className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '8s' }}/>
        <path d="M50 24 V50 L66 62" stroke="#6BA3FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="3" fill="#F5A623" />
      </svg>
    );
  }
  if (type === 'game') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Key shape */}
        <rect x="44" y="25" width="12" height="35" rx="6" fill="#6BA3FF" opacity="0.8" />
        <circle cx="50" cy="22" r="12" stroke="#6BA3FF" strokeWidth="2.5" fill="none" />
        <circle cx="50" cy="22" r="4" fill="#F5A623" opacity="0.7" />
        <rect x="38" y="58" width="8" height="10" rx="2" fill="#6BA3FF" opacity="0.6" />
        <rect x="54" y="58" width="8" height="10" rx="2" fill="#6BA3FF" opacity="0.6" />
        {/* Rune marks */}
        <line x1="48" y1="38" x2="52" y2="38" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="48" y1="44" x2="52" y2="44" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Export / scroll unfurling */}
      <rect x="30" y="20" width="40" height="60" rx="4" fill="none" stroke="#6BA3FF" strokeWidth="2" opacity="0.6" />
      <path d="M38 36 L58 36 M38 44 L54 44 M38 52 L50 52" stroke="#6BA3FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M62 40 L78 40 L78 75 L42 75 L42 68" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
      <path d="M70 55 L75 60 L82 48" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};
