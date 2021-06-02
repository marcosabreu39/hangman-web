import { Hangman } from './../model/hangman.model';
import { Component, OnInit } from '@angular/core';
import { PlayService } from './play.service';
import { Utils } from '../utils/utils';

/**
 *  @Author Marcos Abreu
 */

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

 private prefix: string = "assets/img/hangman-";

 public imgIndex: string = "7";

 private suffix: string = ".png";

  public imagePath: string = this.prefix + this.imgIndex + this.suffix;

  public hangman: Hangman = new Hangman();

  public disabledInput: boolean = false;

  imgVisible = true;

  constructor(public playService: PlayService, public utils: Utils) { }

  ngOnInit(): void {
    this.getWord();
  }

  loaded(): void {
    if (this.hangman.gameCounter < 7 && this.hangman.updateImage == 2) {
      this.imgVisible = false;
      this.imgIndex = this.hangman.gameCounter.toString();
      this.imgVisible = true;
      this.imagePath = this.prefix + this.imgIndex + this.suffix;
    }
  }

  getWord(): void {
    this.hangman.updateImage = 1;
    this.imgIndex = "7";
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
    if((hangman.supposedWord !== undefined || hangman.choosenLetter !== undefined) && hangman.statusGame != 3){
      return true;
    } else {
      return false;
    }
  }

  endGame(): void{
    this.hangman.gameCounter = 1;
    this.loaded();
  }

  proccessGame() {
    this.hangman.updateImage = 1;
    if (this.gameNotEnded(this.hangman)) {
      this.playService.processGame(this.hangman).subscribe(success => {
        this.hangman = success.body;
        console.log(success.status);
        if (this.hangman.statusGame == 2) {
          this.endGame()
          this.utils.message = "You win!!! push 'Play Hangman' to play again!!!'";
          this.disabledInput = true;
        } else if (this.hangman.statusGame == 3) {
          this.endGame()
          this.utils.message = "You loose!!! push 'Play Hangman' to play again!!!";
          this.disabledInput = true;
        } else {
          this.utils.message = "Please, insert your next letter!";
        }
      }, fail => {
        this.utils.message = "Internal error occurred, contact the system administrator!";
        this.disabledInput = true;
        console.log(fail.status);
      })
    }
  }

}
