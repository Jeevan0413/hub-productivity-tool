import React from 'react';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { Layers, Wrench, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-6 flex items-center gap-4 hover:-translate-y-1"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${colorClass}`}>
      <Icon size={28} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
    </div>
  </motion.div>
);

export default function DashboardStats() {
  const totalCategories = categories.length - 2; // excluding dashboard and recent
  const totalTools = tools.length;
  
  // Calculate most populated category to act as "Most Popular"
  const categoryCounts = tools.reduce((acc, tool) => {
    acc[tool.categoryId] = (acc[tool.categoryId] || 0) + 1;
    return acc;
  }, {});

  const popularCategoryId = Object.keys(categoryCounts).reduce((a, b) => 
    categoryCounts[a] > categoryCounts[b] ? a : b
  );
  const popularCategory = categories.find(c => c.id === popularCategoryId)?.name || 'N/A';

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-primary-500" size={24} />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Tools" 
          value={totalTools} 
          icon={Wrench} 
          colorClass="bg-gradient-to-tr from-blue-600 to-primary-400"
          delay={0.1}
        />
        <StatCard 
          title="Categories" 
          value={totalCategories} 
          icon={Layers} 
          colorClass="bg-gradient-to-tr from-purple-600 to-purple-400"
          delay={0.2}
        />
        <StatCard 
          title="Top Category" 
          value={popularCategory} 
          icon={TrendingUp} 
          colorClass="bg-gradient-to-tr from-emerald-600 to-emerald-400"
          delay={0.3}
        />
      </div>
    </div>
  );
}
