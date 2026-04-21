import React, { useMemo } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { tools } from './data/tools';
import { categories } from './data/categories';
import Sidebar from './components/Sidebar';
import CategoryHeader from './components/CategoryHeader';
import ToolCard from './components/ToolCard';
import DashboardStats from './components/DashboardStats';
import { PackageOpen, Menu, MonitorSmartphone } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function MainContent() {
  const { activeCategory, searchQuery, recentlyViewed, favorites } = useAppContext();

  // Find active category info
  const categoryInfo = categories.find(c => c.id === activeCategory);

  // Filter tools based on category and search
  const filteredTools = useMemo(() => {
    let result = tools;

    // Filter by global search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(lowerQuery) || 
        t.description.toLowerCase().includes(lowerQuery) ||
        categories.find(c => c.id === t.categoryId)?.name.toLowerCase().includes(lowerQuery)
      );
    } else {
      // Filter by category if no search query
      if (activeCategory === 'recent') {
        result = recentlyViewed.map(id => tools.find(t => t.id === id)).filter(Boolean);
      } else if (activeCategory !== 'dashboard') {
        result = result.filter(t => t.categoryId === activeCategory);
      }
    }

    return result;
  }, [activeCategory, searchQuery, recentlyViewed]);

  return (
    <main className="flex-1 overflow-y-auto h-screen bg-transparent p-4 sm:p-6 md:p-10 relative scroll-smooth w-full">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-400/20 dark:bg-primary-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      
      <div className="max-w-6xl mx-auto">
        {!searchQuery && categoryInfo && activeCategory !== 'dashboard' && activeCategory !== 'recent' && (
          <CategoryHeader category={categoryInfo} />
        )}
        
        {!searchQuery && activeCategory === 'recent' && (
          <CategoryHeader category={{ name: 'Recently Viewed', icon: categories.find(c=>c.id==='recent').icon, description: 'Tools you visited recently.' }} />
        )}

        {!searchQuery && activeCategory === 'dashboard' && (
          <DashboardStats />
        )}

        {searchQuery && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Search Results for <span className="text-primary-600 dark:text-primary-400">"{searchQuery}"</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Found {filteredTools.length} tools.</p>
          </div>
        )}

        {/* Tools Grid */}
        {(activeCategory !== 'dashboard' || searchQuery) && filteredTools.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredTools.map(tool => (
                <ToolCard key={`tool-${tool.id}`} tool={tool} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          (activeCategory !== 'dashboard' || searchQuery) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <PackageOpen size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">No tools found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                We couldn't find any tools matching your criteria. Try adjusting your search query.
              </p>
            </div>
          )
        )}

        {/* Show some tools on dashboard anyway */}
        {!searchQuery && activeCategory === 'dashboard' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Featured Tools</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.slice(0, 4).map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function TopNav() {
  const { toggleMobileMenu } = useAppContext();
  
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10 glass sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gradient-to-tr from-primary-600 to-primary-400 text-white shadow-md">
          <MonitorSmartphone size={18} />
        </div>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
          ToolHub
        </h1>
      </div>
      <button 
        onClick={toggleMobileMenu}
        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
      >
        <Menu size={20} />
      </button>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-dark-950 transition-colors duration-500">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <TopNav />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
