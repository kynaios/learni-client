import axios from 'axios';
import '../styles/dropdown.scss';
import { MouseEvent, useEffect, useState } from 'react';
import { Deck } from '../types';

function Dropdown({ setDeck }) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [selected, setSelected] = useState<string>('');

  function toggleOpenDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content-decks');

    if (dropdownContent) {
      dropdownContent.classList.toggle('show');
    }
  }

  function chooseDeck(e: MouseEvent<HTMLButtonElement>) {
    const { attributes } = e.currentTarget;

    setSelected(attributes[1].nodeValue);
    setDeck(attributes[2].nodeValue);
  }

  useEffect(() => {
    async function fetchDecks() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/deck/all');

        if (response.status === 200) {
          const decks = response.data;

          setDecks(decks);
          setSelected(decks[0].name);
          setDeck(decks[0].id);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }

    fetchDecks();
  }, []);

  return (
    <div className='dropdown-wrapper'>
      <label>Choose deck</label>
      <div className='dropdown'>
        <button onClick={toggleOpenDropdown} className='dropbtn' variant='deck'>
          {selected}
        </button>
        <div className='dropdown-content-decks'>
          {decks.map((deck) => {
            return (
              <button
                key={deck.name}
                onClick={chooseDeck}
                className='option-button'
                deckname={deck.name}
                id={deck.id}
              >
                {deck.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
