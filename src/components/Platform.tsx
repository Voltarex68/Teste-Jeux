import React from 'react';

interface PlatformProps {
  x: number;
  y: number;
  width: number;
}

export default function Platform({ x, y, width }: PlatformProps) {
  return (
    <div 
      className="absolute" 
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <div
        className="h-5 rounded-md shadow-lg"
        style={{
          width: `${width}px`,
          background: 'linear-gradient(to bottom, #34d399 0%, #059669 100%)',
          boxShadow: '0 2px 0 rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.2)',
        }}
      >
        <div className="h-2 bg-emerald-300/30 rounded-t-md"></div>
      </div>
    </div>
  );
}