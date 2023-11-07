import { useState } from 'react';
import Dropdown from './DropdownDeck';
import { Deck, FlashcardsTableProps } from '../types';
import '../styles/collection-controller.scss';
import axios from 'axios';
import NewDeckDialog from './NewDeckDialog';

function CollectionController({ flashcards, setFlashcards }: FlashcardsTableProps) {
  const [deck, setDeck] = useState<Deck>();
  const [toggleDialog, setToggleDialog] = useState<boolean>(false);

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

  function toggleDialogOpen() {
    setToggleDialog(!toggleDialog);
    window.dialog.showModal();
  }

  return (
    <>
      <div className='collection-controller-container'>
        <Dropdown setDeck={setDeck} />
        <button onClick={addToDeck}>Add to deck</button>
        <button onClick={toggleDialogOpen}>Create new deck</button>
        <NewDeckDialog open={toggleDialog} />
      </div>
    </>
  );
}

export default CollectionController;
