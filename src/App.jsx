// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Flashcard from './components/Flashcard';
import AddFlashcardForm from './components/AddFlashcardForm';
import EditFlashcardForm from './components/EditFlashcardForm';
import flashcardsData from './data/flashcards.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Initialize flashcards from localStorage or from flashcards.json
  const initializeFlashcards = () => {
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
      return JSON.parse(storedFlashcards);
    } else {
      return flashcardsData;
    }
  };

  // State to manage flashcards
  const [flashcards, setFlashcards] = useState(initializeFlashcards);

  // State to track the current flashcard index
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to manage editing
  const [isEditing, setIsEditing] = useState(false);
  const [flashcardToEdit, setFlashcardToEdit] = useState(null);

  // Effect to update localStorage whenever flashcards change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  // Handler to go to the next flashcard
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handler to go to the previous flashcard
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  // Function to shuffle the flashcards using Fisher-Yates algorithm
  const shuffleFlashcards = () => {
    if (flashcards.length < 2) {
      toast.info('Need at least two flashcards to shuffle.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
    setCurrentIndex(0); // Reset to the first flashcard after shuffling
    toast.success('Flashcards have been shuffled!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Handler to add a new flashcard
  const addFlashcard = (word, definition) => {
    // Check for duplicate words
    const duplicate = flashcards.find(
      (flashcard) => flashcard.word.toLowerCase() === word.toLowerCase()
    );
    if (duplicate) {
      toast.error('This word already exists!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    // Determine the next ID
    const nextId = flashcards.length > 0
      ? Math.max(...flashcards.map(fc => fc.id)) + 1
      : 1;

    const newFlashcard = {
      id: nextId,
      word,
      definition,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setCurrentIndex(flashcards.length); // Set to the newly added flashcard
    toast.success('Flashcard added successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Handler to delete a flashcard
  const deleteFlashcard = (id) => {
    const updatedFlashcards = flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
    setFlashcards(updatedFlashcards);
    setCurrentIndex(0); // Reset to the first flashcard
    toast.info('Flashcard deleted.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Handler to initiate editing a flashcard
  const initiateEditFlashcard = (flashcard) => {
    setIsEditing(true);
    setFlashcardToEdit(flashcard);
  };

  // Handler to submit edited flashcard
  const submitEditFlashcard = (id, updatedWord, updatedDefinition) => {
    // Check for duplicate words excluding the current flashcard
    const duplicate = flashcards.find(
      (flashcard) =>
        flashcard.word.toLowerCase() === updatedWord.toLowerCase() &&
        flashcard.id !== id
    );
    if (duplicate) {
      toast.error('Another flashcard with this word already exists!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const updatedFlashcards = flashcards.map((flashcard) =>
      flashcard.id === id
        ? { ...flashcard, word: updatedWord, definition: updatedDefinition }
        : flashcard
    );
    setFlashcards(updatedFlashcards);
    setIsEditing(false);
    setFlashcardToEdit(null);
    toast.success('Flashcard updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  // Handler to cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setFlashcardToEdit(null);
  };

  return (
    <div className="App">
      <h1>Flashcard App</h1>

      {/* Add Flashcard Form */}
      <AddFlashcardForm addFlashcard={addFlashcard} />

      {/* Flashcard Display */}
      {flashcards.length > 0 ? (
        <Flashcard
          flashcard={flashcards[currentIndex]}
          handleNext={handleNext}
          handlePrev={handlePrev}
          initiateEditFlashcard={initiateEditFlashcard}
          deleteFlashcard={deleteFlashcard}
          shuffleFlashcards={shuffleFlashcards} // Pass shuffleFlashcards as a prop
        />
      ) : (
        <p>No flashcards available. Please add some!</p>
      )}

      {/* Edit Flashcard Form (Conditional Rendering) */}
      {isEditing && (
        <EditFlashcardForm
          flashcard={flashcardToEdit}
          submitEditFlashcard={submitEditFlashcard}
          cancelEdit={cancelEdit}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;