import { useState } from 'react';
import Card from './components/Card';
import './styles/main.scss';
import FlashCardsTable from './components/FlashCardsTable';
import { Flashcard } from './types';

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  function addFlashCard(card: Flashcard) {
    setFlashcards([card, ...flashcards]);
  }

  return (
    <>
      <button onClick={toggleTheme}>Theme Toggle</button>
      <div className='add-flash-card-container'>
        <Card addFlashcard={addFlashCard} />
        <FlashCardsTable flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
