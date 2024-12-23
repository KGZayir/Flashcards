// src/components/Flashcard.jsx
import React, { useState } from 'react';
import './Flashcard.css';
import { FaEdit, FaTrash, FaRandom, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Flashcard({
  flashcard,
  handleNext,
  handlePrev,
  initiateEditFlashcard,
  deleteFlashcard,
  shuffleFlashcards,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleEdit = () => initiateEditFlashcard(flashcard);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      deleteFlashcard(flashcard.id);
    }
  };

  return (
    <div className="flashcard-wrapper">
      {/* Previous Arrow */}
      <button className="nav-button left" onClick={handlePrev} aria-label="Previous Flashcard">
        <FaArrowLeft className="nav-icon" />
      </button>

      {/* Flashcard */}
      <div className="flashcard-container">
        <div
          className={`flashcard ${isFlipped ? 'flipped' : ''}`}
          onClick={handleFlip}
        >
          <div className="front">
            <h2>{flashcard.word}</h2>
          </div>
          <div className="back">
            <p>{flashcard.definition}</p>
          </div>
        </div>
      </div>

      {/* Next Arrow */}
      <button className="nav-button right" onClick={handleNext} aria-label="Next Flashcard">
        <FaArrowRight className="nav-icon" />
      </button>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={handleEdit} className="edit-button" aria-label="Edit Flashcard">
          <FaEdit className="button-icon" /> Edit
        </button>
        <button onClick={handleDelete} className="delete-button" aria-label="Delete Flashcard">
          <FaTrash className="button-icon" /> Delete
        </button>
        <button onClick={shuffleFlashcards} className="shuffle-button" aria-label="Shuffle Flashcards">
          <FaRandom className="button-icon" /> Shuffle
        </button>
      </div>
    </div>
  );
}

export default Flashcard;