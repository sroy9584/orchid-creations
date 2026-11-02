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
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  videos,
  onPlay,
  getCategoryTitle,
  hasMore = false,
  onLoadMore,
  allFilteredCount = 0,
  searchQuery = '',
  onClearSearch,
}) => {
  if (videos.length === 0) {
    return (
      <div className="py-16 text-center glass-card rounded-3xl p-8 max-w-xl mx-auto my-12 border border-white/10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#BF54A3]">
          <Film className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-white">No Videos Found</h3>
        {searchQuery ? (
          <div className="mt-2">
            <p className="text-sm text-neutral-400">
              No videos found matching &ldquo;<span className="text-white font-medium">{searchQuery}</span>&rdquo;. Try searching by another title or YouTube video ID.
            </p>
            {onClearSearch && (
              <button
                type="button"
                onClick={onClearSearch}
                className="mt-4 px-5 py-2 rounded-full glass-btn-primary text-xs font-semibold"
              >
                Clear Search & Show All
              </button>
            )}
          </div>
        ) : (
          <p className="mt-2 text-sm text-neutral-400">
            There are currently no videos in this category.
          </p>
        )}
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
            <ArrowDown className="w-4 h-4 text-[#BF54A3]" />
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

