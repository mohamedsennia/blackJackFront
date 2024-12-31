import { Component } from '@angular/core';
import { WebSocketService } from './Services/WebSocket.sevice';
import { User } from './Models/User.model';
import { UserService } from './Services/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blackJackFront';
  constructor(private userService:UserService){
   
     if(localStorage.getItem('userId')!=null){
  
      let newUser=new User(+localStorage.getItem('userId'),localStorage.getItem('userName'))
     this.userService.setUser(newUser)
     }
   
  }

}
