import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Facebook, MessageSquare, Mail, ArrowUpRight } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

export const SocialLinks: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-pink-400" />;
      case 'youtube':
        return <Youtube className="w-5 h-5 text-red-400" />;
      case 'facebook':
        return <Facebook className="w-5 h-5 text-blue-400" />;
      case 'whatsapp':
        return <MessageSquare className="w-5 h-5 text-[#107361]" />;
      default:
        return <Mail className="w-5 h-5 text-[#BF54A3]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {socialLinks.map((item) => (
        <motion.a
          key={item.platform}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="glass-card rounded-2xl p-4 sm:p-5 flex items-center justify-between group border border-white/10 hover:border-[#BF54A3]/40"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              {getIcon(item.platform)}
            </div>
            <div>
              <div className="text-sm font-bold text-white group-hover:text-[#BF54A3] transition-colors">
                {item.title}
              </div>
              <div className="text-xs text-neutral-400 mt-0.5 truncate max-w-[180px] sm:max-w-[200px]">
                {item.displayHandle}
              </div>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-[#BF54A3]/30 transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.a>
      ))}
    </div>
  );
};

