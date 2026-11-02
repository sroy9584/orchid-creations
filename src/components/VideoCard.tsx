import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { PortfolioVideo } from '../types/portfolio';

interface VideoCardProps {
  video: PortfolioVideo;
  categoryTitle?: string;
  onPlay: (video: PortfolioVideo) => void;
  priority?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, categoryTitle, onPlay }) => {
  // Graceful fallback from maxresdefault to hqdefault if 404
  const [thumbSrc, setThumbSrc] = useState<string>(
    video.thumbnailUrl || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
  );

  const handleImageError = () => {
    // Fallback to high-quality thumbnail if maxres is unavailable on YouTube
    if (!thumbSrc.includes('hqdefault')) {
      setThumbSrc(`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden glass-card flex flex-col cursor-pointer focus-within:ring-2 focus-within:ring-purple-400"
      onClick={() => onPlay(video)}
    >
      {/* Thumbnail Aspect Ratio 16:9 Frame */}
      <div className="relative w-full aspect-video overflow-hidden bg-neutral-900/80">
        <img
          src={thumbSrc}
          alt={video.title}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-black/25 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10 shadow-sm">
            {categoryTitle || video.categoryId}
          </span>
          {video.featured && (
            <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-500/80 backdrop-blur-md text-white border border-purple-300/30 shadow-glow-accent">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Play Icon Trigger Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-[0_8px_25px_rgba(0,0,0,0.5)] group-hover:bg-purple-600/90 group-hover:border-purple-300 group-hover:shadow-[0_0_25px_rgba(167,139,250,0.6)] transition-all duration-300"
          >
            <Play className="w-6 h-6 fill-current ml-0.5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white/95 group-hover:text-purple-300 transition-colors line-clamp-1">
            {video.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 text-purple-300/80 group-hover:text-purple-200 font-medium">
            Watch Film
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
          <span className="text-[11px] font-mono text-neutral-500">Unlisted YouTube</span>
        </div>
      </div>
    </motion.div>
  );
};

