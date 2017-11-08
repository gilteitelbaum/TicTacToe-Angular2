import { Component, Input, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CurrentPlayer } from '../currentplayer';
import { PlayerChoicesEnum } from '../playerchoices'

enum CellChoicesEnum {
    x = 1 ,
    o = 2,
    empty = 0
}

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'cell',
  templateUrl: './cell.component.html',
  providers: [CurrentPlayer],
  styleUrls: ['./cell.component.css'] 
})

export class CellComponent
{ 
  cellChoice: CellChoicesEnum = CellChoicesEnum.empty;
  id: number;
  @Output() onCellClicked = new EventEmitter<number>();

  constructor(element: ElementRef, private currentPlayer: CurrentPlayer) 
  {
      this.id = element.nativeElement.id;
  }

  get imageUrl() : string
  {
    if (this.cellChoice == CellChoicesEnum.empty)
      return 'app/img/emptyTrans.png';
    if (this.cellChoice == CellChoicesEnum.x)
      return 'app/img/xTrans.png';
    return 'app/img/oTrans.png';
  }
  
  clicked(event)
  {
    if (this.cellChoice != CellChoicesEnum.empty)
        return;
    if (this.currentPlayer.getPlayer == PlayerChoicesEnum.x)
        this.cellChoice = CellChoicesEnum.x;
    else
        this.cellChoice = CellChoicesEnum.o;
    this.onCellClicked.emit(this.currentPlayer.getPlayer);
    this.currentPlayer.changePlayer();
  }
}
