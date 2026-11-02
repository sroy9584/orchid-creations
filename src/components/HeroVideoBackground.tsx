import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { PortfolioVideo } from '../types/portfolio';

interface HeroVideoBackgroundProps {
  videos: PortfolioVideo[];
}

interface StagedSlot {
  video: PortfolioVideo;
  startTime: number;
  key: number;
}

export const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ videos }) => {
  // Curated Featured Projects pool (directly using the user's hand-picked featured collection)
  const pool = useMemo(() => {
    if (!videos || videos.length === 0) return [];
    return videos;
  }, [videos]);

  // Random starting point between 12s and 55s so every clip shows dynamic action
  const getRandomStart = useCallback(() => Math.floor(Math.random() * 45) + 12, []);

  // Track the index of the currently active video in the pool
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Dual-slot state: Slot A and Slot B
  // ONE slot is visible at opacity-100; the OTHER pre-buffers in the background at opacity-0
  const [activeSlot, setActiveSlot] = useState<'A' | 'B'>('A');

  const [slotA, setSlotA] = useState<StagedSlot>(() => {
    const first = pool[0] || {
      id: 'ntDwGj0CZRE',
      title: 'Fariha & Ibraheem Wedding Teaser',
      thumbnailUrl: 'https://i.ytimg.com/vi/ntDwGj0CZRE/maxresdefault.jpg',
    };
    return {
      video: first as PortfolioVideo,
      startTime: 20,
      key: 1,
    };
  });

  const [slotB, setSlotB] = useState<StagedSlot>(() => {
    const second = pool[1] || {
      id: 'LYZRr5Ex35Q',
      title: 'Joydeep & Shweta Wedding Teaser',
      thumbnailUrl: 'https://i.ytimg.com/vi/LYZRr5Ex35Q/maxresdefault.jpg',
    };
    return {
      video: second as PortfolioVideo,
      startTime: 25,
      key: 2,
    };
  });

  const isInitialSyncDone = useRef<boolean>(false);

  // Synchronize initial slots once the randomized pool is available
  useEffect(() => {
    if (!isInitialSyncDone.current && pool.length >= 2) {
      isInitialSyncDone.current = true;
      setSlotA({
        video: pool[0],
        startTime: getRandomStart(),
        key: Date.now(),
      });
      setSlotB({
        video: pool[1],
        startTime: getRandomStart(),
        key: Date.now() + 1,
      });
    }
  }, [pool, getRandomStart]);

  const iframeARef = useRef<HTMLIFrameElement>(null);
  const iframeBRef = useRef<HTMLIFrameElement>(null);

  // References to keep track of timers and prevent duplicate triggers
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isTransitioningRef = useRef<boolean>(false);

  // Switch to next or previous video with seamless cross-dissolve
  const switchVideo = useCallback(
    (direction: 'next' | 'prev' = 'next') => {
      if (pool.length < 2 || isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % pool.length
          : (currentIndex - 1 + pool.length) % pool.length;

      const upcomingAfterNext = (nextIndex + 1) % pool.length;

      if (activeSlot === 'A') {
        // Slot B was ALREADY preloaded and running in background at opacity-0!
        // Immediately fade B in and fade A out:
        setActiveSlot('B');
        setCurrentIndex(nextIndex);

        // After the 1.4s crossfade finishes and Slot A is 100% hidden,
        // pre-load the subsequent video into Slot A so it is ready for the next transition!
        setTimeout(() => {
          setSlotA({
            video: pool[upcomingAfterNext],
            startTime: getRandomStart(),
            key: Date.now(),
          });
          isTransitioningRef.current = false;
        }, 1500);
      } else {
        // Slot A was ALREADY preloaded and running in background at opacity-0!
        // Immediately fade A in and fade B out:
        setActiveSlot('A');
        setCurrentIndex(nextIndex);

        // After the 1.4s crossfade finishes and Slot B is 100% hidden,
        // pre-load the subsequent video into Slot B so it is ready for the next transition!
        setTimeout(() => {
          setSlotB({
            video: pool[upcomingAfterNext],
            startTime: getRandomStart(),
            key: Date.now(),
          });
          isTransitioningRef.current = false;
        }, 1500);
      }
    },
    [pool, currentIndex, activeSlot, getRandomStart]
  );

  // Auto-advance video every 5 seconds
  useEffect(() => {
    if (pool.length < 2) return;

    cycleTimerRef.current = setInterval(() => {
      switchVideo('next');
    }, 5000);

    return () => {
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
    };
  }, [switchVideo, pool.length]);

  // Touch and Mouse drag / swipe detection
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  // Active defense against native YouTube pause: auto-resume instantly if paused
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        if (data && data.event === 'onStateChange' && data.info === 2) {
          // If paused, force resume immediately
          iframeARef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
            '*'
          );
          iframeBRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'playVideo', args: [] }),
            '*'
          );
        }
      } catch {
        // Safe ignore
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const deltaX = e.clientX - pointerStart.current.x;
    const deltaY = e.clientY - pointerStart.current.y;
    pointerStart.current = null;

    // Trigger only on intentional horizontal swipe (>45px)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> Next Video
        switchVideo('next');
      } else {
        // Swiped Right -> Previous Video
        switchVideo('prev');
      }

      // Reset auto-timer on user interaction so they get full duration
      if (cycleTimerRef.current) clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = setInterval(() => {
        switchVideo('next');
      }, 5000);
    }
  };

  // Active video title for the bottom pill
  const activeVideo = activeSlot === 'A' ? slotA.video : slotB.video;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="absolute inset-0 w-full h-full overflow-hidden select-none touch-pan-y"
      aria-label="Interactive background video reel. Swipe left or right to change featured project clip."
    >
      {/* =========================================================
          SLOT A VIDEO LAYER
          Visible when activeSlot === 'A', smoothly preloading when 'B'
          ========================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-[1400ms] ease-in-out pointer-events-none ${
          activeSlot === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        {/* High-res backdrop photo prevents any blank flash during initial connection */}
        <img
          src={slotA.video?.thumbnailUrl || `https://i.ytimg.com/vi/${slotA.video?.id}/maxresdefault.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${slotA.video?.id}/hqdefault.jpg`;
          }}
        />

        <iframe
          ref={iframeARef}
          key={`slotA-${slotA.key}`}
          src={`https://www.youtube-nocookie.com/embed/${slotA.video?.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&start=${slotA.startTime}&iv_load_policy=3&disablekb=1&loop=1&playlist=${slotA.video?.id}`}
          title={`Cinematic Reel A - ${slotA.video?.title}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[65vw] min-w-[180vh] min-h-[100%] pointer-events-none scale-105"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
        />
      </div>

      {/* =========================================================
          SLOT B VIDEO LAYER
          Visible when activeSlot === 'B', smoothly preloading when 'A'
          ========================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-[1400ms] ease-in-out pointer-events-none ${
          activeSlot === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
        }`}
      >
        {/* High-res backdrop photo prevents any blank flash during initial connection */}
        <img
          src={slotB.video?.thumbnailUrl || `https://i.ytimg.com/vi/${slotB.video?.id}/maxresdefault.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://i.ytimg.com/vi/${slotB.video?.id}/hqdefault.jpg`;
          }}
        />

        <iframe
          ref={iframeBRef}
          key={`slotB-${slotB.key}`}
          src={`https://www.youtube-nocookie.com/embed/${slotB.video?.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1&enablejsapi=1&start=${slotB.startTime}&iv_load_policy=3&disablekb=1&loop=1&playlist=${slotB.video?.id}`}
          title={`Cinematic Reel B - ${slotB.video?.title}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115vw] h-[65vw] min-w-[180vh] min-h-[100%] pointer-events-none scale-105"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
        />
      </div>

      {/* =========================================================
          TOUCH/MOUSE INTERACTION SHIELD
          Intercepts all user clicks and drags so native YouTube pause/controls are NEVER activated
          ========================================================= */}
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="absolute inset-0 z-10 pointer-events-auto cursor-grab active:cursor-grabbing touch-pan-y"
      />

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
            'radial-gradient(ellipse at center, rgba(8, 9, 13, 0.08) 0%, rgba(8, 9, 13, 0.32) 60%, rgba(8, 9, 13, 0.72) 100%)',
        }}
      />

      {/* 3. Bottom seamless blend into next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0D1516] via-[#0D1516]/65 to-transparent z-10 pointer-events-none" />

      {/* 4. Top subtle navbar protection gradient */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#08090D]/50 to-transparent z-10 pointer-events-none" />

      {/* =========================================================
          INTERACTIVE CONTROLS & LIVE REEL STATUS PILL
          ========================================================= */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 max-w-7xl mx-auto pointer-events-none">
        {/* Left / Prev Arrow Button */}
        <button
          type="button"
          onClick={() => switchVideo('prev')}
          aria-label="Previous featured video clip"
          className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/45 hover:bg-[#BF54A3]/30 border border-white/10 hover:border-[#BF54A3]/50 text-white/80 hover:text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center group shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Center Live Reel Pill */}
        <div className="pointer-events-auto mx-auto inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-glass-sm text-[11px] sm:text-xs text-neutral-300">
          {/* Pulsing Live indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BF54A3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BF54A3]" />
          </span>

          <span className="font-mono text-[10px] uppercase text-[#D977BF] font-semibold tracking-wider flex items-center gap-1">
            <Film className="w-3 h-3 text-[#BF54A3]" />
            <span>REEL:</span>
          </span>

          <span className="max-w-[150px] sm:max-w-[280px] truncate font-medium text-white/95">
            {activeVideo?.title || 'Cinematic Film Highlight'}
          </span>

          <span className="hidden md:inline text-neutral-400 font-mono text-[10px] pl-1.5 border-l border-white/15">
            Swipe ← → to switch
          </span>
        </div>

        {/* Right / Next Arrow Button */}
        <button
          type="button"
          onClick={() => switchVideo('next')}
          aria-label="Next featured video clip"
          className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/45 hover:bg-[#BF54A3]/30 border border-white/10 hover:border-[#BF54A3]/50 text-white/80 hover:text-white transition-all backdrop-blur-md hidden sm:flex items-center justify-center group shadow-lg"
        >
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
