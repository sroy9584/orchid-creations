import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServicesGrid } from '../components/ServicesGrid';
import { CTASection } from '../components/CTASection';

export const Services: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-purple-600/15 w-[550px] h-[550px] top-24 left-1/3 -translate-x-1/2" />
      <div className="ambient-glow bg-sky-500/10 w-[450px] h-[450px] top-1/2 -right-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            END-TO-END POST-PRODUCTION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            OUR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-sky-300">
              SERVICES
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed"
          >
            Specialized video editing, multi-camera assembly, DaVinci Resolve color grading, 2D/3D motion graphics, and audio mastering tailored to elevate your footage.
          </motion.p>
        </div>

        {/* Complete 18 Services Grid */}
        <ServicesGrid previewOnly={false} />

        {/* Pricing link banner */}
        <div className="mt-16 text-center glass-card rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-white/10">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Looking for Standard Video Editing Packages?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            We provide transparent rates for Bengali weddings, pre-wedding films, rice ceremonies, and social brand reels.
          </p>
          <div className="mt-5">
            <Link
              to="/pricing"
              className="glass-btn-primary text-sm font-semibold !py-3 !px-7 shadow-glow-accent group inline-flex"
            >
              <span>VIEW PRICING PACKAGES (₹)</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

