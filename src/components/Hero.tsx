import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Film, Award, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { HeroVideoBackground } from './HeroVideoBackground';
import { SeamlessVideoBanner } from './SeamlessVideoBanner';
import { PortfolioVideo } from '../types/portfolio';

interface HeroProps {
  videos?: PortfolioVideo[];
}

export const Hero: React.FC<HeroProps> = ({ videos = [] }) => {
  return (
    <section className="relative flex flex-col justify-end items-center pt-20 sm:pt-24 pb-0 min-h-[540px] sm:min-h-[600px] md:min-h-[640px] overflow-hidden">
      {/* Background Interactive Video Reel (Curtain architecture with random start and dynamic cross-dissolve) */}
      <HeroVideoBackground videos={videos} />

      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-none mb-2 sm:mb-3 w-full">
        {/* Official Studio Wordmark Banner (Film Reel + Orchid Creation wordmark exclusively for Hero section) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-2 sm:mb-2.5 relative pointer-events-auto"
        >
          <img
            src="./assets/logo/hero-logo.png"
            alt="Orchid Creation"
            className="w-auto h-7 sm:h-9 md:h-11 max-w-[210px] sm:max-w-[280px] md:max-w-[340px] object-contain mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          />
        </motion.div>

        {/* Small Top Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl shadow-xl mb-2 sm:mb-2.5 pointer-events-auto"
        >
          <Sparkles className="w-3 h-3 text-[#BF54A3]" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#F0F2F2]">
            CREATIVE VIDEO POST-PRODUCTION STUDIO
          </span>
          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full bg-[#BF54A3]/20 text-[#D977BF] font-mono border border-[#BF54A3]/30">
            EST. {siteConfig.establishedYear}
          </span>
        </motion.div>

        {/* Main Heading - Responsive on mobile, tablet & desktop */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.14] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        >
          GIVING WINGS TO YOUR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361] drop-shadow-[0_0_25px_rgba(191,84,163,0.6)]">
            STORIES.
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-white/95 max-w-2xl leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-2"
        >
          From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.
        </motion.p>

        {/* Action CTAs - Responsive row on both mobile and desktop */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 sm:mt-3.5 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto pointer-events-auto"
        >
          <Link
            to="/portfolio"
            className="glass-btn-primary text-xs sm:text-sm font-semibold !py-2.5 !px-4 sm:!py-3 sm:!px-7 shadow-glow-accent group shrink-0"
          >
            <span>EXPLORE WORK</span>
            <Film className="w-3.5 h-3.5 ml-1 transition-transform group-hover:scale-110" />
          </Link>

          <Link
            to="/contact"
            className="glass-btn-secondary text-xs sm:text-sm font-semibold !py-2.5 !px-4 sm:!py-3 sm:!px-7 group bg-black/40 backdrop-blur-md border border-white/20 shrink-0"
          >
            <span>LET'S WORK TOGETHER</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Studio Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-3 sm:mt-3.5 mb-1.5 sm:mb-2 w-full max-w-3xl p-2 sm:p-3 rounded-xl sm:rounded-2xl glass-card grid grid-cols-3 divide-x divide-white/10 text-center border border-white/15 bg-black/55 backdrop-blur-xl pointer-events-auto shadow-2xl"
        >
          {/* Stat 1: 5+ Years */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#BF54A3]/20 border border-[#BF54A3]/30 flex items-center justify-center text-[#BF54A3] shrink-0">
              <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                {siteConfig.yearsOfExperience}
              </div>
              <div className="text-[9px] sm:text-[11px] text-neutral-400 truncate">Post-Production Craft</div>
            </div>
          </div>

          {/* Stat 2: 570+ Films */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#107361]/20 border border-[#107361]/30 flex items-center justify-center text-[#107361] shrink-0">
              <Film className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">570+ Films</div>
              <div className="text-[9px] sm:text-[11px] text-neutral-400 truncate">YouTube Official Vault</div>
            </div>
          </div>

          {/* Stat 3: Turnkey Suite */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 px-1 sm:px-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#592D4D]/30 border border-[#592D4D]/40 flex items-center justify-center text-[#D977BF] shrink-0">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            <div className="text-center sm:text-left">
              <div className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">Turnkey Suite</div>
              <div className="text-[9px] sm:text-[11px] text-neutral-400 truncate">Pacing • Color • Sound</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Seamless Infinite Video Banner Ribbon (Placed in the red-marked section) */}
      <div className="relative z-30 w-full mt-1 sm:mt-2">
        <SeamlessVideoBanner />
      </div>
    </section>
  );
};
