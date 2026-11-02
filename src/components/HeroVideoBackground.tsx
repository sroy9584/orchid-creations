import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Film, Sparkles } from 'lucide-react';
import { PortfolioVideo } from '../types/portfolio';

interface HeroVideoBackgroundProps {
  videos: PortfolioVideo[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface VideoSlot {
  id: string;
  title: string;
  thumbnail: string;
  startTime: number;
  renderKey: number;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ videos }) => {
  // Filter top cinematic videos (weddings, pre-weddings, teasers, highlights)
  const pool = React.useMemo(() => {
    if (!videos || videos.length === 0) return [];
    // Prioritize teasers and highlights
    const prioritized = videos.filter(
      (v) =>
        v.title.toLowerCase().includes('teaser') ||
        v.title.toLowerCase().includes('highlight') ||
        v.title.toLowerCase().includes('story') ||
        v.title.toLowerCase().includes('reel')
    );
    return prioritized.length >= 5 ? prioritized : videos;
  }, [videos]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  // Random starting point between 12s and 65s so every clip shows dynamic action
  const getRandomStart = useCallback(() => Math.floor(Math.random() * 50) + 15, []);

  // Dual-slot state for zero-stutter cross-fading
  const [slotA, setSlotA] = useState<VideoSlot>(() => {
    const first = pool[0] || {
      id: 'FargqR3UwXo',
      title: 'Mukesh & Aditi Highlight',
      thumbnailUrl: '',
    };
    return {
      id: first.id,
      title: first.title,
      thumbnail: first.thumbnailUrl,
      startTime: 20,
      renderKey: 1,
    };
  });

  const [slotB, setSlotB] = useState<VideoSlot>(() => {
    const second = pool[1] || {
      id: 'EsFPoMxjbDw',
      title: 'Smarajit & Rituparna Wedding Teaser',
      thumbnailUrl: '',
    };
    return {
      id: second.id,
      title: second.title,
      thumbnail: second.thumbnailUrl,
      startTime: 30,
      renderKey: 2,
    };
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Function to switch to next or previous video with seamless crossfade
  const switchVideo = useCallback(
    (direction: 'next' | 'prev' = 'next') => {
      if (pool.length === 0) return;

      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % pool.length
          : (currentIndex - 1 + pool.length) % pool.length;

      const nextVideo = pool[nextIndex];
      const newStart = getRandomStart();

      if (activeSlot === 'A') {
        // Prepare Slot B and fade to B
        setSlotB({
          id: nextVideo.id,
          title: nextVideo.title,
          thumbnail: nextVideo.thumbnailUrl,
          startTime: newStart,
          renderKey: Date.now(),
        });
        setActiveSlot('B');
      } else {
        // Prepare Slot A and fade to A
        setSlotA({
          id: nextVideo.id,
          title: nextVideo.title,
          thumbnail: nextVideo.thumbnailUrl,
          startTime: newStart,
          renderKey: Date.now(),
        });
        setActiveSlot('A');
      }

      setCurrentIndex(nextIndex);
    },
    [pool, currentIndex, activeSlot, getRandomStart]
  );

  // Auto-cycle every 4.8 seconds
  useEffect(() => {
    if (pool.length === 0) return;

    timerRef.current = setInterval(() => {
      switchVideo('next');
    }, 4800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [switchVideo, pool.length]);

  // Touch and Mouse drag / swipe detection
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [isSwipingFeedback, setIsSwipingFeedback] = useState<'left' | 'right' | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const deltaX = e.clientX - pointerStart.current.x;
    const deltaY = e.clientY - pointerStart.current.y;
    pointerStart.current = null;

    // Trigger only on horizontal swipe (avoid accidental vertical scroll trigger)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> Next Video
        setIsSwipingFeedback('left');
        switchVideo('next');
      } else {
        // Swiped Right -> Previous Video
        setIsSwipingFeedback('right');
        switchVideo('prev');
      }
      setTimeout(() => setIsSwipingFeedback(null), 500);

      // Reset auto-timer so the user has full 4.8s on the newly chosen clip
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        switchVideo('next');
      }, 4800);
    }
  };

  const activeTitle = activeSlot === 'A' ? slotA.title : slotB.title;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 w-full h-full overflow-hidden select-none touch-pan-y"
      aria-label="Interactive background video reel. Swipe left or right to change featured project clip."
    >
      {/* Slot A Video Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
          activeSlot === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        {slotA.thumbnail && (
          <img
            src={slotA.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105"
          />
        )}
        <iframe
          key={`slotA-${slotA.renderKey}`}
          src={`https://www.youtube-nocookie.com/embed/${slotA.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&start=${slotA.startTime}&iv_load_policy=3&disablekb=1&loop=1`}
          title={`Background Reel A - ${slotA.title}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[65vw] min-w-[180vh] min-h-[100%] pointer-events-none opacity-100 scale-105"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
        />
      </div>

      {/* Slot B Video Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
          activeSlot === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        }`}
      >
        {slotB.thumbnail && (
          <img
            src={slotB.thumbnail}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105"
          />
        )}
        <iframe
          key={`slotB-${slotB.renderKey}`}
          src={`https://www.youtube-nocookie.com/embed/${slotB.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&start=${slotB.startTime}&iv_load_policy=3&disablekb=1&loop=1`}
          title={`Background Reel B - ${slotB.title}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[65vw] min-w-[180vh] min-h-[100%] pointer-events-none opacity-100 scale-105"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
        />
      </div>

      {/* =========================================================
          BALANCED CINEMATIC GLASS OVERLAY
          Bright & vivid video visibility + crystal-clear text readability
          ========================================================= */}
      {/* 1. Translucent dark tint (30% so footage details are bright & vibrant) */}
      <div className="absolute inset-0 bg-[#08090D]/30 z-10 pointer-events-none" />

      {/* 2. Soft radial vignette (bright in center, gentle darkening toward outer edges) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(8, 9, 13, 0.1) 0%, rgba(8, 9, 13, 0.35) 60%, rgba(8, 9, 13, 0.75) 100%)',
        }}
      />

      {/* 3. Bottom seamless blend into next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0D1516] via-[#0D1516]/60 to-transparent z-10 pointer-events-none" />

      {/* 4. Top subtle navbar protection gradient */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#08090D]/50 to-transparent z-10 pointer-events-none" />

      {/* =========================================================
          INTERACTIVE CONTROLS & LIVE REEL STATUS PILL
          ========================================================= */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        {/* Left / Prev Arrow Button */}
        <button
          type="button"
          onClick={() => switchVideo('prev')}
          aria-label="Previous featured video clip"
          className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-[#BF54A3]/30 border border-white/10 hover:border-[#BF54A3]/50 text-white/80 hover:text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Center Live Reel Pill */}
        <div className="pointer-events-auto mx-auto inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-glass-sm text-[11px] sm:text-xs text-neutral-300">
          {/* Pulsing Live indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF54A3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BF54A3]" />
          </span>

          <span className="font-mono text-[10px] uppercase text-[#D977BF] font-semibold tracking-wider flex items-center gap-1">
            <Film className="w-3 h-3 text-[#BF54A3]" />
            <span>REEL:</span>
          </span>

          <span className="max-w-[140px] sm:max-w-[260px] truncate font-medium text-white/90">
            {activeTitle}
          </span>

          <span className="hidden md:inline text-neutral-500 font-mono text-[10px] pl-1 border-l border-white/10">
            Swipe ← → to switch
          </span>
        </div>

        {/* Right / Next Arrow Button */}
        <button
          type="button"
          onClick={() => switchVideo('next')}
          aria-label="Next featured video clip"
          className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-[#BF54A3]/30 border border-white/10 hover:border-[#BF54A3]/50 text-white/80 hover:text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center group"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
