import React from 'react';
import { motion } from 'framer-motion';
import { Tag, ShieldCheck, AlertCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { pricingPackages, pricingTerms } from '../data/pricingConfig';
import { getWhatsAppLink } from '../data/socialLinks';
import { CTASection } from '../components/CTASection';

export const Pricing: React.FC = () => {
  const customQuoteWhatsApp = getWhatsAppLink(
    'Hello Sourav! I have a custom video editing project requirement (custom footage volume/workflow). I would like to request a bespoke quote.'
  );

  return (
    <div className="relative pt-32 pb-20 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow bg-[#BF54A3]/15 w-[600px] h-[600px] top-24 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow bg-[#107361]/15 w-[450px] h-[450px] top-1/2 -left-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BF54A3]/10 border border-[#BF54A3]/25 text-[#BF54A3] text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Tag className="w-3.5 h-3.5" />
            TRANSPARENT POST-PRODUCTION RATES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F0F2F2] tracking-tight"
          >
            EDITING{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0F2F2] via-[#BF54A3] to-[#107361]">
              PACKAGES (₹)
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed"
          >
            Clear, honest pricing for cinematic wedding films, festive milestone celebrations, and high-retention brand reels.
          </motion.p>
        </div>

        {/* Pricing Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPackages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Custom Quote Card */}
        <div className="mt-16 glass-card rounded-3xl p-8 sm:p-10 border border-[#BF54A3]/30 bg-gradient-to-r from-[#592D4D]/30 to-[#192526]/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need a Custom Project Quotation?
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {pricingTerms.customQuotePrompt}
            </p>
          </div>

          <a
            href={customQuoteWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-primary shrink-0 text-sm font-semibold !py-3.5 !px-8 shadow-glow-accent inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>REQUEST BESPOKE QUOTE</span>
          </a>
        </div>

        {/* Important Terms & Policy Notes */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#BF54A3] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#BF54A3] font-semibold">
                Payment Milestones
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {pricingTerms.advanceRequirement}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#107361] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#107361] font-semibold">
                Scope &amp; Complexity Note
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {pricingTerms.variationDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
};

