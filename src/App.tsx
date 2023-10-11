import { useState } from 'react';
import Card from './components/Card';
import './styles/main.scss';

function App() {
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  return (
    <>
      <button onClick={toggleTheme}>Theme Toggle</button>
      <Card />
    </>
  );
}

export default App;
