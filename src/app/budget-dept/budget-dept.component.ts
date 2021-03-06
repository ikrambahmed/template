import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MissionService } from '../services/mission.service';
import { budget } from '../models/budget';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-budget-dept',
  templateUrl: './budget-dept.component.html',
  styleUrls: ['./budget-dept.component.scss']
})
export class BudgetDeptComponent implements OnInit {
  enabled:boolean=true; 
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
  constructor(private alertService :AlertService  ,private fb : FormBuilder ,  private missionService: MissionService) { 
    this.createForm() ; 

  }
  createForm()
  {
    this.BudgetDeptForm = this.fb.group({
      valeur_miss: ['',Validators.required],
      reference_mis :['',Validators.required],
      valeur_tr: ['',Validators.required],
      reference_tr: ['',Validators.required] , 
    })}
    entry:number=0 ; 
    somme : number =0 ;    
    sommeTr : number=0 ; 
    loadBudgets()
    {
      let budg : budget = new budget() ; 
      budg.code=this.cod ; 
      this.missionService.getBudget(budg).subscribe(
      data => {
        console.log('data',data) ; 
        if((data===null)||(data===undefined)|| (data.length==0))
        this.val=false ;
      else
      { this.budgets=data;

      console.log(data,'dataaaaaa') ; 
      while((this.entry<=data.length) && (this.val!=true))
{      console.log(data[this.entry].date_val )
       if(data[this.entry].date_val===null )
       {console.log('date fergha')
       this.val=true ; 
      }
      else this.val=false  ; 
      this.sommeTr=this.sommeTr+data[this.entry].valeur_tr ; 
      this.somme=this.somme+data[this.entry].valeur_miss ; 
      this.entry=this.entry+1 ; 
      }
    }},
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
        this.success('لقد تم التغيير بنجاح') ;
       // this.initialiser() ; 
        this.loadBudgets() ; 
        this.operation='' ; 
      }
    );} 
  
  add(){
    this.BudgetDeptForm.value.date_budg=this.dataSys ; 
    this.BudgetDeptForm.value.code=this.cod ; 
        console.log(this.BudgetDeptForm.value) ; 
        const m = this.BudgetDeptForm.value ;
       // alert(JSON.stringify(m));
        this.missionService.addBudgetDept(m).subscribe(
          res => {
            this.success('لقد تمت الاضافة بنجاح') ; 
           this.enabled=false;
           // this.initialiser() ;
            var promise = new Promise((resolve, reject) => {
              setTimeout(() => {
                this.loadBudgets() ; 
       
                resolve();
              }, 1000);
            })
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
