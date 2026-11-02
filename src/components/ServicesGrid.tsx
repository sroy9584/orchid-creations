import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Sparkles,
  HeartHandshake,
  Gem,
  Gift,
  Music,
  Clapperboard,
  Video,
  Briefcase,
  TrendingUp,
  Smartphone,
  Image,
  Palette,
  SunMedium,
  Layers,
  Boxes,
  Volume2,
  Sliders,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { ServiceItem } from '../types/services';
import { servicesConfig } from '../data/servicesConfig';

// Map icon name strings to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Film,
  Sparkles,
  HeartHandshake,
  Gem,
  Gift,
  Music,
  Clapperboard,
  Video,
  Briefcase,
  TrendingUp,
  Smartphone,
  Image,
  Palette,
  SunMedium,
  Layers,
  Boxes,
  Volume2,
  Sliders,
};

interface ServicesGridProps {
  previewOnly?: boolean;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ previewOnly = false }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const services = previewOnly
    ? servicesConfig.filter((s) => s.featuredInHome)
    : servicesConfig;

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'wedding', label: 'Wedding & Rituals' },
    { id: 'cinematic', label: 'Films & Music' },
    { id: 'commercial', label: 'Commercial & Reels' },
    { id: 'design-audio', label: 'Color, Sound & VFX' },
  ];

  const filteredServices = activeTab === 'all'
    ? services
    : services.filter((s) => s.category === activeTab);

  return (
    <div className="w-full">
      {/* Category Tabs (Full Services page only) */}
      {!previewOnly && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-8 pt-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === cat.id
                  ? 'glass-pill active text-white shadow-glow-accent'
                  : 'glass-pill text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Services Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Film;

            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:border-[#BF54A3]/30"
              >
                <div>
                  {/* Icon & Category Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#BF54A3]/10 border border-[#BF54A3]/25 flex items-center justify-center text-[#BF54A3] group-hover:scale-110 group-hover:bg-[#BF54A3]/20 group-hover:text-[#F0F2F2] transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 border border-white/10">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#BF54A3] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Deliverables / Key Highlights */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 font-mono mb-2">
                      Key Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#107361] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

