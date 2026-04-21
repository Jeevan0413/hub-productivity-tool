import React from 'react';
import { ExternalLink, Heart, ArrowUpRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function ToolCard({ tool }) {
  const { favorites, toggleFavorite, addRecentlyViewed } = useAppContext();
  const isFavorite = favorites.includes(tool.id);

  const handleLinkClick = () => {
    addRecentlyViewed(tool.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 group flex flex-col h-full relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-sm flex-shrink-0">
          <img src={tool.logoUrl} alt={`${tool.name} logo`} className="w-full h-full object-cover" />
        </div>
        <button 
          onClick={() => toggleFavorite(tool.id)}
          className={`p-2 rounded-full transition-all duration-300 ${
            isFavorite 
              ? 'text-red-500 bg-red-50 dark:bg-red-500/10' 
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/5'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'scale-110' : ''} />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
          Productivity
        </span>
        <a 
          href={tool.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          className="flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <span>Visit site</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
}
