import { ChangeEvent, useState } from 'react';
import Dropdown from './Dropdown';
import axios from 'axios';
import '../styles/card.scss';

async function translateTextWithDeepL(word: string, targetLang: string): Promise<string | null> {
  const url = `http://localhost:8080/api/v1/translate?word=${word}&targetLang=${targetLang}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      const translatedText = response.data.translation;

      return translatedText;
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  }
}

function Card({ addFlashcard }) {
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [language, setLanguage] = useState<string>('');

  const handleWorld = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setWord(value);

    if (value) {
      const res = await translateTextWithDeepL(value, language);

      if (res) {
        setTranslation(res);
      }
    } else {
      setWord('');
      setTranslation('');
    }
  };

  return (
    <div className='flash-card'>
      <Dropdown setLanguage={setLanguage} />
      <input onChange={handleWorld} value={word} className='word-input l' />
      <span className='translation l'>{translation}</span>
      <button onClick={() => addFlashcard({ word, translation })} className='add-button'>
        Add
      </button>
    </div>
  );
}

export default Card;
