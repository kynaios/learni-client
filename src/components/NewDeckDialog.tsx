import { useState } from 'react';

function NewDeckDialog({ open }: boolean) {
  const [deckName, setDeckName] = useState<string>('');

  return (
    <dialog id='dialog' open={open}>
      <form method='dialog'>
        <label>
          Deck name
          <input value={deckName} />
        </label>
        <menu>
          <button id='closeDialog' value='cancel'>
            Cancel
          </button>
          <button id='confirmBtn' value='default'>
            Confirm
          </button>
        </menu>
      </form>
    </dialog>
  );
}

export default NewDeckDialog;
