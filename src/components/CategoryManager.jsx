import React, { useState, useEffect } from 'react';
import { FolderIcon, PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function CategoryManager({ onSelectCategory, activeCategory }) {
  const [categories, setCategories] = useState([]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const loadedCategories = await window.electron.getCategories();
    setCategories(loadedCategories);
  };

  const handleCreateCategory = async () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        createdAt: new Date().toISOString()
      };
      
      await window.electron.saveCategory(newCategory);
      setNewCategoryName('');
      setIsCreatingCategory(false);
      loadCategories();
    }
  };

  const handleStartEdit = (category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
  };

  const handleSaveEdit = async () => {
    if (editCategoryName.trim()) {
      const updatedCategory = categories.find(c => c.id === editingCategoryId);
      if (updatedCategory) {
        await window.electron.updateCategory({
          ...updatedCategory,
          name: editCategoryName.trim()
        });
        setEditingCategoryId(null);
        loadCategories();
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Delete this category and all its flashcards?')) {
      await window.electron.deleteCategory(categoryId);
      loadCategories();
      if (activeCategory === categoryId) {
        onSelectCategory(null);
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Categories</h3>
        {!isCreatingCategory && (
          <button
            onClick={() => setIsCreatingCategory(true)}
            className="text-xs btn py-1 px-2 flex items-center gap-1"
          >
            <PlusIcon className="w-3 h-3" />
            New
          </button>
        )}
      </div>

      {isCreatingCategory && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="text-sm flex-1 bg-white/5 rounded-lg border border-white/10 p-2 focus:outline-none focus:ring-1 focus:ring-white/20"
            autoFocus
          />
          <button
            onClick={handleCreateCategory}
            className="btn py-1 px-2 text-xs"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsCreatingCategory(false);
              setNewCategoryName('');
            }}
            className="btn py-1 px-2 text-xs"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
        <div 
          className={`nav-item text-sm ${activeCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <FolderIcon className="w-4 h-4" />
          <span>All Cards</span>
        </div>
        
        {categories.map(category => (
          <div key={category.id} className="relative">
            {editingCategoryId === category.id ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  className="text-sm flex-1 bg-white/5 rounded-lg border border-white/10 p-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                  autoFocus
                />
                <button
                  onClick={handleSaveEdit}
                  className="btn py-1 px-2 text-xs"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingCategoryId(null)}
                  className="btn py-1 px-2 text-xs"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div 
                className={`nav-item text-sm flex justify-between ${activeCategory === category.id ? 'active' : ''}`}
              >
                <div 
                  className="flex items-center gap-2 flex-1 cursor-pointer" 
                  onClick={() => onSelectCategory(category.id)}
                >
                  <FolderIcon className="w-4 h-4" />
                  <span>{category.name}</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleStartEdit(category)}
                    className="p-1 rounded-full hover:bg-white/10"
                  >
                    <PencilIcon className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 rounded-full hover:bg-white/10 text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryManager;