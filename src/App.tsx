import { useState } from 'react';
import './styles/main.scss';

function App() {
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  return <button onClick={toggleTheme}>Theme Toggle</button>;
}

export default App;
