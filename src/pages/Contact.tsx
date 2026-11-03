import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, MapPin, Phone, Sparkles, Clock, Calendar } from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { SocialLinks } from '../components/SocialLinks';
import { siteConfig } from '../data/siteConfig';
import { getWhatsAppLink } from '../data/socialLinks';

export const Contact: React.FC = () => {
  const directWhatsApp = getWhatsAppLink(
    'Hello Orchid Creation! I am interested in your video editing services. I would like to discuss a project.'
  );

  return (
    <div className="relative pt-32 pb-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-[#BF54A3]/15 w-[600px] h-[600px] top-24 left-1/3 -translate-x-1/2" />
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
            START A COLLABORATION
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F0F2F2] tracking-tight"
          >
            GET IN{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361]">
              TOUCH
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed"
          >
            Have raw footage ready for editing, an upcoming wedding film, or a brand visual campaign? Send us a message or chat with us directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact & Social Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Studio Headquarters
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Location
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {siteConfig.location}
                    </div>
                    <div className="text-xs text-neutral-400">Available for remote workflows worldwide</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#107361]/10 border border-[#107361]/25 text-[#107361] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${siteConfig.contactEmail}`}
                      className="text-sm font-semibold text-white hover:text-[#BF54A3] transition-colors mt-0.5 block"
                    >
                      {siteConfig.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#107361]/15 border border-[#107361]/30 text-[#107361] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Direct WhatsApp
                    </div>
                    <a
                      href={directWhatsApp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#107361] hover:text-[#107361]/80 transition-colors mt-0.5 block"
                    >
                      Start Instant Chat on WhatsApp →
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Direct CTA Button */}
              <div className="pt-2">
                <a
                  href={directWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full glass-btn-primary !py-3.5 text-sm font-semibold shadow-glow-accent justify-center flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP NOW</span>
                </a>
              </div>
            </div>

            {/* Social Media Channels */}
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-neutral-400 mb-4 font-semibold">
                Official Studio Channels
              </h4>
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

