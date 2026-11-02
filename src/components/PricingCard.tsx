import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageSquare, Sparkles } from 'lucide-react';
import { PricingPackage } from '../types/pricing';
import { getWhatsAppLink } from '../data/socialLinks';

interface PricingCardProps {
  pkg: PricingPackage;
}

export const PricingCard: React.FC<PricingCardProps> = ({ pkg }) => {
  const whatsappHref = getWhatsAppLink(pkg.whatsappMessage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        pkg.popular
          ? 'glass-card border-purple-400/40 shadow-glow-accent bg-purple-950/20'
          : 'glass-card'
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          MOST POPULAR
        </div>
      )}

      <div>
        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {pkg.title}
        </h3>
        {pkg.subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-neutral-400 min-h-[40px] leading-relaxed">
            {pkg.subtitle}
          </p>
        )}

        {/* Price Figure */}
        <div className="mt-6 mb-6 pb-6 border-b border-white/10">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-purple-300">
              {pkg.price}
            </span>
          </div>
          {pkg.priceNote && (
            <span className="text-xs text-purple-300/80 font-medium block mt-1">
              {pkg.priceNote}
            </span>
          )}
        </div>

        {/* Deliverables Box */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 font-semibold block mb-2">
            Deliverables Included:
          </span>
          <ul className="space-y-1.5">
            {pkg.deliverables.map((item, i) => (
              <li key={i} className="text-xs sm:text-sm font-medium text-white/90 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2.5 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
            Features &amp; Workflow:
          </span>
          {pkg.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA Action */}
      <div className="pt-4 border-t border-white/10">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3.5 px-6 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            pkg.popular
              ? 'glass-btn-primary shadow-glow-accent'
              : 'glass-btn-secondary hover:border-purple-400/40'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>BOOK THIS PACKAGE</span>
        </a>
      </div>
    </motion.div>
  );
};

