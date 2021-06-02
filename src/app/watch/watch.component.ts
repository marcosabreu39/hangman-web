import { Utils } from './../utils/utils';
import { WatchService } from './watch.service';
import { Component, OnInit } from '@angular/core';
import { Hangman } from '../model/hangman.model';

/**
 *  @Author Marcos Abreu
 * 
 * Manages words requisitions from backend
 */
 declare var require: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  public hangmanWords: Array<Hangman>;
  public enabled: boolean = false;

  constructor(private watchService: WatchService, public utils: Utils) { }

  ngOnInit(): void {
    this.getWords();
  }

  /**
   * Obtains all words persisted in the database
   */
  getWords() {
    this.watchService.getWords().subscribe(
      success => {
        this.hangmanWords = success.body;
        this.enabled = true;
        this.utils.message = "Words obtained successfully!";
        this.utils.status = 1;
        console.log("Status: " + success.status);
      },
      fail => {
        this.utils.message = "None words were found! Please, contact the system administrator!";
        this.utils.status = 2;
        console.log("Status: " + fail.status);
      });
  }

}
