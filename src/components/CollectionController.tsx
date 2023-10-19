import { useState } from 'react';
import Dropdown from './DropdownDeck';
import { Deck, FlashcardsTableProps } from '../types';
import '../styles/collection-controller.scss';
import axios from 'axios';

function CollectionController({ flashcards, setFlashcards }: FlashcardsTableProps) {
  const [deck, setDeck] = useState<Deck>();

  async function addToDeck() {
    flashcards.forEach(async (flashcard) => {
      const res = await axios.post('http://localhost:8080/api/v1/flashCard/create', {
        ...flashcard,
        deckId: deck,
      });

      if (res.status === 200) {
        const flashCardsBagRes = await axios.get('http://localhost:8080/api/v1/flashCardBag/all');

        if (flashCardsBagRes.status === 200) {
          setFlashcards(flashCardsBagRes.data);
        }
      }

      // TODO: Show error
    });
  }

  return (
    <div className='collection-controller-container'>
      <Dropdown setDeck={setDeck} />
      <button onClick={addToDeck}>Add to deck</button>
      <button>Create new deck</button>
    </div>
  );
}

export default CollectionController;
