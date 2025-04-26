import React from 'react';
import { MinusIcon, XMarkIcon } from '@heroicons/react/24/outline';

function WindowControls() {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-2 p-4">
      <button
        onClick={() => window.electron.minimizeWindow()}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500/20 hover:text-blue-300 transition-colors duration-200"
        title="Minimize"
      >
        <MinusIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => window.electron.closeWindow()}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors duration-200"
        title="Close"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

export default WindowControls; 