import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, MapPin, User, CheckCircle2, Film } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface AboutSectionProps {
  isFullPage?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isFullPage = false }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Founder Photograph & Creative Frame (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          {/* Ambient backlight */}
          <div className="ambient-glow bg-[#BF54A3]/20 w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="relative rounded-3xl overflow-hidden glass-card p-3 border border-white/15 shadow-2xl">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#161922]">
              <img
                src={siteConfig.founderPhotoPath}
                alt={`${siteConfig.founderName} - ${siteConfig.founderRole}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = './assets/images/founder-placeholder.svg';
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-transparent to-transparent opacity-80" />

              {/* Founder Overlay Info */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="text-base font-bold text-white flex items-center justify-between">
                  <span>{siteConfig.founderName}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#BF54A3]/20 text-[#BF54A3] border border-[#BF54A3]/30">
                    Lead Editor
                  </span>
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  Founder &amp; Creative Post-Production Director
                </div>
              </div>
            </div>
          </div>

          {/* Floating Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -bottom-4 right-1 sm:-right-4 sm:-bottom-6 p-3 sm:p-4 rounded-2xl glass-card border-[#BF54A3]/30 shadow-glow-accent bg-[#101219]/90 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#BF54A3]/20 text-[#BF54A3] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white leading-tight">
                  {siteConfig.yearsOfExperience}
                </div>
                <div className="text-[11px] text-neutral-400">Post-Production Craft</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Studio & Founder Story (7 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-4 sm:space-y-5"
        >
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] text-xs font-semibold tracking-wider uppercase">
            <Film className="w-3.5 h-3.5" />
            THE STUDIO BEHIND THE STORIES
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            CRAFTING CINEMATIC STORIES WITH{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF54A3] to-[#107361]">
              PRECISION &amp; PASSION.
            </span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            <p className="text-sm sm:text-base text-white/95 font-medium">
              {siteConfig.aboutText.hero}
            </p>
            {(isFullPage ? siteConfig.aboutText.story : siteConfig.aboutText.story.slice(0, 1)).map((para, i) => (
              <p key={i} className="text-neutral-400">
                {para}
              </p>
            ))}
          </div>

          {/* Quick Studio Bio Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#BF54A3]" />
                <span>Established</span>
              </div>
              <div className="text-base font-bold text-white">{siteConfig.establishedYear}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                <User className="w-3.5 h-3.5 text-[#BF54A3]" />
                <span>Founder</span>
              </div>
              <div className="text-base font-bold text-white">{siteConfig.founderName}</div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#BF54A3]" />
                <span>Base Location</span>
              </div>
              <div className="text-base font-bold text-white">{siteConfig.location}</div>
            </div>
          </div>

          {/* Software & Skills Pills */}
          <div className="pt-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#BF54A3] font-semibold mb-2">
              Industry Standard Software &amp; Suites:
            </div>
            <div className="flex flex-wrap gap-2">
              {siteConfig.skills.software.map((sw) => (
                <span
                  key={sw}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-neutral-300 hover:border-[#BF54A3]/40 hover:text-white transition-colors"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded Disciplines Section (Full About Page Only) */}
      {isFullPage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-16 border-t border-white/10"
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              CORE DISCIPLINES &amp; WORKFLOW
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Every production undergoes our rigorous post-production pipeline: ingest, rough assembly, multi-track audio polishing, cinematic grade, and final high-fidelity master output.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.skills.disciplines.map((disc, idx) => (
              <div
                key={disc}
                className="glass-card rounded-2xl p-5 border border-white/10 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#107361]/15 text-[#107361] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{disc}</h4>
                  <p className="text-xs text-neutral-400 mt-1">
                    Executed according to industry color standards and high bit-rate deliverables.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

