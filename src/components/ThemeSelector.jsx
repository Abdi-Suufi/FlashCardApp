import React, { useState, useRef, useEffect } from 'react';
import { useTheme, themes } from '../context/ThemeContext';
import { SwatchIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeChange = (themeKey) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-item w-full flex justify-between"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <SwatchIcon className="w-5 h-5" />
          <span className="ml-2">Theme: {themes[theme].name}</span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full bg-nav-bg backdrop-blur-sm rounded-lg border border-white/10 shadow-lg overflow-hidden z-10">
          {Object.keys(themes).map((themeKey) => (
            <button
              key={themeKey}
              onClick={() => handleThemeChange(themeKey)}
              className={`px-4 py-2 w-full text-left transition-colors duration-200 hover:bg-white/10 flex items-center gap-2 ${
                theme === themeKey ? 'bg-white/20' : ''
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${themes[themeKey].background.replace('bg-gradient-to-br', 'bg')}`} />
              {themes[themeKey].name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;