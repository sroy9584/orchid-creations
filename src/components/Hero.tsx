import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Film, Award, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center pt-24 pb-8 sm:pt-28 sm:pb-10 overflow-hidden">
      {/* Ambient Liquid Glass Orbs (Adobe Orchid, Plum & Teal Palette) */}
      <div className="ambient-glow bg-[#BF54A3]/20 w-[520px] h-[520px] -top-24 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-[#107361]/25 w-[440px] h-[440px] top-1/3 -left-32" />
      <div className="ambient-glow bg-[#592D4D]/35 w-[400px] h-[400px] bottom-10 -right-20" />

      {/* Subtle Grid Backdrop Layer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(240,242,242,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(240,242,242,0.2) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Official Studio Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-3.5 relative"
        >
          <div className="ambient-glow bg-[#BF54A3]/25 w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img
            src={siteConfig.logoPath}
            alt={`${siteConfig.brandName} Official Logo`}
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain mx-auto relative z-10 drop-shadow-[0_8px_20px_rgba(191,84,163,0.35)]"
          />
        </motion.div>

        {/* Small Top Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-glass-sm mb-4"
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
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.12]"
        >
          GIVING WINGS TO YOUR{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361] drop-shadow-[0_0_35px_rgba(191,84,163,0.45)]">
            STORIES.
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed font-normal"
        >
          From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
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
            className="glass-btn-secondary w-full sm:w-auto text-sm sm:text-base !py-3 !px-7 group"
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
          className="mt-8 sm:mt-10 w-full max-w-4xl p-3.5 sm:p-4 rounded-2xl glass-card flex flex-wrap items-center justify-around gap-3 sm:gap-6 text-left border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#BF54A3]/15 border border-[#BF54A3]/30 flex items-center justify-center text-[#BF54A3]">
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
            <div className="w-9 h-9 rounded-xl bg-[#107361]/15 border border-[#107361]/30 flex items-center justify-center text-[#107361]">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">570+ Films</div>
              <div className="text-[11px] text-neutral-400">YouTube Official Vault</div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#592D4D]/25 border border-[#592D4D]/40 flex items-center justify-center text-[#D977BF]">
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

