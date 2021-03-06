import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { Router } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { TypeFrais } from 'src/app/models/typeFrais';
import { Projet } from 'src/app/models/Projet';
import { budget } from 'src/app/models/budget';
import { Pays } from 'src/app/models/pays';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { MissionnaireService } from 'src/app/services/missionnaire.service';
import { Missionnaire } from 'src/app/models/missionnaire';
import { frais } from 'src/app/models/frais';
import { budgetProjet } from 'src/app/models/budgetProjet';
import { Mission } from 'src/app/models/mission';
import { AlertService } from 'src/app/services/alert.service';
import { DeptGen } from 'src/app/models/DeptGen';

@Component({
  selector: 'app-frais-mission',
  templateUrl: './frais-mission.component.html',
  styleUrls: ['./frais-mission.component.scss']
})
export class FraisMissionComponent implements OnInit {

  numMission : String ; 
  op:Boolean ; 
  affich:Boolean; 
  ordreMis : ordMiss [] ; 
  checked:Boolean ; 
  OrdMissForm:FormGroup ; 
  payss: Pays[] ; 
  cod :String;
  val_miss:Number; 
  val_trans:Number; 
  budget_mission:budget;
val_mission :String ; 
valeur_trans : String ; 
valeur_budget : Number ; 
val_budget:String ; 
projets: Projet[] ; 
radioProjet:Boolean ; 
typeFrais : TypeFrais [] ; 
FraisForm:FormGroup ; 
Somme : Number ;
fraisMiss : frais ; 
budgetProjet:budgetProjet ; 
diffProjet:Number ; 
val : Number ;
budgetDept : budget ; 
diff : Number ; 
public supportes:Array<string> = [
 'التحمل على الحساب الخاص' ,
 'التحمل على الهيكل المعني' , 
 'التحمل على الهيكل الاجنبي' , 
 ' تحمل مشترك بين الهيكل المعني و الاجنبي '
 ,'التحمل على المشروع'
];
d:number ; 
typFrais :String;
  constructor(private alertService:AlertService ,private missionnaireService :MissionnaireService  ,private ordMissService : OrdMissService,private router : Router, private fb : FormBuilder ,private  missionService : MissionService) { 
   
   this.createForm() ; 
  }
createForm(){
  this.OrdMissForm = this.fb.group({
    codPays:['',Validators.required],
   valeurP:['',Validators.required],
   valeurR:['',Validators.required],
   supporte:['',Validators.required],
    codPrj:['',Validators.required],
    supCode:['',Validators.required],
    //observ:['',Validators.required],
    //aobserv:['',Validators.required],
    typetransport : ['',Validators.required],
    NVille : ['',Validators.required],
    duree: ['',Validators.required],
    typFrais:['',Validators.required]
  }) ; 
}
GoToMission(){
  this.router.navigateByUrl('/stepper') ; 
}
GoToOrd(){
  this.router.navigateByUrl('/ord') ; 
}
valeurR:String ; 
  add(){   
     const m = this.OrdMissForm.value ;
     this.OrdMissForm.value.numMission=this.numMission ; 
     this.OrdMissForm.value.numord=this.num_ord ; 
     this.OrdMissForm.value.cin=this.username;
     this.OrdMissForm.value.code=this.cod ;

  //  this.FraisForm.value.valeurR=+this.valeurR;
 // alert(JSON.stringify(m));

    if (this.d>this.duree){
      this.error('الرجاء التثبت من المدة') ; 
    }
   /* console.log(this.OrdMissForm.value) ; 
    this.OrdMissForm.value.numMission=this.numMission ; 
    this.OrdMissForm.value.numord=this.num_ord ; 
    this.OrdMissForm.value.cin=this.username;
this.OrdMissForm.value.code=this.cod ;
this.OrdMissForm.value.typFrais=this.typFrais ; */

if(this.d<=this.duree)
   { 
   //  console.log('hay a9al') ; 
     const m = this.OrdMissForm.value ;
   //alert(JSON.stringify(m));
    this.missionService.addFrais(m).subscribe(
      res => {
       this.success('لقد تمت الاضافة بنجاح') ; 

        this.ngOnInit();
       // alert(JSON.stringify(res));
      },
      error=>{ console.log(error);}
    )
  } }

  add1(){
    this.ngOnInit() ; 
     console.log(this.OrdMissForm.value) ; 
     this.OrdMissForm.value.valeurR=this.Somme+"" ; 
     this.OrdMissForm.value.numMission=this.numMission ; 
     this.OrdMissForm.value.numord=this.num_ord ; 
     this.OrdMissForm.value.cin=this.username;
     this.OrdMissForm.value.code=this.cod ;
     const m = this.OrdMissForm.value ;
     this.OrdMissForm.value.typFrais="1" ; 
    // alert(JSON.stringify(m))
    if(this.d>this.duree){alert('الرجاء التثبت في المدة')}
    else{
     this.missionService.addFrais(m).subscribe(
       res => {   
        this.success('لقد تمت الاضافة بنجاح') ; 
        this.fraisMiss=res ; 
       //  console.log('frais',res) ; 
          this.ngOnInit();
          this.getLatestBudgetDept() ; 
       },
       error=>{ console.log(error);}
     ) ; }
   }  

   getLatestBudgetDept(){
    let b : budget = new budget() ; 
    b.code=this.cod ; 
      this.missionService.getBudget(b).subscribe(
      res=> {console.log(res) ;
      this.budgetDept=res[0] ;
      this.val=res[0].valeur_miss ; 
      if(this.fraisMiss.supporte=== 'الهيكل المعني'){
        console.log(this.val,'valeur'); 
        console.log(this.fraisMiss.valeurP,'val reel'); 
        this.diff=(+this.val)-(+this.fraisMiss.valeurP) ; 
        console.log(this.diff,'difference');
        this.budgetDept.valeur_miss=this.diff;  
        this.missionService.updateBudget(this.budgetDept).subscribe(
        res=>{console.log(res);
        console.log('update ')},
        error =>{console.log(error);},
        ()=>{console.log('done update budget');}
        );
  };


   
  if(this.fraisMiss.supporte=== 'مشروع'){
    let b : DeptGen= new DeptGen() ; 
    b.code= this.cod ;
    this.missionService.getBudgetsProjet(b).subscribe(
    res=>{console.log(res) ; 
    this.budgetProjet=res[0] ;
    console.log(this.budgetProjet.valeur,'budget valeur') ; 
    console.log(this.fraisMiss.valeurP);
    this.diffProjet=(+this.budgetProjet.valeur)-(+this.fraisMiss.valeurP) ; 
    this.budgetProjet.valeur=this.diffProjet ; 
    console.log('diff',this.diffProjet);
    this.missionService.updateBudgetProjet(this.budgetProjet).subscribe(
     res=>{console.log(res);
     console.log('update ')},
     error =>{console.log(error);},
     ()=>{console.log('done update budget');}
     );

 },
   error=>{console.log(error) ;},
   ()=>{console.log('done budget projet ');}) ;
 };
 if(this.fraisMiss.supCode==='تحمل مشترك بين الهيكل المعني و الاجنبي'){
  console.log('val',this.val); 
  console.log('valeup',this.fraisMiss.valeurP); 
  this.diff=(+this.val)-((+this.fraisMiss.valeurP)/3) ; 
  console.log(this.diff,'difference');
  this.budgetDept.valeur_miss=this.diff;  
  this.missionService.updateBudget(this.budgetDept).subscribe(
  res=>{console.log(res);
  console.log('update ')},
  error =>{console.log(error);},
  ()=>{console.log('done update budget');}
  );

} ; 
if(this.fraisMiss.supporte==='الهيكل المضبف'){
console.log('il y a pas de changements de budget') ; 
} ; 

      console.log('budget',this.budgetDept ,'val',this.val);},
      error=>{console.log(error) ; } ,
       () => {console.log('done') ; }) ;

   

   }
  
  toggleRadio(event) {
    if ( event.target.checked) {
      this.radioProjet=true;
    
   }
 else
     {this.radioProjet=false ;}
}
  toggleEditable(event) {
    if ( event.target.checked ) {
        this.op= true;
    
   }
 else
     {this.op=false ;    }
}

loadBudget(cod : String){
  let budgt:budget = new budget() ; 
  budgt.code=this.cod ; 
  this.missionService.getBudget(budgt).subscribe(
    data => { this.budget_mission=data;
    console.log(this.budget_mission) ;
    this.val_miss=this.budget_mission.valeur_miss ; 
    console.log(this.budget_mission.valeur_miss) ; 
    this.val_mission=this.val_miss+'';
    this.val_trans=this.budget_mission.valeur_tr ; 
    this.valeur_trans=this.val_trans+''; 
    this.valeur_budget=+this.val_miss + +this.val_trans ; 
    this.val_budget=this.valeur_budget+'' ; 
    console.log(this.val_budget);
 },
    error => {console.log(error); } , 
    () => {console.log('loading budget was done ') ; }
  )}
  loadpays()
  {this.missionService.getPays().subscribe(
    data => { this.payss=data;},
    error => {console.log(error); } , 
    () => {console.log('loading pays was done ')}
  )}
  loadTypeFrais()
  {this.missionService.getTypeFrais().subscribe(
    data => { this.typeFrais=data;
    console.log(data);},
    error => {console.log(error); } , 
    () => {console.log('loading frais was done ')}
  )}

 
loadProjets()
  {
    
    let d:DeptGen= new DeptGen() ; 
    d.code=this.cod ;
    this.missionService.getprojets(d).subscribe(
    data => { this.projets=data;},
    error => {console.log(error); } , 
    () => {console.log('loading projets was done ');}
  )}
  num_ord:String ;
  codeMission:String ; 
  username:String ;
  
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

  loadOrdeMission(numMission:String)
  {
    let o : ordMiss=new ordMiss() ; 
    o.numMission=this.numMission ; 
    this.ordMissService.getOrdreMission(o).subscribe(
    data => { this.ordreMis=data ; 
      console.log("done");},
    error => {console.log(error); } , 
    () => {console.log('loading ordres was done ')}
  )}
nom:String ; 
prenom : String ; 
duree:number ; 
selectedMission:Mission=new Mission() ; 
selectedOrd:ordMiss=new ordMiss() ; 
  ngOnInit() {



    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
       
     

        var DeptGenVal = localStorage.getItem('deptGen') ; 
        var data = JSON.parse(DeptGenVal) ; 
        this.depart=data.departement;



    this.selectedMission=JSON.parse(localStorage.getItem('selectedMission')) ; 
    this.selectedOrd=JSON.parse(localStorage.getItem('selectedOrd')) ; 
    this.codeMission =this.selectedMission.code ; //JSON.parse(localStorage.getItem('num_mission')) ;
   // console.log('noum Mission',this.codeMission);   
    this.num_ord =this.selectedOrd.numord+"" ; //JSON.parse(localStorage.getItem('numOrd')) ;
    console.log('numOrd',this.num_ord);   
    this.username =this.selectedOrd.cin ; //localStorage.getItem('cin');
    console.log("username: "+this.username) ; 
    this.getMissionnaire() ; 
   
    this.duree =+this.selectedOrd.duree ; //JSON.parse(localStorage.getItem('duree_ord'));
    

    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.departement.code);
    this.cod=data.departement.code;
    this.loadpays() ; 
    this.loadBudget(this.cod) ;
    this.numMission=this.selectedMission.numMission ;//JSON.parse(localStorage.getItem('num_mission'));
    console.log('op',this.op) ; 
    this.loadProjets() ; 
    this.loadTypeFrais() ;
    this.loadOrdeMission(this.numMission) ;
    this.getMissionnaire() ; 
    resolve();
  }, 1000);

})
 
  }
  name: string = '';
  name1: string = '';
  _timeout: any = null;
  displayName(){
    this._timeout  = null;
    if(this._timeout){ 
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
       this._timeout = null;
    this.calcul() ; 
    },1000);
 
}
  missionnaire : Missionnaire = new Missionnaire(); 
  calcul(){
    let s = +this.d ; 
    console.log(this.d) ; 
    console.log(s) ; 
    if(this.missionnaire.groupe=='A'){
      this.Somme = 200 * s ; }
      else if (this.missionnaire.groupe=='B'){
        this.Somme=160* s ;
      }
      else if (this.missionnaire.groupe=='C'){
        this.Somme=130*s ; 
      }
      console.log('somme',this.Somme) ; 
  }
  depart:DeptGen ; 
  getMissionnaire(){
    let m : Missionnaire= new Missionnaire() ;
    m.cin=this.username ; 
    m.code=this.depart ; 
    //alert(JSON.stringify(m) ); 
    this.missionnaireService.getOneMiss(m).subscribe(
      data=>{console.log(data);
        this.missionnaire=data ;
        this.nom = this.missionnaire.nom ; //localStorage.getItem('nom');
        console.log("nom: "+this.nom) ; 
        this.prenom =this.missionnaire.prenom;  //localStorage.getItem('prenom');
        console.log("prenom: "+this.prenom) ; 
    } , 
      error => { console.log(error) ; } , 
      ()=>{console.log('done') ; }
    ) ; 
  }
  initialiser(){
 this.OrdMissForm.reset();
 this.ngOnInit() ; 
this.OrdMissForm.value.numMission=this.numMission ; 
this.OrdMissForm.value.numord=this.num_ord ; 
this.OrdMissForm.value.cin=this.username;
this.OrdMissForm.value.code=this.cod ;
this.OrdMissForm.value.typFrais=this.typFrais;



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
