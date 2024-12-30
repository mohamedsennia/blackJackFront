import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Views/login/login.component';
import { GameComponent } from './Views/game/game.component';
import { CreateUserComponent } from './Views/create-user/create-user.component';
import { authGuard } from './auth-guard.service';
import { RulesComponent } from './Views/rules/rules.component';

const routes: Routes = [{path:"",component:LoginComponent,pathMatch:"full"},
  {path:"game",component:GameComponent,canActivate:[authGuard]},
  {path:"createUser",component:CreateUserComponent},
  {path:"rules",component:RulesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
