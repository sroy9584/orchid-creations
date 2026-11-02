import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { VideoCard } from './VideoCard';
import { PortfolioVideo } from '../types/portfolio';

interface FeaturedWorksProps {
  videos: PortfolioVideo[];
  onPlay: (video: PortfolioVideo) => void;
  getCategoryTitle: (catId: string) => string;
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  videos,
  onPlay,
  getCategoryTitle,
}) => {
  // Take up to 6 featured videos
  const displayVideos = videos.slice(0, 6);

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden">
      {/* Ambient background light (Orchid & Emerald) */}
      <div className="ambient-glow bg-[#BF54A3]/15 w-[550px] h-[550px] top-1/2 left-0 -translate-y-1/2" />
      <div className="ambient-glow bg-[#107361]/15 w-[450px] h-[450px] top-1/4 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF54A3]/15 border border-[#BF54A3]/30 text-[#D977BF] text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3 h-3" />
              CURATED SHOWCASE
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              FEATURED{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BF54A3] via-[#D977BF] to-[#107361]">
                PROJECTS
              </span>
            </h2>
            <p className="mt-2 text-neutral-400 max-w-xl text-xs sm:text-sm">
              Hand-picked visual highlights featuring heartfelt wedding films, rhythmic music edits, and compelling brand storytelling.
            </p>
          </div>

          <Link
            to="/portfolio"
            className="glass-btn-secondary self-start md:self-auto text-xs sm:text-sm font-semibold tracking-wide group"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Video Cards Grid (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              categoryTitle={getCategoryTitle(video.categoryId)}
              onPlay={onPlay}
            />
          ))}
        </div>

        {/* Bottom CTA to view all */}
        <div className="mt-14 text-center">
          <Link
            to="/portfolio"
            className="glass-btn-primary !px-8 !py-3.5 text-sm font-semibold tracking-wide shadow-glow-accent group"
          >
            <span>DISCOVER FULL PORTFOLIO ARCHIVE</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

