export class Hangman {
  keyWordId: number;
  keyWord: string;
  displayedLettersList: Array<string>;
  displayedLetters: string;
  chosenLetter: string;
  allChosenLetters: String;
  allChosenLettersList: Array<string>;
  preciseChosenLetters: string;
  supposedWord: string;
  statusGame: number;
  gameCounter: number;
  isReadOnly: boolean;
  updateImage: number;
}
