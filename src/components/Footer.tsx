import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUp, Mail, MapPin, MessageSquare, Instagram, Youtube, Facebook } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { socialLinks } from '../data/socialLinks';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#0D1516] overflow-hidden">
      {/* Ambient background glows (Orchid & Emerald) */}
      <div className="ambient-glow bg-[#BF54A3]/15 w-96 h-96 -bottom-48 -left-24" />
      <div className="ambient-glow bg-[#107361]/15 w-96 h-96 -bottom-48 -right-24" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 focus:outline-none group">
              <img
                src={siteConfig.logoPath}
                alt={siteConfig.brandName}
                className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider text-white group-hover:text-[#BF54A3] transition-colors leading-tight">
                  ORCHID <span className="font-light text-[#BF54A3]">CREATIONS</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#107361] font-mono font-semibold">
                  GIVING WINGS TO YOUR STORIES • EST. {siteConfig.establishedYear}
                </span>
              </div>
            </Link>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Transforming raw moments into cinematic stories. Founded by {siteConfig.founderName}, we craft compelling wedding films, music videos, and commercial post-production with precision and emotion.
            </p>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-[#BF54A3] shrink-0" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white/90 font-semibold font-mono">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-[#BF54A3] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white/90 font-semibold font-mono">
              Expertise
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link to="/portfolio" className="hover:text-[#BF54A3] transition-colors">
                  Bengali Wedding Films
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#BF54A3] transition-colors">
                  Cinematic Teasers &amp; Highlights
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#BF54A3] transition-colors">
                  DaVinci Color Grading
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#BF54A3] transition-colors">
                  2D/3D Motion Graphics
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#BF54A3] transition-colors">
                  Brand Reels &amp; Shorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white/90 font-semibold font-mono">
              Connect
            </h4>
            <p className="text-xs text-neutral-400">
              Available for project discussions, footage review, and custom quotations.
            </p>

            <div className="flex items-center gap-2.5 flex-wrap pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#BF54A3]/25 border border-white/10 hover:border-[#BF54A3]/40 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#BF54A3] hover:text-[#BF54A3]/80"
              >
                <span>Request Project Proposal</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 Orchid Creations. All Rights Reserved. Crafted for Sourav Roy.</p>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-neutral-400">
              EST. {siteConfig.establishedYear} • {siteConfig.yearsOfExperience} Industry Experience
            </span>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BF54A3]"
              aria-label="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

