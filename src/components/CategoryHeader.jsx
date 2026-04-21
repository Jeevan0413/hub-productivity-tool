import React from 'react';
import { Plus, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryHeader({ category }) {
  if (!category) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            {category.icon && <category.icon className="text-primary-500" size={32} />}
            {category.name}
          </h2>
          {category.description && (
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
              {category.description}
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline ml-2 text-sm font-medium">Read More</a>
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-dark-800/50 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors w-full sm:w-auto">
            <Bell size={18} />
            <span>Subscribe</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
            <Plus size={18} />
            <span>Submit Tool</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
