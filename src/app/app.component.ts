import { Component, HostListener } from '@angular/core';
import { TicTacToeBoardComponent } from './board/board.component';

@Component({
  selector: 'tictactoe',
  templateUrl: 'app/app.component.html',
})

export class AppComponent  {
  @HostListener('window:beforeunload', ['$event'])
  doSomething($event) {
    $event.returnValue='Your data will be lost!';
  }
}
