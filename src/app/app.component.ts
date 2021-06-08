import { PlayComponent } from './play/play.component';
import { PlayService } from './play/play.service';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('contentPlaceholder', { static: false }) contentPlaceholder: ElementRef;

  display = false;

  title = 'Hangman-Web';

  constructor() { }

  refresh(): void {
    location.reload();
  }

  /* refresh() {
    this.display = true;
    this.changeDetectorRef.detectChanges();
    console.log(this.contentPlaceholder);
} */

}




