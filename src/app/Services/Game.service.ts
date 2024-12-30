import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Game } from "../Models/Game.model";
import { Card } from "../Models/Card.model";

@Injectable({
    providedIn:"root"
})
export class GameService{
    gameState:Subject<String>
    game:Game
    myTurn:boolean;
    opponentDraw:Subject<number>
    public cards: Card[];
    constructor(){
        this.opponentDraw=new Subject<number>
        this.gameState=new Subject()
        this.gameState.next("NONE")
    }
}