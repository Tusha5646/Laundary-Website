import React from 'react';

export const BrandLogo = ({ size = 'default', showTagline = false, className = '' }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Laundry Swirl & Bubble Icon */}
      <div
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 shadow-md shadow-orange-500/25 ${
          isLarge ? 'w-14 h-14' : isSmall ? 'w-8 h-8 rounded-xl' : 'w-10 h-10'
        }`}
      >
        {/* Outer subtle ring */}
        <div className="absolute inset-0.5 rounded-xl border border-white/30" />
        
        {/* Washing swirl SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white ${isLarge ? 'w-7 h-7' : isSmall ? 'w-4 h-4' : 'w-5 h-5'}`}
        >
          {/* Washing Machine drum / spiral wave */}
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" opacity="0.35" />
          <path d="M12 6a6 6 0 1 0 6 6" />
          <path d="M12 9a3 3 0 1 0 3 3" />
        </svg>

        {/* Floating sparkling soap bubbles */}
        <span
          className={`absolute -top-1 -right-1 rounded-full bg-teal-400 border-2 border-white shadow-sm ${
            isLarge ? 'w-4 h-4' : 'w-2.5 h-2.5'
          }`}
        />
        <span
          className={`absolute -bottom-0.5 -left-0.5 rounded-full bg-amber-300 border-1.5 border-white ${
            isLarge ? 'w-3 h-3' : 'w-2 h-2'
          }`}
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span
            className={`font-black tracking-tight text-slate-900 font-heading ${
              isLarge ? 'text-3xl' : isSmall ? 'text-lg' : 'text-xl'
            }`}
          >
            Fresh<span className="text-orange-500">Fold</span>
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 mb-2" />
        </div>
        {showTagline && (
          <span className="text-[11px] font-semibold text-slate-500 tracking-wide uppercase">
            Fresh Clothes. Easy Life.
          </span>
        )}
      </div>
    </div>
  );
};
