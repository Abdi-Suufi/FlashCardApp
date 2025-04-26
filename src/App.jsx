import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import FlashCard from './components/FlashCard';
import CreateCard from './components/CreateCard';
import WindowControls from './components/WindowControls';

function App() {
  const [cards, setCards] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const loadedCards = await window.electron.getCards();
    setCards(loadedCards);
  };

  const handleCreateCard = async (card) => {
    await window.electron.saveCard({
      ...card,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    });
    setShowCreate(false);
    loadCards();
  };

  const handleDeleteCard = async (cardId) => {
    await window.electron.deleteCard(cardId);
    loadCards();
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const previousCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flex h-screen relative">
      <WindowControls />
      <Sidebar 
        onCreateClick={() => setShowCreate(true)}
        cardCount={cards.length}
      />
      
      <main className="flex-1 p-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showCreate ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-lg"
            >
              <CreateCard
                onSubmit={handleCreateCard}
                onCancel={() => setShowCreate(false)}
              />
            </motion.div>
          ) : cards.length > 0 ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg"
            >
              <FlashCard
                card={cards[currentCardIndex]}
                onDelete={() => handleDeleteCard(cards[currentCardIndex].id)}
                onNext={nextCard}
                onPrevious={previousCard}
                total={cards.length}
                current={currentCardIndex + 1}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold mb-4">No flashcards yet</h2>
              <button
                onClick={() => setShowCreate(true)}
                className="btn btn-primary"
              >
                Create your first card
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App; 