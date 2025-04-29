import React, { useState } from 'react';
import { PlusIcon, BookOpenIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import CategoryManager from './CategoryManager';
import ThemeSelector from './ThemeSelector';

function Sidebar({ onCreateClick, cardCount, onSelectCategory, activeCategory }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <nav className={`${isMinimized ? 'w-16' : 'w-64'} bg-nav-bg backdrop-blur-sm border-r border-white/10 p-4 transition-all duration-300 relative flex flex-col h-full`}>
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-200"
      >
        <ChevronLeftIcon className={`w-5 h-5 ${isMinimized ? 'rotate-180' : ''}`} />
      </button>

      <h1 className={`text-2xl font-bold mb-6 ${isMinimized ? 'hidden' : ''}`}>Flashcards</h1>
      
      {!isMinimized && (
        <CategoryManager 
          onSelectCategory={onSelectCategory}
          activeCategory={activeCategory}
        />
      )}
      
      <div className="space-y-2">
        <button
          onClick={onCreateClick}
          className="nav-item w-full"
        >
          <PlusIcon className="w-5 h-5" />
          {!isMinimized && <span className="ml-2">Create New Card</span>}
        </button>
        
        <div className="nav-item">
          <BookOpenIcon className="w-5 h-5" />
          {!isMinimized && <span className="ml-2">Cards: {cardCount}</span>}
        </div>

        {!isMinimized && (
          <ThemeSelector />
        )}
      </div>

      <div className={`mt-auto text-sm text-white/60 ${isMinimized ? 'hidden' : ''}`}>
        <p>Press Space to flip cards</p>
        <p>Use ← → arrows to navigate</p>
      </div>
    </nav>
  );
}

export default Sidebar;