import React, { useRef, useEffect } from 'react';

// Duration in seconds for the seamless cross-dissolve window
const FADE_DURATION = 1.6;

export const SeamlessVideoBanner: React.FC = () => {
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // Track which player is currently the primary front-runner ('A' or 'B')
  const activeRef = useRef<'A' | 'B'>('A');
  const isCrossfadingRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const vA = videoRefA.current;
    const vB = videoRefB.current;
    if (!vA || !vB) return;

    vA.muted = true;
    vB.muted = true;

    // Start Player A
    const startPlay = async () => {
      try {
        vA.currentTime = 0;
        await vA.play();
        vA.style.opacity = '1';
        vB.style.opacity = '0';
        activeRef.current = 'A';
        isCrossfadingRef.current = false;
      } catch (err) {
        console.warn('Banner video autoplay waiting for user gesture', err);
      }
    };

    startPlay();

    // High-frequency frame check loop for glitchless, frame-accurate crossfade
    const checkLoop = () => {
      const active = activeRef.current;
      const primary = active === 'A' ? vA : vB;
      const secondary = active === 'A' ? vB : vA;

      if (primary && primary.duration && !isNaN(primary.duration) && primary.duration > 0) {
        const timeLeft = primary.duration - primary.currentTime;

        // Enter crossfade window
        if (timeLeft <= FADE_DURATION && timeLeft > 0) {
          if (!isCrossfadingRef.current) {
            isCrossfadingRef.current = true;
            // Pre-roll secondary player smoothly from 0
            secondary.currentTime = 0;
            secondary.play().catch(() => {});
          }

          // Calculate normalized progress (0 -> 1)
          const progress = Math.min(Math.max((FADE_DURATION - timeLeft) / FADE_DURATION, 0), 1);

          // Secondary fades in smoothly
          secondary.style.opacity = progress.toFixed(3);
          // Primary stays visible until secondary is fully opaque
          primary.style.opacity = (1 - progress * 0.15).toFixed(3);
        } else if (timeLeft <= 0.05 || primary.ended) {
          // Crossfade complete: swap roles seamlessly
          secondary.style.opacity = '1';
          primary.style.opacity = '0';
          primary.pause();
          primary.currentTime = 0;

          activeRef.current = active === 'A' ? 'B' : 'A';
          isCrossfadingRef.current = false;
        }
      }

      animFrameRef.current = requestAnimationFrame(checkLoop);
    };

    animFrameRef.current = requestAnimationFrame(checkLoop);

    // Fallback onEnded safety handlers
    const handleEndedA = () => {
      if (activeRef.current === 'A') {
        vB.style.opacity = '1';
        vA.style.opacity = '0';
        vA.pause();
        vA.currentTime = 0;
        activeRef.current = 'B';
        isCrossfadingRef.current = false;
      }
    };

    const handleEndedB = () => {
      if (activeRef.current === 'B') {
        vA.style.opacity = '1';
        vB.style.opacity = '0';
        vB.pause();
        vB.currentTime = 0;
        activeRef.current = 'A';
        isCrossfadingRef.current = false;
      }
    };

    vA.addEventListener('ended', handleEndedA);
    vB.addEventListener('ended', handleEndedB);

    // Auto-resume if mobile power saver deferred initial playback
    const handleWakeup = () => {
      if (vA.paused && vB.paused) {
        startPlay();
      }
    };
    window.addEventListener('pointerdown', handleWakeup, { once: true });
    window.addEventListener('scroll', handleWakeup, { once: true });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      vA.removeEventListener('ended', handleEndedA);
      vB.removeEventListener('ended', handleEndedB);
      window.removeEventListener('pointerdown', handleWakeup);
      window.removeEventListener('scroll', handleWakeup);
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-[#0D1516] border-y border-white/10 shadow-2xl select-none"
      aria-label="Orchid Creation Video Banner Ribbon"
    >
      <div className="relative w-full aspect-[1882/164] min-h-[44px] sm:min-h-[64px] md:min-h-[82px] lg:min-h-[105px]">
        {/* Dual-Player Architecture for Zero-Lag, Zero-Stutter, Zero-Blink Infinite Loop */}
        <video
          ref={videoRefA}
          src="./assets/video/banner-ribbon.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 1, willChange: 'opacity' }}
        />

        <video
          ref={videoRefB}
          src="./assets/video/banner-ribbon.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0, willChange: 'opacity' }}
        />

        {/* Soft Left & Right Vignette Blends so ribbon flows seamlessly with dark site edges */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#0D1516] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#0D1516] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};
