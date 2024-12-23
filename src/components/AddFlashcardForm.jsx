// src/components/AddFlashcardForm.jsx
import React, { useState } from 'react';
import './AddFlashcardForm.css';

function AddFlashcardForm({ addFlashcard }) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() === '' || definition.trim() === '') {
      alert('Please enter both word and definition.');
      return;
    }
    addFlashcard(word.trim(), definition.trim());
    setWord('');
    setDefinition('');
  };

  return (
    <form className="add-flashcard-form" onSubmit={handleSubmit}>
      <h2>Add New Flashcard</h2>
      <div className="form-group">
        <label htmlFor="word">Word:</label>
        <input
          type="text"
          id="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter word"
        />
      </div>
      <div className="form-group">
        <label htmlFor="definition">Definition:</label>
        <textarea
          id="definition"
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Enter definition"
        ></textarea>
      </div>
      <button type="submit" className="add-button">
        Add Flashcard
      </button>
    </form>
  );
}

export default AddFlashcardForm;