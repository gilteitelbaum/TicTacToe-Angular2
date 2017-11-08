import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { TicTacToeBoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, TicTacToeBoardComponent, CellComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
