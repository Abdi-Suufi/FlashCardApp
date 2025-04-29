import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import FlashCard from './components/FlashCard';
import CreateCard from './components/CreateCard';
import TitleBar from './components/TitleBar';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [cards, setCards] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    loadCategories();
    loadCards();
  }, [activeCategory]);

  const loadCategories = async () => {
    const loadedCategories = await window.electron.getCategories();
    setCategories(loadedCategories);
  };

  const loadCards = async () => {
    try {
      // Pass the activeCategory explicitly (it might have been undefined before)
      const loadedCards = await window.electron.getCards(activeCategory);
      console.log(`Loaded ${loadedCards.length} cards for category: ${activeCategory || 'all'}`);
      setCards(loadedCards);
      setCurrentCardIndex(0); // Reset current card index when category changes
    } catch (error) {
      console.error("Error loading cards:", error);
      setCards([]);
    }
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

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const nextCard = () => {
    if (cards.length > 0) {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const previousCard = () => {
    if (cards.length > 0) {
      setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  const getCategoryName = () => {
    if (!activeCategory) return "All Cards";
    const category = categories.find(c => c.id === activeCategory);
    return category ? category.name : "Unknown Category";
  };

  return (
    <div className={`flex h-screen relative ${currentTheme.background} ${currentTheme.text}`}>
      <TitleBar />
      <Sidebar 
        onCreateClick={() => setShowCreate(true)}
        cardCount={cards.length}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
      />
      
      <main className="flex-1 p-8 flex flex-col items-center justify-center mt-8">
        <h2 className="text-xl font-medium mb-6 text-center">
          {getCategoryName()} ({cards.length} {cards.length === 1 ? 'card' : 'cards'})
        </h2>
        
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
                activeCategory={activeCategory}
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
              <h2 className="text-2xl font-semibold mb-4">No flashcards in this category</h2>
              <button
                onClick={() => setShowCreate(true)}
                className="btn btn-primary"
              >
                Create a card
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;