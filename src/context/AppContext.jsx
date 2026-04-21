import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');
  const [favorites, setLocalStorageFavorites] = useLocalStorage('app-favorites', []);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('app-recently-viewed', []);

  // Ensure favorites is an array (fallback if local storage is malformed)
  const favoritesArray = Array.isArray(favorites) ? favorites : [];

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleFavorite = (toolId) => {
    setLocalStorageFavorites((prev) => {
      const currentFavs = Array.isArray(prev) ? prev : [];
      if (currentFavs.includes(toolId)) {
        return currentFavs.filter((id) => id !== toolId);
      }
      return [...currentFavs, toolId];
    });
  };

  const addRecentlyViewed = (toolId) => {
    setRecentlyViewed((prev) => {
      const currentViews = Array.isArray(prev) ? prev : [];
      const filtered = currentViews.filter((id) => id !== toolId);
      return [toolId, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const value = {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    theme,
    toggleTheme,
    favorites: favoritesArray,
    toggleFavorite,
    recentlyViewed: Array.isArray(recentlyViewed) ? recentlyViewed : [],
    addRecentlyViewed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
