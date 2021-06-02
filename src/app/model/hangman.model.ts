export class Hangman {
  keyWordId: number;
  keyWord: string;
  displayedLettersList: Array<string>;
  displayedLetters: string;
  choosenLetter: string;
  allChoosenLetters: String;
  allChoosenLettersList: Array<string>;
  supposedWord: string;
  statusGame: number;
  gameCounter: number;
  isReadOnly: boolean;
  updateImage: number;
}
