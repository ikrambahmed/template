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
public supportes:Array<string> = [
 'التحمل على الحساب الخاص' ,
 'التحمل على الهيكل المعني'
];
d:number ; 
typFrais :String;
  constructor(private ordMissService : OrdMissService,private router : Router, private fb : FormBuilder ,private  missionService : MissionService) { 
   
   this.createForm() ; 
  }
createForm(){
  this.OrdMissForm = this.fb.group({
    numMission: ['',Validators.required],
    numord: ['',Validators.required],
    cin  :['',Validators.required],
    code:['',Validators.required] ,
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

  add(){
    if (this.d>this.duree){
      alert("erreur duree") ;
    }
   /* console.log(this.OrdMissForm.value) ; 
    this.OrdMissForm.value.numMission=this.numMission ; 
    this.OrdMissForm.value.numord=this.num_ord ; 
    this.OrdMissForm.value.cin=this.username;
this.OrdMissForm.value.code=this.cod ;
this.OrdMissForm.value.typFrais=this.typFrais ; 
*/
if(this.d<=this.duree)
   { 
     console.log('hay a9al') ; 
     const m = this.OrdMissForm.value ;
    alert(JSON.stringify(m));
    this.missionService.addFrais(m).subscribe(
      res => {
        this.ngOnInit();
        alert(JSON.stringify(res));
      },
      error=>{ console.log(error);}
    )
 //this.router.navigateByUrl('recap') ; 
  }  }

  add1(){
    this.ngOnInit() ; 
     console.log(this.OrdMissForm.value) ; 
     this.OrdMissForm.value.numMission=this.numMission ; 
     this.OrdMissForm.value.numord=this.num_ord ; 
     this.OrdMissForm.value.cin=this.username;
 this.OrdMissForm.value.code=this.cod ;
 //this.OrdMissForm.value.typFrais=this.typFrais ; 
 
     const m = this.OrdMissForm.value ;
     this.OrdMissForm.value.typFrais="1" ; 
     console.log("3malnaa el assignements") ; 
     alert(JSON.stringify(m));
     this.missionService.addFrais(m).subscribe(
       res => {
         console.log('lkina res'); 
          this.ngOnInit();
         alert(JSON.stringify(res));
       },
       error=>{ console.log(error);}
     )
  //this.router.navigateByUrl('recap') ; 
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

loadBudget(cod : String){this.missionService.getBudget(this.cod).subscribe(
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
  {this.missionService.getProjet(this.cod).subscribe(
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
  {this.ordMissService.getOrdreMission(this.numMission).subscribe(
    data => { this.ordreMis=data ; 
      console.log("done");},
    error => {console.log(error); } , 
    () => {console.log('loading ordres was done ')}
  )}
nom:String ; 
prenom : String ; 
duree:number ; 
  ngOnInit() {
    this.codeMission = JSON.parse(localStorage.getItem('num_mission')) ;
    console.log('noum Mission',this.codeMission);   
    this.num_ord = JSON.parse(localStorage.getItem('numOrd')) ;
    console.log('numOrd',this.num_ord);   
    this.username = localStorage.getItem('cin');
    console.log("username: "+this.username) ; 
    this.nom = localStorage.getItem('nom');
    console.log("nom: "+this.nom) ; 
    this.prenom = localStorage.getItem('prenom');
    console.log("prenom: "+this.prenom) ; 
    this.duree = JSON.parse(localStorage.getItem('duree_ord'));
    

    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.departement.code);
    this.cod=data.departement.code;
    this.loadpays() ; 
    this.loadBudget(this.cod) ;
    this.numMission=JSON.parse(localStorage.getItem('num_mission'));
    console.log('op',this.op) ; 
    this.loadProjets() ; 
    this.loadTypeFrais() ;
    this.loadOrdeMission(this.numMission) ;   
 
  }
  initialiser(){
 // this.createForm();
 //this.OrdMissForm=new frais() ;
 this.OrdMissForm.reset();
 this.ngOnInit() ; 
 //this.username = localStorage.getItem('cin');

 this.OrdMissForm.value.numMission=this.numMission ; 
  this.OrdMissForm.value.numord=this.num_ord ; 
  this.OrdMissForm.value.cin=this.username;
this.OrdMissForm.value.code=this.cod ;
this.OrdMissForm.value.typFrais=this.typFrais;

  }
}
