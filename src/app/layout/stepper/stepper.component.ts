import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

affich:boolean ; 
affich2:boolean ;
affich3:boolean;

validOrd:boolean ; 
validFrais : boolean ; 
  constructor(private router : Router) {
  }

  ngOnInit() {
  this.validOrd=false ; 
  this.validFrais=false ; 
  this.affich=true ; 
   
    
  }
  goToOrdMiss(){
    this.router.navigateByUrl('/ord') ; 
  }
  goToFrais(){
    this.router.navigateByUrl('/frais') ; 
  }

 
}

