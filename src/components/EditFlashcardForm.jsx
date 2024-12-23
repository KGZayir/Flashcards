// src/components/EditFlashcardForm.jsx
import React, { useState } from 'react';
import './EditFlashcardForm.css';

function EditFlashcardForm({ flashcard, submitEditFlashcard, cancelEdit }) {
  const [word, setWord] = useState(flashcard.word);
  const [definition, setDefinition] = useState(flashcard.definition);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() === '' || definition.trim() === '') {
      alert('Please enter both word and definition.');
      return;
    }
    submitEditFlashcard(flashcard.id, word.trim(), definition.trim());
  };

  return (
    <div className="edit-flashcard-modal">
      <div className="edit-flashcard-content">
        <h2>Edit Flashcard</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-word">Word:</label>
            <input
              type="text"
              id="edit-word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter word"
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-definition">Definition:</label>
            <textarea
              id="edit-definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="Enter definition"
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFlashcardForm;