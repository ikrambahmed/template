import { Component, OnInit } from '@angular/core';
import { budget } from 'src/app/models/budget';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MissionService } from 'src/app/services/mission.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-validation-budget',
  templateUrl: './validation-budget.component.html',
  styleUrls: ['./validation-budget.component.scss']
})
export class ValidationBudgetComponent implements OnInit {

  BudgetDeptForm:FormGroup ; 
  budgets :Array<budget>[] = new Array() ;
  val:boolean; 
  selectedBudget:budget=new budget() ; 
  y :String='' ;
  d:Date ; 
  year : number ; 
  dataSys :Date = new Date() ;
  cod : String ;  
  operation:String ; 
  searchText:String ; 
  constructor(private alertService : AlertService ,  private fb : FormBuilder ,  private missionService: MissionService) { 
    this.createForm() ; 

  }
  select:Boolean=false ; 
  selected(){
    this.select=true ; 
    console.log("this budget",this.selectedBudget) ; 
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
    valider(){
      console.log('valider') ;
      console.log(this.selectedBudget) ;
   this.selectedBudget.date_val=new Date();
   this.missionService.validerBudgetProjet(this.selectedBudget).subscribe(data=>{
     this.success(' لقد تمت المصادقة بنجاح');
    console.log(data); 
     this.select=false ; 
     //window.location.reload() ; 

   }, 
   error => {console.log(error) ;
    this.error('لم تتم المصادقة على اعتمادات المؤسسة')
  } , 
   () => {console.log('done');}
   );
    
   
    }
 show : boolean ; 
    loadBudgets()
    {this.missionService.getAllBudgetDepts().subscribe(
      data => {
        console.log(this.budgets)
      for (let entry of data) {
       
       if(entry.date_val==null || entry.date_val==undefined)
       {console.log('date fergha')
       this.budgets.push(entry) ; 
       this.show=true ; 
}
if (this.budgets.length==0){
  this.show = false ; 
}}},
      error => {console.log(error); } , 
      () => {console.log('loading budgets was done ')}
    )}
  
 
  
  update(){
    this.missionService.updateBudget(this.selectedBudget)
    .subscribe(
      res =>{
        this.loadBudgets() ; 
        this.initialiser() ; 
        this.operation='' ; 
        window.location.reload() ; 

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
            window.location.reload() ; 

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