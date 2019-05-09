import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

affich:boolean ; 
affich2:boolean ;
affich3:boolean;


  constructor() {
  }

  ngOnInit() {
  this.affich=true ; 
   
   

    
  }

 
}

