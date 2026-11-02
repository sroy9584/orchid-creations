import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll position to enhance glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#0D1516]/90 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'py-5 bg-[#0D1516]/45 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-lg p-1"
          >
            <div className="relative h-10 w-auto flex items-center">
              <img
                src={siteConfig.logoPath}
                alt={`${siteConfig.brandName} Official Logo`}
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if SVG fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Fallback stylized text if image missing */}
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wider text-white group-hover:text-[#BF54A3] transition-colors">
                  ORCHID <span className="font-light text-[#BF54A3]">CREATIONS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#107361] font-mono -mt-1 font-semibold">
                  POST-PRODUCTION STUDIO
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-white/10 border border-[#BF54A3]/30 shadow-sm"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className="glass-btn-primary !py-2 !px-5 text-sm font-semibold tracking-wide"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/contact"
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#BF54A3] text-white border border-[#BF54A3]/40"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BF54A3]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-white/10 bg-[#0D1516]/95 backdrop-blur-2xl overflow-hidden px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#BF54A3]/20 text-white border border-[#BF54A3]/40 font-semibold'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-neutral-500 font-mono">0{navLinks.indexOf(link) + 1}</span>
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <Link
                  to="/contact"
                  className="glass-btn-primary w-full text-center justify-center py-3"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

