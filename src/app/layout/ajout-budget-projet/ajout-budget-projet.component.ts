import { Component, OnInit } from '@angular/core';
import { budgetProjet } from 'src/app/models/budgetProjet';
import { budget } from 'src/app/models/budget';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MissionService } from 'src/app/services/mission.service';
import { Projet } from 'src/app/models/Projet';

@Component({
  selector: 'app-ajout-budget-projet',
  templateUrl: './ajout-budget-projet.component.html',
  styleUrls: ['./ajout-budget-projet.component.scss']
})
export class AjoutBudgetProjetComponent implements OnInit {

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
 budgets : budgetProjet[] ; 
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
   this.BudgetProjForm.value.code=this.codeDept ; 
   this.BudgetProjForm.value.dateBproj=this.dateSys ; 
   const m = this.BudgetProjForm.value ;
   this.missionService.addBudgetProj(m).subscribe(
     res => {
    alert('لقد تمت الاضافة بنجاح') 
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

