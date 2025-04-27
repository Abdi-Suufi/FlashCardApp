import React from 'react';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';

function TitleBar() {
  return (
    <div 
      className="h-8 w-full fixed top-0 left-0 right-0 flex justify-between items-center bg-transparent backdrop-blur-sm"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div className="w-24">
        {/* Left spacer */}
      </div>
      <div className="text-sm font-medium">Flashcards</div>
      <div 
        className="flex items-center gap-2 pr-2 w-24 justify-end"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <button
          onClick={() => window.electron.minimizeWindow()}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-colors duration-200"
          title="Minimize"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => window.electron.closeWindow()}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
          title="Close"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TitleBar;