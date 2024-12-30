import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Card } from '../../Models/Card.model';
import { WebSocketService } from '../../Services/WebSocket.sevice';
import { GameService } from '../../Services/Game.service';
import { ApiService } from '../../Services/Api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  animations: [
    trigger('drawCard', [
      state('*', style({
        transform: 'translate({{x}}vw, {{y}}vh) rotateY({{z}}deg)'
        
      }), { params: { x: 5, y: 5 ,z:0} }),
      transition('* => *', [
        animate('800ms ease-in-out')
      ])
    ]),
    
  ],
  
})
export class GameComponent {
  translateX=-90
  playerTranslateY=8
  player2TranslateY=-70;

  private player1Cards:Card[];
  private player2Cards:Card[];
  private i=31;
  public gameStatus:String
  constructor(private webSocketService:WebSocketService,public gameService:GameService,private apiService:ApiService) {
    
    
    this.gameStatus="WAITING";
    this.gameService.gameState.subscribe((param)=>{
      console.log(param)
        this.gameStatus=param
        if(param=="FINISHED"){
          this.apiService.getOpponentCards().subscribe(images=>{
            setTimeout(() => {
              for(let i=0;i<images.length;i++){
                console.log(images[i])
                this.player2Cards[i].frontImg=images[i];
                
                this.player2Cards[i].isFlipped=true
              }
            }, 1000);
           
          })
        }
      
    })
    this.gameService.opponentDraw.subscribe(()=>{
      this.player2Draw(this.i)
    })
    this.gameService.cards = [];
    this.player1Cards=[];
    this.player2Cards=[]
    for (let i = 1; i < 33; i++) {
     this.gameService.cards.push(new Card(i,null,null,"assets/cardBack.png","assets/ace2.png",false,0,0))
    }
  }

  draw() {
   if(this.gameService.myTurn){
      if(this.gameService.cards[this.i].Xposition==0){
        this.gameService.cards[this.i].Xposition=this.translateX+(this.player1Cards.length*3)
        this.gameService.cards[this.i].Yposition=this.playerTranslateY+((32-this.i)*2)
       
        this.player1Cards.push(this.gameService.cards[this.i])
        this.webSocketService.draw(this.i)
        this.toggleFlip(this.i)
        this.i--
        if(this.gameService.game.player2.state!="FOLDED"){
          this.gameService.myTurn=false
        }
        
      }
    }else{
       window.alert("please wait for your turn")
    }
   

  }
  player2Draw(i:number){
    this.gameService.cards[i].Xposition=this.translateX+(this.player1Cards.length*3)
    this.gameService.cards[i].Yposition=this.player2TranslateY+((32-i)*2)
   
    this.player2Cards.push(this.gameService.cards[i])
    this.i--
  }
  toggleFlip(i) {
    this.gameService.cards[i].isFlipped=true
  }
  fold(){
    this.webSocketService.fold()
  }
  checkWin(){

    return (this.gameStatus==='FINISHED' && (this.gameService.game.player2.state==='BUSTED'||this.gameService.game.player1.state==='WON'))

  }
  checkLoss(){
    return (this.gameStatus==='FINISHED' && (this.gameService.game.player1.state==='BUSTED' || this.gameService.game.player2.state==='WON'))
  }
  checkTie(){
    return (this.gameStatus==='FINISHED' && (this.gameService.game.player1.state==='TIED' || this.gameService.game.player2.state==='TIED'))
  }
  replay(){
    location.reload()
  }
  checkDisconnection(){
    return (this.gameStatus!='FINISHED'&&(this.gameService.game.player2.state==="DISCONNECTED"))
  }
}