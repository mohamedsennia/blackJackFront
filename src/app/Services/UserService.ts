import { Injectable } from "@angular/core";
import { User } from "../Models/User.model";

@Injectable({
    providedIn:"root"
})
export class UserService{
    private user:User;
    constructor(){
        this.user=null
    }
    setUser(user:User){
        this.user=user;
    }
    getUser():User{
        return this.user;
    }
}