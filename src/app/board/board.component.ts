import { Component, ViewChildren, QueryList, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { PlayerChoicesEnum } from '../playerchoices';
import { CurrentPlayer } from '../currentplayer';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'], 
  providers: [CurrentPlayer]  
})

export class TicTacToeBoardComponent  
{
  @ViewChildren(CellComponent) cells: QueryList<CellComponent>;
  map = new Map<string, any>();
  winningCombinations:any[][]=[ ["1_1","1_2","1_3"],
                                ["2_1","2_2","2_3"], 
                                ["3_1","3_2","3_3"], 
                                ["1_1","2_1","3_1"], 
                                ["1_2","2_2","3_2"], 
                                ["1_3","2_3","3_3"], 
                                ["1_1","2_2","3_3"], 
                                ["3_1","2_2","1_3"] ];
  winner = "";

  constructor(private currentPlayer: CurrentPlayer){
  }

  gameStatusCheck(id: number) : void
  {
    if (this.winner.length > 0) // if someone one, we dont need to check anymore
      return;
    if (this.whoWon() === 0)
      this.checkDraw();  
  }

  getCurrentPlayer() : string
  {
    if (this.winner.length > 0)
      return "";
    if (CurrentPlayer.instance.getPlayer == PlayerChoicesEnum.x)
      return "Turn: Player X";
    return "Turn: Player O";
  }

  checkDraw() : boolean
  {
    let populatedCells = 0;
    for (let currentRow = 1; currentRow < 4; currentRow++)
    {
      for (let currentCol = 1; currentCol < 4; currentCol++)
      {
        let index = currentRow + "_" + currentCol;
        let currentCell =  this.map.get(index);
        if (currentCell.cellChoice > 0)
          ++populatedCells;
      }
    }
    if (populatedCells === 9){
      this.winner = "The game is draw";
      return true;
    }
    return false;
  }

  whoWon() : number
  {
    for (let index = 0; index < 8; index++)
    {
      let total = 0;
      let populatedCells = 0;
      for (let currentEntry = 0; currentEntry < 3; currentEntry++)
      {
        let currentCombination = this.winningCombinations[index][currentEntry];
        let currentCell =  this.map.get(currentCombination);
        total += currentCell.cellChoice;
        if (currentCell.cellChoice > 0)
          ++populatedCells;
      }
      if (populatedCells === 3 && total === 6){
        this.winner = "Player O wins !";
        return PlayerChoicesEnum.o; 
      }
      if (populatedCells === 3 && total === 3){
        this.winner = "Player X wins !";
        return PlayerChoicesEnum.x; 
      }
    }
    return 0;
  }

  ngAfterViewInit() {
    let cellsArr = this.cells.toArray();
    for (let entry of cellsArr)
      this.map.set(entry.id, entry);
  }
}
