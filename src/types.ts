export interface Flashcard {
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
