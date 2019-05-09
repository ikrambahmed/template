import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Projet } from '../models/Projet';
import { MissionService } from '../services/mission.service';
import { budget } from '../models/budget';
import { budgetProjet } from '../models/budgetProjet';

@Component({
  selector: 'app-budget-proj',
  templateUrl: './budget-proj.component.html',
  styleUrls: ['./budget-proj.component.scss']
})

export class BudgetProjComponent implements OnInit {
  codeDept:String ; 
  y :String='' ;
  d:Date ; 
  val : Boolean; 
  dateSys : Date = new Date() ; 
  year : number ; 
  BudgetProjForm:FormGroup ;
  projets : Projet[] ; 
  operationBudg:String ; 
  selectedBudgetProj:budgetProjet = new budgetProjet(); 
 constructor(private Fb:FormBuilder , private missionService:MissionService){
 this.createForm() ; 
 }
 createForm()
 {   
   this.BudgetProjForm = this.Fb.group({
     codPrj: ['',Validators.required],
     reference: ['',Validators.required],
     valeur :['',Validators.required],
     code : ['',Validators.required],
     dateBproj : ['',Validators.required]
   })}


 ngOnInit() {
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.departement.code) ;
   this.codeDept=data.departement.code;

  this.d = new Date() ; 
  this.year= this.d.getFullYear() ;   
  this.y=this.year+"" ; 
  console.log(this.year.toString()) ; 
  console.log(this.y) ;
  this.loadProjet() ; 
  this.loadBudgets() ; 
 }
 budgets : budget[] ; 
   loadBudgets()
   {this.missionService.getBudgetsProjet(this.codeDept).subscribe(
     data => { this.budgets=data;
      if((data===null)||(data===undefined)|| (data.length==0))
      this.val=false ;
      else 
      {
      for (let entry of data) {
        console.log(entry.date_val)
if(entry.dateVal===null || entry.dateVal===undefined)
{console.log('date fergha')
this.val=true ; 
      }
      else this.val=false  ; 
}}
    },
     error => {console.log(error); } , 
     () => {console.log('loading budgets was done ');}
   )}
 

 add(){
   console.log(this.BudgetProjForm.value) ; 
   const m = this.BudgetProjForm.value ;
   alert(JSON.stringify(m));
   this.missionService.addBudgetProj(m).subscribe(
     res => {
      // this.loadBudgets(); 
      if(res.dateVal===null || res.dateVal===undefined)
      {
        this.val=false ; 
      }
   
      alert(JSON.stringify(res));  
      this.initialiser() ; 
      this.operationBudg='' ;  

     
     }    
   )
 } 
  
 update(){
  this.missionService.updateBudgetProjet(this.selectedBudgetProj)
  .subscribe(
    res =>{
      this.operationBudg='' ; 

      this.loadBudgets() ; 
     this.initialiser();
    }
  )} 
  
 loadProjet()
 {this.missionService.getProjet(this.codeDept).subscribe(
   data => { this.projets=data;},
   error => {console.log(error); } , 
   () => {console.log('loading projets was done') ;}
 )}

 initialiser(){
this.selectedBudgetProj=new budgetProjet() ; 
this.createForm() ;
 }

}

