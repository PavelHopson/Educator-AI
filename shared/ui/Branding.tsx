import React from 'react';

export const Logo: React.FC<{ className?: string, size?: number }> = ({ className = "", size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa" />
        <stop offset="1" stopColor="#6d28d9" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
        <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M50 10 C27.9 10 10 27.9 10 50 C10 72.1 27.9 90 50 90 C60.2 90 69.5 86.1 76.6 79.8 L85 88.2 C86.9 90.1 90 90.1 91.9 88.2 C93.8 86.3 93.8 83.2 91.9 81.3 L83.5 72.9 C88.2 66.4 90 58.5 90 50 C90 27.9 72.1 10 50 10 Z M50 22 C65.5 22 78 34.5 78 50 C78 65.5 65.5 78 50 78 C34.5 78 22 65.5 22 50 C22 34.5 34.5 22 50 22 Z" 
      fill="url(#logoGradient)" 
      filter="url(#glow)"
    />
    <path 
      d="M50 35 L50 65 M35 50 L65 50" 
      stroke="white" 
      strokeWidth="6" 
      strokeLinecap="round" 
      opacity="0.8"
    />
  </svg>
);

export const IllustrationHero: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="screenGrad" x1="0" y1="0" x2="400" y2="300">
        <stop stopColor="#4c1d95" stopOpacity="0.5" />
        <stop offset="1" stopColor="#6d28d9" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    
    {/* Abstract Documents floating */}
    <g className="animate-float" style={{ animationDelay: '0s' }}>
      <rect x="50" y="80" width="120" height="160" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <rect x="70" y="100" width="80" height="8" rx="4" fill="#64748b" />
      <rect x="70" y="120" width="60" height="8" rx="4" fill="#475569" />
      <rect x="70" y="140" width="80" height="8" rx="4" fill="#475569" />
      <rect x="70" y="160" width="70" height="8" rx="4" fill="#475569" />
    </g>

    {/* Arrow */}
    <path d="M190 160 L230 160" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" className="animate-pulse" />
    <path d="M225 155 L230 160 L225 165" stroke="#a78bfa" strokeWidth="2" />

    {/* Game UI */}
    <g className="animate-float" style={{ animationDelay: '1.5s' }}>
      <rect x="250" y="60" width="140" height="200" rx="12" fill="url(#screenGrad)" stroke="#8b5cf6" strokeWidth="2" />
      {/* Glow behind */}
      <circle cx="320" cy="160" r="60" fill="#8b5cf6" fillOpacity="0.2" filter="blur(20px)" />
      
      {/* Game elements */}
      <rect x="270" y="90" width="100" height="60" rx="4" fill="#5b21b6" />
      <rect x="270" y="170" width="100" height="24" rx="4" fill="#7c3aed" />
      <rect x="270" y="205" width="100" height="24" rx="4" fill="#6d28d9" />
    </g>
  </svg>
);

export const IllustrationFeatures: React.FC<{ type: 'speed' | 'game' | 'export' }> = ({ type }) => {
  if (type === 'speed') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-quest-400">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
        <path d="M50 20 V50 L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="animate-spin" style={{ transformOrigin: '50px 50px', animationDuration: '3s' }}/>
      </svg>
    );
  }
  if (type === 'game') {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full text-quest-400">
        <rect x="20" y="30" width="60" height="40" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M30 50 L40 50 M80 50 L90 50" stroke="currentColor" strokeWidth="2"/>
        <circle cx="35" cy="50" r="2" fill="currentColor"/>
        <circle cx="65" cy="50" r="2" fill="currentColor"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full text-quest-400">
      <path d="M30 50 L50 70 L90 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};