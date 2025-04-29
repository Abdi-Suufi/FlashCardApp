import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrashIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

function FlashCard({ card, onDelete, onNext, onPrevious, total, current }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        onNext();
      } else if (e.code === 'ArrowLeft') {
        onPrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onPrevious, setIsFlipped]);

  return (
    <div className="relative">
      <div 
        className={`card relative w-full aspect-[3/2] cursor-pointer perspective-1000 ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(prev => !prev)}
      >
        <div className="card-front p-6">
          <div className="absolute top-4 right-4 flex items-center gap-2 opacity-60">
            <span>{current} / {total}</span>
          </div>
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-center">{card.question}</h2>
          </div>
        </div>
        
        <div className="card-back p-6">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-center">{card.answer}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={onDelete}
          className="btn text-red-400 hover:text-red-300"
        >
          <TrashIcon className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          <button onClick={onPrevious} className="btn">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button onClick={onNext} className="btn">
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashCard;