import React from 'react';

function TitleBar() {
  return (
    <div 
      className="h-8 w-full bg-blue-900/80 fixed top-0 left-0 right-0 cursor-move"
      style={{ WebkitAppRegion: 'drag' }}
    />
  );
}

export default TitleBar; 