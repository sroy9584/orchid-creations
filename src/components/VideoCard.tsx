import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Clock } from 'lucide-react';
import { PortfolioVideo } from '../types/portfolio';

interface VideoCardProps {
  video: PortfolioVideo;
  categoryTitle?: string;
  onPlay: (video: PortfolioVideo) => void;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, categoryTitle, onPlay }) => {
  // Graceful fallback from maxresdefault to hqdefault
  const [thumbSrc, setThumbSrc] = useState<string>(
    video.thumbnailUrl || `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`
  );

  // 6 Motion Preview Frame URLs across different timestamps of the video
  const frameUrls = useMemo(
    () => [
      thumbSrc,                                     // Frame 0: Primary Cover
      `https://i.ytimg.com/vi/${video.id}/sd1.jpg`, // Frame 1: ~25% timestamp (Opening story)
      `https://i.ytimg.com/vi/${video.id}/sd2.jpg`, // Frame 2: ~50% timestamp (Climax/Rituals)
      `https://i.ytimg.com/vi/${video.id}/sd3.jpg`, // Frame 3: ~75% timestamp (Celebration/Ending)
      `https://i.ytimg.com/vi/${video.id}/hq1.jpg`, // Frame 4: Motion Moment 1
      `https://i.ytimg.com/vi/${video.id}/hq2.jpg`, // Frame 5: Motion Moment 2
    ],
    [video.id, thumbSrc]
  );

  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const frameTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const preloadedRef = useRef<boolean>(false);

  // Touch and scroll discrimination handling
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isScrollingRef = useRef<boolean>(false);
  const isLongPressActive = useRef<boolean>(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTouchTimeRef = useRef<number>(0);

  // Preload preview frames on first interaction
  const preloadFrames = useCallback(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    frameUrls.slice(1).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [frameUrls]);

  // Frame cycling loop: 6 motion frames looping continuously during hover/press
  useEffect(() => {
    if (isPreviewing) {
      preloadFrames();
      frameTimerRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => (prev + 1) % frameUrls.length);
      }, 390);
    } else {
      if (frameTimerRef.current) {
        clearInterval(frameTimerRef.current);
        frameTimerRef.current = null;
      }
      setCurrentFrameIndex(0);
    }

    return () => {
      if (frameTimerRef.current) clearInterval(frameTimerRef.current);
    };
  }, [isPreviewing, preloadFrames, frameUrls.length]);

  // Mouse Hover handlers (Desktop)
  const handleMouseEnter = () => {
    setIsPreviewing(true);
  };

  const handleMouseLeave = () => {
    setIsPreviewing(false);
  };

  // Touch handlers: Clean scroll detection preventing unintended modal opens
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
    isScrollingRef.current = false;
    isLongPressActive.current = false;

    // Start long-press preview detection (held for >220ms without scroll movement)
    longPressTimerRef.current = setTimeout(() => {
      if (!isScrollingRef.current) {
        isLongPressActive.current = true;
        setIsPreviewing(true);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try {
            navigator.vibrate(20);
          } catch (_) {}
        }
      }
    }, 220);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - touchStartPos.current.x);
    const dy = Math.abs(touch.clientY - touchStartPos.current.y);

    // If movement exceeds 8px in any direction, user is SCROLLING the page!
    if (dx > 8 || dy > 8) {
      isScrollingRef.current = true;
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (isLongPressActive.current) {
        setIsPreviewing(false);
        isLongPressActive.current = false;
      }
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    lastTouchTimeRef.current = Date.now();

    if (isLongPressActive.current) {
      // User held finger for motion preview and just lifted: stop preview, do NOT open modal
      setIsPreviewing(false);
      isLongPressActive.current = false;
    } else if (!isScrollingRef.current && touchStartPos.current) {
      // Intentional, stationary tap (not a scroll movement): open full video modal
      onPlay(video);
    }
    // If isScrollingRef.current === true, do absolutely nothing (user was scrolling)

    touchStartPos.current = null;
    isScrollingRef.current = false;
  };

  const handleTouchCancel = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    setIsPreviewing(false);
    isLongPressActive.current = false;
    isScrollingRef.current = false;
    touchStartPos.current = null;
  };

  const handleImageError = () => {
    if (!thumbSrc.includes('hqdefault')) {
      setThumbSrc(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`);
    }
  };

  const handleClick = () => {
    // Suppress synthetic click fired by mobile browser after touch scrolling/tapping
    if (Date.now() - lastTouchTimeRef.current < 600) {
      return;
    }
    // Desktop mouse click: open full video modal
    onPlay(video);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden glass-card flex flex-col cursor-pointer focus-within:ring-2 focus-within:ring-[#BF54A3] select-none"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      {/* Thumbnail Aspect Ratio 16:9 Frame with Motion Preview */}
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-900/80">
        {/* Animated Motion Frame: Cycles through 5-6 timestamps on hover/touch-hold */}
        <motion.img
          key={isPreviewing ? currentFrameIndex : 'cover'}
          src={isPreviewing ? frameUrls[currentFrameIndex] : thumbSrc}
          alt={video.title}
          onError={handleImageError}
          loading="lazy"
          initial={isPreviewing ? { opacity: 0.9, scale: 1.03 } : false}
          animate={{ opacity: 1, scale: isPreviewing ? 1.07 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1516] via-black/25 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/65 backdrop-blur-md text-white/90 border border-white/10 shadow-sm">
            {categoryTitle || video.categoryId}
          </span>
          {isPreviewing ? (
            <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#BF54A3] backdrop-blur-md text-white border border-[#D977BF]/40 shadow-glow-accent animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              PREVIEW
            </span>
          ) : video.featured ? (
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#BF54A3] backdrop-blur-md text-white border border-[#D977BF]/40 shadow-glow-accent">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          ) : null}
        </div>

        {/* Duration Pill on Thumbnail Corner */}
        {video.duration && !isPreviewing && (
          <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
            <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-white/95 border border-white/10 shadow-sm">
              <Clock className="w-2.5 h-2.5 text-[#107361]" />
              <span>{video.duration}</span>
            </span>
          </div>
        )}

        {/* Motion Scrubber Indicator Bars (Active on Hover or Touch-Hold) */}
        {isPreviewing && (
          <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center gap-1 pointer-events-none">
            {frameUrls.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx === currentFrameIndex
                    ? 'bg-[#BF54A3] shadow-[0_0_8px_rgba(191,84,163,0.9)]'
                    : idx < currentFrameIndex
                    ? 'bg-white/70'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}

        {/* Play Icon Trigger Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 ${
              isPreviewing
                ? 'bg-[#BF54A3] border border-[#D977BF] shadow-[0_0_25px_rgba(191,84,163,0.7)] scale-105'
                : 'bg-white/15 backdrop-blur-md border border-white/30 group-hover:bg-[#BF54A3] group-hover:border-[#D977BF]'
            }`}
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white/95 group-hover:text-[#D977BF] transition-colors line-clamp-1">
            {video.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Card Footer: Watch Film action and Video Duration Badge replacing old '4K Portfolio' */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 text-[#BF54A3] group-hover:text-[#D977BF] font-medium">
            Watch Film
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          <span className="text-[11px] font-mono text-[#107361] font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#107361]/10 border border-[#107361]/25">
            <Clock className="w-3 h-3 text-[#107361]" />
            <span>{video.duration || '4K Film'}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};
