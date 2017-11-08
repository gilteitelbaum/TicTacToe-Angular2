import { PlayerChoicesEnum } from './playerchoices';
import { Injectable } from '@angular/core';


@Injectable()
export class CurrentPlayer
{
    player: PlayerChoicesEnum = PlayerChoicesEnum.x;
    static instance: CurrentPlayer;

    constructor(){
        return CurrentPlayer.instance = CurrentPlayer.instance || this;
    }
  
    get getPlayer() : number
    {
        return this.player;
    }

    changePlayer()
    {
        if (this.player == PlayerChoicesEnum.x)
            this.player = PlayerChoicesEnum.o;
        else
            this.player = PlayerChoicesEnum.x;
    } 
}
