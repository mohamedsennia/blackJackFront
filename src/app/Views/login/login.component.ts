import { Component } from '@angular/core';
import { WebSocketService } from '../../Services/WebSocket.sevice';
import { ApiService } from '../../Services/Api.service';
import { User } from '../../Models/User.model';
import { UserService } from '../../Services/UserService';
import { GameService } from '../../Services/Game.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
constructor(private router:Router){

}
startGame(){
  this.router.navigate(["/game"])
}
}
