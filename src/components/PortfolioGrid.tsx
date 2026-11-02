import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoCard } from './VideoCard';
import { PortfolioVideo } from '../types/portfolio';
import { Film, ArrowDown } from 'lucide-react';

interface PortfolioGridProps {
  videos: PortfolioVideo[];
  onPlay: (video: PortfolioVideo) => void;
  getCategoryTitle: (catId: string) => string;
  hasMore?: boolean;
  onLoadMore?: () => void;
  allFilteredCount?: number;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  videos,
  onPlay,
  getCategoryTitle,
  hasMore = false,
  onLoadMore,
  allFilteredCount = 0,
}) => {
  if (videos.length === 0) {
    return (
      <div className="py-20 text-center glass-card rounded-3xl p-8 max-w-xl mx-auto my-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white">No Videos Found</h3>
        <p className="mt-2 text-sm text-neutral-400">
          There are currently no videos in this category. They will appear here once synchronized with your YouTube playlist.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Responsive Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              categoryTitle={getCategoryTitle(video.categoryId)}
              onPlay={onPlay}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLoadMore}
            className="glass-btn-secondary px-8 py-3.5 text-sm font-semibold tracking-wide"
          >
            <ArrowDown className="w-4 h-4 text-purple-400" />
            <span>LOAD MORE PROJECTS</span>
            <span className="text-xs text-neutral-400">
              ({videos.length} of {allFilteredCount})
            </span>
          </motion.button>
        </div>
      )}
    </div>
  );
};

