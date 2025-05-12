'use client';

import React from 'react';

export default function Logo({ size = 40, className = '' }: { size?: number; className?: string }) {
  // Create an SVG that looks like the logo you provided
  return (
    <div className={`relative rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="#081136" />
        <path
          d="M150 100C150 127.614 127.614 150 100 150C72.3858 150 50 127.614 50 100C50 72.3858 72.3858 50 100 50C127.614 50 150 72.3858 150 100Z"
          stroke="#30C6FF"
          strokeWidth="20"
        />
        <path
          d="M130 100C130 116.569 116.569 130 100 130C83.4315 130 70 116.569 70 100C70 83.4315 83.4315 70 100 70"
          stroke="#30C6FF"
          strokeWidth="20"
        />
        <circle cx="50" cy="100" r="10" fill="#30C6FF" />
      </svg>
      <div className="absolute inset-0 bg-blue-500/20 animate-pulse-slow"></div>
    </div>
  );
} 