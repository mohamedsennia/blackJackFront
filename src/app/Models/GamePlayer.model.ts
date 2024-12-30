import { User } from "./User.model";

export class GamePlayer{
    
    
    
    
    constructor(private _user: User,private _state: string,private _score: number,private _drawnAce: boolean){

    }
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        this._score = value;
    }
    public get state(): string {
        return this._state;
    }
    public set state(value: string) {
        this._state = value;
    }
    public get drawnAce(): boolean {
        return this._drawnAce;
    }
    public set drawnAce(value: boolean) {
        this._drawnAce = value;
    }
}