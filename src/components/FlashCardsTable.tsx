import '../styles/flash-cards-table.scss';
import { Flashcards } from '../types';

function FlashCardsTable({ flashcards }: Flashcards) {
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
              <td>{f.word}</td>
              <td>{f.translation}</td>
              <td>Actions</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default FlashCardsTable;
