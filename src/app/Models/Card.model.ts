import { CardRank } from "./CardRank.enum.model";
import { CardSuit } from "./CardSuit.enum.model";

export class Card{
 
    constructor(private _id: number,private _cardRank:CardRank, private _cardSuit:CardSuit,private _frontImg: string,private _backImg: string,private _isFlipped: boolean,private _Xposition: number,private _Yposition: number){

    }
    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get cardRank(): CardRank {
        return this._cardRank;
    }
    public set cardRank(cardRank: CardRank) {
        this._cardRank = cardRank;
    }
     public get cardSuit(): CardSuit {
        return this._cardSuit;
    }
    public set cardSuit(cardSuit: CardSuit) {
        this._cardSuit = cardSuit;
    }
    public get isFlipped(): boolean {
        return this._isFlipped;
    }
    public set isFlipped(value: boolean) {
        this._isFlipped = value;
    }
    public get backImg(): string {
        return this._backImg;
    }
    public set backImg(value: string) {
        this._backImg = value;
    }
    public get frontImg(): string {
        return this._frontImg;
    }
    public set frontImg(value: string) {
        this._frontImg = value;
    }
    public get Yposition(): number {
        return this._Yposition;
    }
    public set Yposition(value: number) {
        this._Yposition = value;
    }
    public get Xposition(): number {
        return this._Xposition;
    }
    public set Xposition(value: number) {
        this._Xposition = value;
    }
}