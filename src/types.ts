import { Dispatch, SetStateAction } from 'react';

export interface Flashcard {
  id: string;
  word: string;
  translation: string;
}

export interface Flashcards {
  flashcards: Flashcard[];
}

export interface TargetLanguages {
  name: string;
  code: string;
  supportsFormality: boolean;
}

interface FlashcardsTableProps {
  flashcards: Flashcards;
  setFlashcards: Dispatch<SetStateAction<Flashcards>>;
}
