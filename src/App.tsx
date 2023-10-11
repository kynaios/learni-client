import { useState } from 'react';
import Card from './components/Card';
import './styles/main.scss';
import FlashCardsTable from './components/FlashCardsTable';

function App() {
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  return (
    <>
      <button onClick={toggleTheme}>Theme Toggle</button>
      <div className='add-flash-card-container'>
        <Card />
        <FlashCardsTable />
      </div>
    </>
  );
}

export default App;
