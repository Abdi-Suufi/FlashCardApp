import React, { createContext, useState, useContext, useEffect } from 'react';

// Available themes
export const themes = {
  dark: {
    name: 'Dark',
    background: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    navBg: 'rgba(255, 255, 255, 0.05)',
    text: 'text-white',
    border: 'border-white/10',
    buttonHighlight: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
  },
  light: {
    name: 'Light',
    background: 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100',
    cardBg: 'rgba(0, 0, 0, 0.03)',
    navBg: 'rgba(0, 0, 0, 0.02)',
    text: 'text-gray-800',
    border: 'border-black/10',
    buttonHighlight: 'from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
  },
  sunset: {
    name: 'Sunset',
    background: 'bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    navBg: 'rgba(255, 255, 255, 0.05)',
    text: 'text-white',
    border: 'border-white/15',
    buttonHighlight: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
  },
  mint: {
    name: 'Mint',
    background: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
    cardBg: 'rgba(255, 255, 255, 0.12)',
    navBg: 'rgba(255, 255, 255, 0.04)',
    text: 'text-white',
    border: 'border-white/10',
    buttonHighlight: 'from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700',
  },
  monochrome: {
    name: 'Monochrome',
    background: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    navBg: 'rgba(255, 255, 255, 0.03)',
    text: 'text-gray-100',
    border: 'border-gray-700',
    buttonHighlight: 'from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900',
  }
};

// Create the context
const ThemeContext = createContext(null);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('flashcard-theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'dark';
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('flashcard-theme', theme);
    
    // Update CSS variables for the theme
    const root = document.documentElement;
    root.style.setProperty('--card-bg', themes[theme].cardBg);
    root.style.setProperty('--nav-bg', themes[theme].navBg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};