import { ChangeEvent, useEffect, useState } from 'react';
import '../styles/flash-cards-table.scss';
import { FlashcardsTableProps, Flashcard } from '../types';
import axios from 'axios';

function FlashCardsTable({ flashcards, setFlashcards }: FlashcardsTableProps) {
  const [flashcardEdit, setFlashcardEdit] = useState<Flashcard | null>();
  const [index, setIndex] = useState<number | null>();

  function editFlashcard(index: number, flashcard: Flashcard) {
    if (flashcard) {
      setFlashcardEdit(flashcard);
    }

    setIndex(index);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFlashcardEdit({
      ...flashcardEdit,
      [name]: value,
    });
  }

  async function updateFlashcard() {
    const res = await axios.put('http://localhost:8080/api/v1/flashCardBag/update', flashcardEdit);

    if (res.status === 200) {
      setFlashcardEdit(null);
      setIndex(null);

      const flashcardsRes = await axios.get('http://localhost:8080/api/v1/flashCardBag/all');

      if (flashcardsRes.status === 200) {
        setFlashcards(flashcardsRes.data);
      }
    }
  }

  async function deleteFlashcard(id: string) {
    const res = await axios.delete(`http://localhost:8080/api/v1/flashCardBag/delete/${id}`);

    if (res.status === 200) {
      const flashcardsRes = await axios.get('http://localhost:8080/api/v1/flashCardBag/all');

      if (flashcardsRes.status === 200) {
        setFlashcards(flashcardsRes.data);
      }
    }
  }

  useEffect(() => {
    async function fetchBag() {
      const flashcardsRes = await axios.get('http://localhost:8080/api/v1/flashCardBag/all');

      if (flashcardsRes.status === 200) {
        setFlashcards(flashcardsRes.data);
      }
    }

    fetchBag();
  }, []);

  return (
    <table className='flash-cards-table l'>
      <thead>
        <tr>
          <th>Word</th>
          <th>Translation</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {flashcards.map((f, i) => {
          return (
            <tr key={i}>
              {index === i ? (
                <>
                  <td>
                    <input name='word' onChange={handleInputChange} value={flashcardEdit.word} />
                  </td>
                  <td>
                    <input
                      name='translation'
                      onChange={handleInputChange}
                      value={flashcardEdit.translation}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{f.word}</td>
                  <td>{f.translation}</td>
                </>
              )}
              <td className='actions'>
                {index === i ? (
                  <button onClick={updateFlashcard} className='action-button'>
                    Change
                  </button>
                ) : (
                  <button onClick={() => editFlashcard(i, f)} className='action-button'>
                    Edit
                  </button>
                )}
                <button onClick={() => deleteFlashcard(f.id)} className='action-button'>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FlashCardsTable;
