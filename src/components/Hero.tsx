import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Film, Award, Clock } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient Liquid Glass Orbs */}
      <div className="ambient-glow bg-purple-600/20 w-[500px] h-[500px] -top-24 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-sky-500/15 w-[420px] h-[420px] top-1/3 -left-32" />
      <div className="ambient-glow bg-purple-900/25 w-[380px] h-[380px] bottom-10 -right-20" />

      {/* Subtle Grid Backdrop Layer */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Small Top Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-glass-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-purple-200">
            CREATIVE VIDEO POST-PRODUCTION STUDIO
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono border border-purple-400/20">
            EST. {siteConfig.establishedYear}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.12]"
        >
          WE TURN YOUR MOMENTS INTO{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-sky-300 drop-shadow-[0_0_30px_rgba(167,139,250,0.35)]">
            CINEMATIC STORIES.
          </span>
        </motion.h1>

        {/* Supporting Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed font-normal"
        >
          From cinematic wedding films to compelling brand visuals, we transform raw footage into meaningful stories through creative editing, stunning visuals, and immersive sound.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto"
        >
          <Link
            to="/portfolio"
            className="glass-btn-primary w-full sm:w-auto text-base !py-3.5 !px-8 shadow-glow-accent group"
          >
            <span>EXPLORE MY WORK</span>
            <Film className="w-4 h-4 ml-1 transition-transform group-hover:scale-110" />
          </Link>

          <Link
            to="/contact"
            className="glass-btn-secondary w-full sm:w-auto text-base !py-3.5 !px-8 group"
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
          className="mt-16 w-full max-w-4xl p-4 sm:p-5 rounded-2xl glass-card flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-left border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">7+ Years</div>
              <div className="text-xs text-neutral-400">Post-Production Craft</div>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Unlisted 4K</div>
              <div className="text-xs text-neutral-400">YouTube Private Client Vaults</div>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/10" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight">Turnkey ELT</div>
              <div className="text-xs text-neutral-400">Pacing • Color • Sound • VFX</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

