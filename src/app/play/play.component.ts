import { Hangman } from './../model/hangman.model';
import { Component, Injectable, OnInit } from '@angular/core';
import { PlayService } from './play.service';
import { Utils } from '../utils/utils';

/**
 *  @Author Marcos Abreu
 */

 @Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

 private  prefix: string;

 public   imgIndex: string;

 private  suffix: string;

 public  imagePath: string;

 public  hangman: Hangman;

 public  disabledInput: boolean;

 private invalidImgIndex: number;

  imgVisible: boolean;

  constructor(public playService: PlayService, public utils: Utils) { }

  ngOnInit(): void {
    this.init();
    this.getWord();
  }

  init():void{
   this.prefix = "assets/img/hangman-";
   this.imgIndex = "6";
   this.suffix = ".png";
   this.imagePath = this.prefix + this.imgIndex + this.suffix;
   this.hangman = new Hangman();
   this.disabledInput = false;
   this.invalidImgIndex = 7;
   this.hangman.updateImage = 1;
  }

  loaded(): void {
    if (this.hangman.gameCounter < this.invalidImgIndex && this.hangman.updateImage == 2) {
      this.imgVisible = false;
      this.imgIndex = this.hangman.gameCounter.toString();
      this.imgVisible = true;
      this.imagePath = this.prefix + this.imgIndex + this.suffix;
    }
  }

  getWord(): void {
    this.playService.getWord().subscribe(success => {
      this.hangman = success.body;
      this.utils.message = "Game started!";
      this.utils.status = 1;
      this.disabledInput = false;
      console.log(success.status);
    }, fail => {
      this.utils.message = "Internal error, contact the system administrator!";
      this.utils.status = 2;
      console.log(fail.status);
    });
  }

  gameNotEnded(hangman: Hangman): boolean{
    if((hangman.supposedWord !== undefined ||
      hangman.chosenLetter !== undefined) &&
      hangman.statusGame != 3){
      return true;
    } else {
      return false;
    }
  }

  endGame(hangman: Hangman): void{
    if(this.hangman.statusGame == 3){
    this.hangman.gameCounter = 0;
  }
    this.loaded();
  }

  setChosenLetterToLowerCase(hangman: Hangman): void{
    if(hangman.chosenLetter !== undefined){
      this.hangman.chosenLetter = this.hangman.chosenLetter.toLowerCase();
    }
  }

  setSupposedWordToLowerCase(hangman: Hangman): void{
    if(hangman.supposedWord !== undefined){
      hangman.supposedWord = this.hangman.supposedWord.toLowerCase();
    }
  }

  proccessGameConclusion(hangman: Hangman): void{
    if (hangman.statusGame == 2) {
      this.endGame(hangman);
      this.utils.message = "You win!!! push 'Play Hangman' to play again!!!'";
      this.disabledInput = true;
    } else if (this.hangman.statusGame == 3) {
      this.endGame(hangman);
      this.utils.message = "You loose!!! push 'Play Hangman' to play again!!!";
      this.disabledInput = true;
    } else {
      this.utils.message = "Please, insert your next letter!";
      this.loaded();
    }
  }

  processGameError(fail: any): void{
    this.utils.message = "Internal error occurred, contact the system administrator!";
        this.disabledInput = true;
        console.log(fail.status);
  }

  processChosenLetter(): void {
    this.setChosenLetterToLowerCase(this.hangman);
    this.hangman.updateImage = 1;
    if (this.gameNotEnded(this.hangman)) {
      this.playService.processChosenLetter(this.hangman).subscribe(success => {
        this.hangman = success.body;
        console.log(success.status);
        this.proccessGameConclusion(this.hangman);

      }, fail => {
        this.processGameError(fail);
      })
    }
  }
  processSupposedWord(): void {
    this.setSupposedWordToLowerCase(this.hangman);
    this.hangman.updateImage = 1;
    if (this.gameNotEnded(this.hangman)) {
      this.playService. processSupposedWord(this.hangman).subscribe(success => {
        this.hangman = success.body;
        console.log(success.status);
        this.proccessGameConclusion(this.hangman);

      }, fail => {
        this.processGameError(fail);
      })
    }
  }
}
