import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-[#BF54A3]/20 w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-white/15 shadow-glow-accent relative overflow-hidden">
          {/* Subtle decorative ring */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-[#BF54A3]/20 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-[#107361]/20 pointer-events-none" />

          {/* Sparkle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            LET'S CREATE TOGETHER
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#F0F2F2] tracking-tight max-w-2xl mx-auto leading-tight">
            HAVE A PROJECT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361]">
              IN MIND?
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Let's turn your ideas into something memorable. Send us your footage overview, event date, or creative brief.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="glass-btn-primary w-full sm:w-auto text-base !py-3.5 !px-8 shadow-glow-accent group"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/pricing"
              className="glass-btn-secondary w-full sm:w-auto text-base !py-3.5 !px-8"
            >
              <span>EXPLORE PACKAGES</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

