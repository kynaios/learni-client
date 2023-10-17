import { useState } from 'react';
import Card from './components/Card';
import './styles/main.scss';
import FlashCardsTable from './components/FlashCardsTable';
import { Flashcard } from './types';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  async function addFlashCard(card: Flashcard) {
    const res = await axios.post('http://localhost:8080/api/v1/flashCardBag/create', card);

    if (res.status === 200) {
      const flashCardsBagRes = await axios.get('http://localhost:8080/api/v1/flashCardBag/all');

      if (flashCardsBagRes.status === 200) {
        setFlashcards(flashCardsBagRes.data);
      }
    }
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
