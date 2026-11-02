import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Film, Award, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { HeroVideoBackground } from './HeroVideoBackground';
import { PortfolioVideo } from '../types/portfolio';

interface HeroProps {
  videos?: PortfolioVideo[];
}

export const Hero: React.FC<HeroProps> = ({ videos = [] }) => {
  return (
    <section className="relative flex items-center justify-center pt-32 pb-24 sm:pt-36 sm:pb-28 md:pt-40 md:pb-32 overflow-hidden min-h-[720px] sm:min-h-[780px] lg:min-h-[820px]">
      {/* Background Interactive Video Reel (Squarespace-style with random starting times & swipe gestures) */}
      <HeroVideoBackground videos={videos} />

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pointer-events-none">
        {/* Official Studio Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-1 sm:mt-3 mb-3.5 relative pointer-events-auto"
        >
          <img
            src={siteConfig.logoPath}
            alt={`${siteConfig.brandName} Official Logo`}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain mx-auto relative z-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          />
        </motion.div>

        {/* Small Top Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl mb-4 pointer-events-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#BF54A3]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F0F2F2]">
            CREATIVE VIDEO POST-PRODUCTION STUDIO
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#BF54A3]/20 text-[#D977BF] font-mono border border-[#BF54A3]/30">
            EST. {siteConfig.establishedYear}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        >
          GIVING WINGS TO YOUR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361] drop-shadow-[0_0_25px_rgba(191,84,163,0.6)]">
            STORIES.
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-white/95 max-w-2xl leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
        >
          From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto pointer-events-auto"
        >
          <Link
            to="/portfolio"
            className="glass-btn-primary w-full sm:w-auto text-sm sm:text-base !py-3 !px-7 shadow-glow-accent group"
          >
            <span>EXPLORE MY WORK</span>
            <Film className="w-4 h-4 ml-1 transition-transform group-hover:scale-110" />
          </Link>

          <Link
            to="/contact"
            className="glass-btn-secondary w-full sm:w-auto text-sm sm:text-base !py-3 !px-7 group bg-black/40 backdrop-blur-md border border-white/20"
          >
            <span>LET'S WORK TOGETHER</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Studio Highlights Bar (Liquid Glass Pill) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 mb-8 sm:mb-12 w-full max-w-4xl p-3.5 sm:p-4 rounded-2xl glass-card flex flex-wrap items-center justify-around gap-3 sm:gap-6 text-left border border-white/15 bg-black/50 backdrop-blur-xl pointer-events-auto shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#BF54A3]/20 border border-[#BF54A3]/30 flex items-center justify-center text-[#BF54A3]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">
                {siteConfig.yearsOfExperience}
              </div>
              <div className="text-[11px] text-neutral-400">Post-Production Craft</div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#107361]/20 border border-[#107361]/30 flex items-center justify-center text-[#107361]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">570+ Films</div>
              <div className="text-[11px] text-neutral-400">YouTube Official Vault</div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#592D4D]/30 border border-[#592D4D]/40 flex items-center justify-center text-[#D977BF]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">Turnkey Suite</div>
              <div className="text-[11px] text-neutral-400">Pacing • Color • Sound • VFX</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
