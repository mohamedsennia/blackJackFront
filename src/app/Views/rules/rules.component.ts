import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {
  constructor(private location:Location){

  }
  navigateBack(){
    this.location.back()
   }
}
