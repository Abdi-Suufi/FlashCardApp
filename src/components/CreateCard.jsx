import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function CreateCard({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create New Card</h2>
        <button onClick={onCancel} className="btn">
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Question
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Answer
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            className="w-full bg-white/5 rounded-lg border border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-white/20"
            rows="3"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Create Card
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCard; 