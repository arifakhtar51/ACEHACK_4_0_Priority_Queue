import React from 'react';

export function Loading() {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg text-purple-300 animate-pulse">Loading amazing NFTs...</p>
    </div>
  );
} 