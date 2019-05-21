import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { budget } from 'src/app/models/budget';
import { MissionService } from 'src/app/services/mission.service';
import { budgetProjet } from 'src/app/models/budgetProjet';
import { Projet } from 'src/app/models/Projet';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-validation-bud-proj',
  templateUrl: './validation-bud-proj.component.html',
  styleUrls: ['./validation-bud-proj.component.scss']
})
export class ValidationBudProjComponent implements OnInit {

  codeDept:String ; 
  y :String='' ;
  d:Date ; 
  val : Boolean; 
  dateSys : Date = new Date() ; 
  year : number ; 
  BudgetProjForm:FormGroup ;
  projets : Projet[] ; 
  operationBudg:String ; 
  budgets :Array<budget>[] =new Array(); 
  selectedBudgetProj:budgetProjet = new budgetProjet(); 
  show: boolean ; 
 constructor(private alertService:AlertService, private Fb:FormBuilder , private missionService:MissionService){
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
   selectedBudget:budgetProjet ; 
   select:Boolean=false ; 
   selected(){
     this.select=true ; 
     console.log("this budget",this.selectedBudget) ; 
   }
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
   loadBudgets()
   {
    this.missionService.getAllBudgetProjets().subscribe(
     data => { 
     
      for (let x of data) {
        if (x.dateVal==null || x.dateVal==undefined)
        {console.log('date Val null',x) ;
        this.budgets.push(x) ; 
        this.show=true ; 
        }
}
if(this.budgets.length==0){
  this.show=false ; 
}
    },
     error => {console.log(error); } , 
     () => {console.log('loading budgets was done ');}
   )}
 

 add(){
   console.log(this.BudgetProjForm.value) ; 
   const m = this.BudgetProjForm.value ;
  // alert(JSON.stringify(m));
   this.missionService.addBudgetProj(m).subscribe(
     res => {
      // this.loadBudgets(); 
      if(res.dateVal===null || res.dateVal===undefined)
      {
        this.val=false ; 
      }
   
     // alert(JSON.stringify(res));  
      this.initialiser() ; 
      
      this.operationBudg='' ;  
     // window.location.reload() ; 

     
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
     window.location.reload() ; 

    }
  ) ; 
} 
  
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
 ValiderMission(){
    console.log('valider') ;
    console.log(this.selectedBudget) ;
 this.selectedBudget.dateVal=new Date();
 this.missionService.validerBudget(this.selectedBudget).subscribe(data=>{
  this.success(' لقد تمت المصادقة بنجاح');
  // console.log(data); 
   this.select=false ; 
  // window.location.reload() ; 

 }, 
 error => {console.log(error) ;
this.error('لم تتم المصادقة بنجاح') } , 
 () => {console.log('done');}
 );
  
 }

 error(message: string) {
  this.alertService.error(message);
}

info(message: string) {
  this.alertService.info(message);
}

warn(message: string) {
  this.alertService.warn(message);
}
clear() {
  this.alertService.clear();
}
success(message: string) { 
  this.alertService.success(message);
}
}

