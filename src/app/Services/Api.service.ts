import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { User } from "../Models/User.model";
import { UserService } from "./UserService";
import { GameService } from "./Game.service";
import { Card } from "../Models/Card.model";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn:"root"
})
export class ApiService{
    private backendUrl=environment.backEndUrl
    private link=this.backendUrl+"api/"
    constructor(private httpClient:HttpClient,private userService:UserService,private gameService:GameService){

    }
    addUser(user):Observable<User>{
       return this.httpClient.post<User>(this.link+"Players",user).pipe(map(user=>{
        let newUser=new User(user.id,user.userName)
        localStorage.setItem("userId",""+newUser.id)
        localStorage.setItem("userName",user.userName)
        return newUser

       }))
    }
    getOpponentCards(){
    return    this.httpClient.get<string[]>(this.link+"game/opponentCards/"+this.gameService.game.id+"/"+this.userService.getUser().id).pipe(map(cards=>{
            let images=[]
            console.log(cards)
            for(let card of cards){
                images.push(this.backendUrl+'cards/'+card['image'])
            }
            return images
        }))
    }
}