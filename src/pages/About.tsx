import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, Film, Award, Heart, CheckCircle2 } from 'lucide-react';
import { AboutSection } from '../components/AboutSection';
import { CTASection } from '../components/CTASection';
import { siteConfig } from '../data/siteConfig';

export const About: React.FC = () => {
  const values = [
    {
      title: 'Pacing & Narrative Rhythm',
      desc: 'Editing is visual music. Every transition and cut responds to emotional tone, dialogue cadence, and acoustic energy.',
      icon: Film,
    },
    {
      title: 'Authentic Color Science',
      desc: 'We protect natural skin tones while infusing richness, cinematic depth, and accurate color temperature.',
      icon: Sparkles,
    },
    {
      title: 'Acoustic Immersion',
      desc: 'Sound accounts for 50% of the cinematic impact. We mix dialogues, ambiance, risers, and music with spatial clarity.',
      icon: Clock,
    },
    {
      title: 'Client Collaboration',
      desc: 'Your vision leads the process. We provide preview approvals and transparent communication throughout post-production.',
      icon: Heart,
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'Inception of Orchid Creations',
      desc: 'Founded by Sourav Roy in West Bengal, India, dedicated to giving wings to visual stories through boutique wedding highlights and cinematic post-production.',
    },
    {
      year: '2023',
      title: 'Expanded Post-Production Pipeline',
      desc: 'Adopted dedicated DaVinci Resolve color suites and professional acoustic mixing tools for broadcast-quality deliverables.',
    },
    {
      year: '2024',
      title: 'Commercial & Multi-Day Weddings',
      desc: 'Partnered with regional cinematographers across India to edit extensive multi-camera traditional ceremonies and brand reels.',
    },
    {
      year: '2026',
      title: 'Automated Digital Studio Vault',
      desc: 'Launched modernized cloud-synchronized portfolio platform, serving clients worldwide with unlisted 4K deliverables.',
    },
  ];

  return (
    <div className="relative pt-32 pb-20 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-[#BF54A3]/15 w-[600px] h-[600px] top-24 left-1/4 -translate-x-1/2" />
      <div className="ambient-glow bg-[#107361]/15 w-[450px] h-[450px] top-1/2 -right-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            THE STORY &amp; THE VISION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F0F2F2] tracking-tight"
          >
            ABOUT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361]">
              ORCHID CREATIONS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed"
          >
            A dedicated post-production studio transforming raw moments into cinematic stories through creative video editing, color grading, VFX, and sound design.
          </motion.p>
        </div>

        {/* Primary Founder & Studio Bio Section */}
        <AboutSection isFullPage={true} />

        {/* Studio Philosophy & Pillars */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              OUR CRAFT PHILOSOPHY
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Four non-negotiable principles that shape every timeline we construct.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#BF54A3]/10 text-[#BF54A3] border border-[#BF54A3]/25 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{v.title}</h4>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Journey Timeline */}
        <div className="mt-28 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              STUDIO EVOLUTION
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              The continuous pursuit of cinematic refinement since 2021.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className="relative p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
              >
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#BF54A3] to-[#107361] font-mono mb-2">
                  {m.year}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{m.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

