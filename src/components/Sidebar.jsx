import React from 'react';
import { Search, Moon, Sun, MonitorSmartphone } from 'lucide-react';
import { categories } from '../data/categories';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    theme, 
    toggleTheme,
    isMobileMenuOpen,
    closeMobileMenu
  } = useAppContext();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside className={clsx(
        "w-72 h-screen top-0 flex flex-col pt-6 pb-6 px-4 border-r border-slate-200 dark:border-white/10 glass z-50 transition-transform duration-300",
        "fixed md:sticky left-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Brand */}
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 text-white shadow-lg">
              <MonitorSmartphone size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              ToolHub
            </h1>
          </div>
          
          {/* Mobile Close Button */}
          <button 
            onClick={closeMobileMenu}
            className="md:hidden p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tools & categories..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-dark-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all dark:text-white"
        />
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-2">Navigation</h2>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = category.icon;

          return (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                closeMobileMenu();
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative",
                isActive 
                  ? "text-primary-600 dark:text-primary-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 bg-primary-50 dark:bg-primary-500/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <div className="mt-auto pt-6 px-2 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Theme</span>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </aside>
    </>
  );
}
