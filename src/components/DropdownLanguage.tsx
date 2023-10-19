import axios from 'axios';
import '../styles/dropdown.scss';
import { MouseEvent, useEffect, useState } from 'react';
import { TargetLanguages } from '../types';

function Dropdown({ setLanguage }) {
  const [targetLanguages, setTargetLanguages] = useState<TargetLanguages[]>([]);
  const [selected, setSelected] = useState<string>('');

  function toggleOpenDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content-languages');

    if (dropdownContent) {
      dropdownContent.classList.toggle('show');
    }
  }

  function chooseLanguage(e: MouseEvent<HTMLButtonElement>) {
    const { attributes } = e.currentTarget;

    setSelected(attributes[1].nodeValue);
    setLanguage(attributes[2].nodeValue);
  }

  useEffect(() => {
    async function fetchTargetLanguages() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/targetLanguages');

        if (response.status === 200) {
          const languages = response.data;

          setTargetLanguages(languages);
          setSelected(languages[0].name);
          setLanguage(languages[0].code);
        } else {
          console.error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }

    fetchTargetLanguages();
  }, []);

  return (
    <div className='dropdown-wrapper'>
      <label>Destination language</label>
      <div className='dropdown'>
        <button onClick={toggleOpenDropdown} className='dropbtn'>
          {selected}
        </button>
        <div className='dropdown-content-languages'>
          {targetLanguages.map((lang) => {
            return (
              <button
                key={lang.name}
                onClick={chooseLanguage}
                className='option-button'
                language={lang.name}
                code={lang.code}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
