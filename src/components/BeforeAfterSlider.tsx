/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Sliders } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  description: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  description
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div id="before-after-slider-widget" className="bg-[#121319] border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-teal-500/30">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-4 h-4 text-teal-400" />
          <h4 className="font-display font-semibold text-lg text-white">{title}</h4>
        </div>
        <p className="text-sm text-zinc-400">{description}</p>
      </div>

      <div
        ref={containerRef}
        className="relative h-80 rounded-xl overflow-hidden select-none cursor-ew-resize border border-zinc-800"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Full background) */}
        <img
          src={afterImage}
          alt="Retouched Color Grade"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-[#0d0e12]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-teal-400 border border-teal-500/20 z-10">
          Graded (After)
        </div>

        {/* Before Image (Cropped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none border-r border-teal-400/80"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original Raw Footage"
            className="absolute inset-0 h-full object-cover pointer-events-none brightness-90 saturate-[0.4] contrast-[0.7] blur-[0.3px]"
            style={{ width: containerRef.current?.getBoundingClientRect().width || '100vw', maxWidth: 'none' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 bg-[#0d0e12]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-zinc-400 border border-zinc-700/20 z-10 whitespace-nowrap">
            Raw Camera (Before)
          </div>
        </div>

        {/* Handle slider button */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-teal-400 cursor-ew-resize pointer-events-none z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-teal-400 flex items-center justify-center shadow-lg -ml-3.5 hover:scale-110 active:scale-95 transition-all duration-150">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 4 4 4m8 0l4-4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Guide tags */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-zinc-400" />
          <span>Drag the center handle to see color grading difference</span>
        </div>
        <span className="text-teal-400/80">{Math.round(sliderPosition)}% Split</span>
      </div>
    </div>
  );
}
