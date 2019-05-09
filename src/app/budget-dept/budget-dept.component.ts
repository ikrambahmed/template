import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from '../services/mission.service';
import { budget } from '../models/budget';
@Component({
  selector: 'app-budget-dept',
  templateUrl: './budget-dept.component.html',
  styleUrls: ['./budget-dept.component.scss']
})
export class BudgetDeptComponent implements OnInit {

  BudgetDeptForm:FormGroup ; 
  budgets : budget[] ;
  val:boolean; 
  selectedBudget:budget=new budget() ; 
  y :String='' ;
  d:Date ; 
  year : number ; 
  dataSys :Date = new Date() ;
  cod : String ;  
  operation:String ; 
  constructor(private fb : FormBuilder ,  private missionService: MissionService) { 
    this.createForm() ; 

  }
  createForm()
  {
    this.BudgetDeptForm = this.fb.group({
      date_budg: ['',Validators.required],
      valeur_miss: ['',Validators.required],
      reference_mis :['',Validators.required],
      valeur_tr: ['',Validators.required],
      reference_tr: ['',Validators.required] , 
      code : ['',Validators.required] 
    })}
 
    loadBudgets()
    {this.missionService.getBudgets(this.cod).subscribe(
      data => {
        if((data===null)||(data===undefined)|| (data.length==0))
        this.val=false ;
      else
      {
        this.budgets=data;
      console.log(data) ; 
      for (let entry of data) {
        console.log(entry.date_val)
       if(entry.date_val==null)
       {console.log('date fergha')
       this.val=true ; 
      }
      else this.val=false  ; 
}}},
      error => {console.log(error); } , 
      () => {console.log('loading budgets was done ')}
    )}
  
    editOp()
  {
    this.operation='EDIT' ; 
  }
  
  update(){
    this.missionService.updateBudget(this.selectedBudget)
    .subscribe(
      res =>{
        this.loadBudgets() ; 
        this.initialiser() ; 
        this.operation='' ; 
      }
    )} 
  
  add(){
        console.log(this.BudgetDeptForm.value) ; 
        const m = this.BudgetDeptForm.value ;
        alert(JSON.stringify(m));
        this.missionService.addBudgetDept(m).subscribe(
          res => {
            this.loadBudgets() ; 
            this.initialiser() ;
          //  alert(JSON.stringify(res));   
            this.operation='' ;  
          }    
        )
      }   
   
  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.departement.code) ;
    this.cod=data.departement.code;
    this.d = new Date() ; 
    this.year= this.d.getFullYear() ;   
    this.y=this.year+"" ; 
    console.log(this.year.toString()) ; 
    console.log(this.y) ;
    this.loadBudgets() ; 
  }
  initialiser(){
    this.selectedBudget=new budget() ; 
    this.createForm() ;
     }
    

}
