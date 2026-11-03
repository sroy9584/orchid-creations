import React from 'react';
import { motion } from 'framer-motion';
import { PlaylistCategory } from '../types/portfolio';
import { Sparkles } from 'lucide-react';

interface PortfolioFiltersProps {
  categories: PlaylistCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  totalCount: number;
}

export const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  totalCount,
}) => {
  return (
    <div className="w-full">
      <div
        className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar sm:flex-wrap sm:justify-center px-4 sm:px-0 touch-pan-x"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* 'All Projects' Pill */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
            selectedCategory === 'all'
              ? 'glass-pill active text-white shadow-glow-accent'
              : 'glass-pill text-neutral-400 hover:text-white'
          }`}
        >
          <span>All Projects</span>
          <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-white/10 text-neutral-300">
            {totalCount}
          </span>
          {selectedCategory === 'all' && (
            <motion.div
              layoutId="activeFilterIndicator"
              className="absolute inset-0 rounded-full border border-[#BF54A3]/60 pointer-events-none"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            />
          )}
        </button>

        {/* Dynamic Category Pills */}
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                isSelected
                  ? 'glass-pill active text-white shadow-glow-accent'
                  : 'glass-pill text-neutral-400 hover:text-white'
              }`}
            >
              <span>{cat.title}</span>
              {isSelected && (
                <motion.div
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 rounded-full border border-[#BF54A3]/60 pointer-events-none"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

