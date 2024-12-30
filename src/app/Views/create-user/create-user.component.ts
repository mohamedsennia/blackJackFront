import { Component } from '@angular/core';
import { UserService } from '../../Services/UserService';
import { User } from '../../Models/User.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../Services/Api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
 public username:string
 public errorMessage:string
 constructor(private userService:UserService,private router:Router,private location:Location,private apiService:ApiService){
  this.username=""
  this.errorMessage=""
 }
 joinGame(){
    if(this.username==""){
      this.errorMessage="Please enter a user name"
    }else{
      this.apiService.addUser(new User(1,this.username)).subscribe(user=>{
        this.userService.setUser(user)
        this.router.navigate(["/game"])
      },error=>{
        this.errorMessage=error['error']
      })
      
    }
 }
 navigateBack(){
  this.location.back()
 }
 clearErrorMessage(){
  this.errorMessage=""
 }
}
