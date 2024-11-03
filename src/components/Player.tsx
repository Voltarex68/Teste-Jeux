import React from 'react';

interface PlayerProps {
  x: number;
  y: number;
  isJumping: boolean;
  direction: 'left' | 'right';
}

export default function Player({ x, y, isJumping, direction }: PlayerProps) {
  return (
    <div
      className={`absolute transition-transform ${
        isJumping ? 'animate-jump' : 'animate-idle'
      }`}
      style={{
        transform: `translate(${x}px, ${y}px) scaleX(${direction === 'left' ? -1 : 1})`,
      }}
    >
      <div className="relative w-12 h-16">
        {/* Tête */}
        <div className="absolute w-6 h-6 bg-amber-200 rounded-full left-3 top-0"></div>
        
        {/* Corps */}
        <div className="absolute w-8 h-8 bg-blue-500 rounded-md left-2 top-5"></div>
        
        {/* Bras */}
        <div className={`absolute w-3 h-6 bg-amber-200 rounded-full left-0 top-5 origin-top ${isJumping ? 'rotate-[-30deg]' : 'animate-swing'}`}></div>
        <div className={`absolute w-3 h-6 bg-amber-200 rounded-full right-0 top-5 origin-top ${isJumping ? 'rotate-[30deg]' : 'animate-swing-reverse'}`}></div>
        
        {/* Jambes */}
        <div className={`absolute w-3 h-6 bg-gray-700 rounded-full left-2 bottom-0 origin-top ${isJumping ? 'rotate-[-15deg]' : 'animate-run'}`}></div>
        <div className={`absolute w-3 h-6 bg-gray-700 rounded-full right-2 bottom-0 origin-top ${isJumping ? 'rotate-[15deg]' : 'animate-run-reverse'}`}></div>
      </div>
    </div>
  );
}