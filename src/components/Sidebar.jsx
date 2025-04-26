import React from 'react';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';

function Sidebar({ onCreateClick, cardCount }) {
  return (
    <nav className="w-64 bg-nav-bg backdrop-blur-sm border-r border-white/10 p-4">
      <div className="flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-8">Flashcards</h1>
        
        <div className="space-y-2">
          <button
            onClick={onCreateClick}
            className="nav-item w-full"
          >
            <PlusIcon className="w-5 h-5" />
            Create New Card
          </button>
          
          <div className="nav-item">
            <BookOpenIcon className="w-5 h-5" />
            <span>Cards: {cardCount}</span>
          </div>
        </div>

        <div className="mt-auto text-sm text-white/60">
          <p>Press Space to flip cards</p>
          <p>Use ← → arrows to navigate</p>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar; 