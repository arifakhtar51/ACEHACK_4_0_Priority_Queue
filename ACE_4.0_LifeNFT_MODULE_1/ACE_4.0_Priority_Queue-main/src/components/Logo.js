import React from 'react';

export function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L28 8V24L16 30L4 24V8L16 2Z" stroke="url(#paint0_linear)" strokeWidth="2" />
      <path d="M16 16L16 8" stroke="url(#paint1_linear)" strokeWidth="2" />
      <path d="M22 12L10 20" stroke="url(#paint2_linear)" strokeWidth="2" />
      <defs>
        <linearGradient id="paint0_linear" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="16.5" y1="8" x2="16.5" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="paint2_linear" x1="10" y1="12" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
} 