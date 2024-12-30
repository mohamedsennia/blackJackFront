import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./Services/UserService";

@Injectable({providedIn:"root"})
class AuthGuardService{
    constructor(private router:Router,private userService:UserService){

    }
    canActivate( next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>{
      if(this.userService.getUser()!=null){
        return true
      }else{
        this.router.navigate(['/createUser'])
      }
      return false;
    }
}
export const authGuard:CanActivateFn=(next:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>|Promise<boolean>=>{
    return inject(AuthGuardService).canActivate(next,state);
}
