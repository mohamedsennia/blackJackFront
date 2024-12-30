import { Injectable } from "@angular/core";
import { Client, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client"
import { User } from "../Models/User.model";
import { UserService } from "./UserService";
import { GameService } from "./Game.service";
import { Game } from "../Models/Game.model";
import { GamePlayer } from "../Models/GamePlayer.model";
import { environment } from "../../environments/environment";
@Injectable({
    providedIn:"root"
})
export class WebSocketService{
    private client:Client;
    private lastDrawnCard:number;
    private backendUrl:string=environment.backEndUrl
    constructor(private userService:UserService,private gameService:GameService){
        this.client=new Client({
            webSocketFactory:()=> new SockJS(this.backendUrl+'start'),
            onConnect:()=>{
                this.joinGame()
            },
            debug: (str) => {
                console.log(new Date(), str);
            },
            reconnectDelay: 5000, 
        })
        this.client.activate();
    }
    joinGame(){
       
        if(this.client.connected){
            let user= this.userService.getUser()
            this.client.publish({"destination":"/app/joinGame","body":JSON.stringify(user)})
          
       let gameQueue:StompSubscription =  this.client.subscribe("/user/"+this.userService.getUser().id+"/topic/games",(message)=>{
                
                let messageBody=JSON.parse(message.body)
                
             
                
                this.gameService.gameState.next("ONGOING")
                   
                    this.gameService.game=new Game(Number(messageBody['id']),
                new GamePlayer(
                    user,messageBody['gamePlayer1']['state'],messageBody['gamePlayer1']['score'],messageBody['gamePlayer1']['drawnAce']
                ),
                new GamePlayer(
                    new User(messageBody['gamePlayer2']['id'],messageBody['gamePlayer2']['userName']),null,null,null
                )
                )
                this.gameService.myTurn=messageBody['myturn']
                    this.client.subscribe("/user/"+messageBody['id']+"/topic/gameUpdates",(update)=>{
                     
                        if(update.body.includes("has disconnected")){
                           
                            this.gameService.game.player2.state="DISCONNECTED"
                        }
                    })
                    this.client.subscribe("/user/"+this.userService.getUser().id+"/topic/errors",(error=>{
                        console.log(error)
                    }))
                    this.client.subscribe("/user/"+this.userService.getUser().id+"/topic/updates",(update)=>{
                        let newUpdate=JSON.parse(update.body)
                        console.log(newUpdate)
                        if(newUpdate['updateType']==="stateUpdate"){
                           
                           

                            if(newUpdate['gamePlayerState']!="STOOD"){
                                if(newUpdate['gamePlayerState']!="FOLDED"){
                                    this.gameService.opponentDraw.next(1)
                                }
                                if(this.gameService.game.player2.state!=newUpdate['gamePlayerState']){
                                    this.gameService.myTurn=!this.gameService.myTurn
                                }
                                this.gameService.gameState.next(newUpdate['gameStatus'])
                                
                            }else{
                                this.gameService.opponentDraw.next(1)
                                this.gameService.myTurn=!this.gameService.myTurn
                            }
                            this.gameService.game.player2.state=newUpdate['gamePlayerState']
                            
                            
                            
                            
                            
                        }else if(newUpdate['updateType']==="scoreUpdate"){
                            if(newUpdate['carDrawn']!=null){
                                this.gameService.cards[this.lastDrawnCard].frontImg=this.backendUrl+'cards/'+newUpdate['carDrawn']['image'];
                            }
                            this.gameService.game.player1.drawnAce=newUpdate['drawnIce']
                        
                            if(newUpdate['gamePlayerState']!="STOOD"){
                              
                                this.gameService.game.player1.state=newUpdate['gamePlayerState']
                                this.gameService.gameState.next(newUpdate['gameStatus'])
                            
                            }
                            
                                this.gameService.game.player1.score=newUpdate['newScore']
                            
                        }
                    })
                    
                    
                

                
            })
        }else{
            
        }
       
      }
      draw(i:number){
        this.lastDrawnCard=i;
        this.client.publish({"destination":"/app/draw","body":JSON.stringify({
            "playerId":this.userService.getUser().id,
            "gameId":this.gameService.game.id
        })})
      }
      fold(){
        this.client.publish({"destination":"/app/fold","body":JSON.stringify({
            "playerId":this.userService.getUser().id,
            "gameId":this.gameService.game.id
        })})
      }
    
}