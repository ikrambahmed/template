import { Component, OnInit } from '@angular/core';
import { ordMiss } from '../../models/Ord_Miss';
import { OrdMissService } from '../../services/ord-miss.service';
import { Mission } from '../../models/mission';
import { MissionService } from '../../services/mission.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Missionnaire } from '../../models/missionnaire';
import { MissionnaireService } from '../../services/missionnaire.service';
import { frais } from '../../models/frais';
import { Principal } from 'src/app/shared/principal.model';
import { Store } from '@ngrx/store';
import { PrincipalState } from 'src/app/shared/principal.state';
import { DeptGen } from 'src/app/models/DeptGen';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation-ctrlmission',
  templateUrl: './validation-ctrlmission.component.html',
  styleUrls: ['./validation-ctrlmission.component.scss']
})
export class ValidationCTRLMissionComponent implements OnInit {

  showIt:Boolean;
  depts:DeptGen[] ; 
  private principal : Principal ; 
  cod:String ; 
  fraisMiss: frais[] ; 
  ordMiss:ordMiss ; 
  miss : Mission = new Mission(); 
  objet : String ; 
  ord:ordMiss ; 
  selectedOrd:ordMiss ; 
  cin :String ; 
  nom : String ; 
  prenom : String ; 
  name : String ;
  dateAller:Date ; 
  dateRetour : Date ; 
  mission : Mission ; 
  numOrd : Number; 
 hasRole :Boolean=false ; 
 validationForm:FormGroup ; 
 depart:DeptGen ; 
 listMission: Array<Mission> = [];
 ords:Array<ordMiss>=[];
 clicked:Boolean ; 


  constructor(private router : Router,private homeService :HomeService  ,private store : Store<PrincipalState> , private missionnaireService :MissionnaireService ,private fb : FormBuilder,private ordMisService : OrdMissService, private missionService : MissionService) {
    this.createForm() ; 
   }

  ngOnInit() {
    this.selectedOrd = new ordMiss() ;  
    this.mission = new Mission() ;
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.departement.code) ;
    this.cod=data.departement.code;
    //this.loadOrdreMission() ;
    console.log('localStorage' , JSON.parse(localStorage.getItem('principal'))) ; 
    this.principal=JSON.parse(localStorage.getItem('principal')) 
    console.log(this.hasRoleUser()) ; 
    this.loadDepartments() ;   }
   
    ListMissionValid(){
      this.ords.length = 0 ; 
      this.showIt=false ; 
      this.loadOrdreMission() ;
      console.log('searching ...',this.listMission) ; 
    }

    loadDepartments()  {this.homeService.getDepartments()
      .subscribe(
      data => { this.depts=data ; 
  },
      error => {console.log(error) } , 
      () => {console.log('loading depts was done ')}
    )
  
    }
 loadOrdreMission()
  {
    let o:ordMiss=new ordMiss() ; 
o.code=this.depart.code ; 
    this.ordMisService.getOrdsMiss(o)
    .subscribe(
    data => { 
      console.log(data ,'data') ; 
      for (let o of data) {
        if (o.etat =='V')
        {this.ords.push(o) ;
          console.log(this.ords,'ords',o,'o');
        }
      }
      if(this.ords.length>0){this.showIt=true ; }
      console.log('listM',this.listMission)

    console.log('ord',this.ords) ; 
  console.log('data ord',data);


},
    error => {console.log(error) } , 
    () => {console.log('loading ordres was done ')}
  )

  }
num:String ; 
 loadMission()
 {
   console.log('ikram') ; 
   console.log(this.selectedOrd) ;
   this.num=this.selectedOrd.numMission ; 
    console.log(this.selectedOrd.numMission) ; 
    console.log('num',this.num) ; 
    console.log('cod',this.cod) ; 
    this.miss.numMission=this.num; 
    this.miss.code=this.cod; 
    console.log(this.objet) ; 
    console.log(this.miss ,'l mission') ; 
    console.log(this.miss.code) ; 
    console.log(this.miss.numMission) ; 
    this.missionService.getOneMission(this.miss).subscribe(
    data => { this.mission=data;
    console.log(data);
    this.objet =data.objeta ; 
    console.log(this.mission);},
    error => {console.log(error)}, 
    () => {console.log('loading mission was done ')}
  )

  }
  createForm()
{
  this.validationForm = this.fb.group({
    objeta: ['',Validators.required],
    
})
}
cinF :String;
 numMissF :String ; ; 
 numF : Number;
loadMissionnaire()
 {console.log('cin') ; 
 let m :Missionnaire= new Missionnaire() ; 
 m.cin=this.selectedOrd.cin ; 
m.code.code=this.cod ; 
this.missionnaireService.getOneMiss(m).subscribe(
  data=>{console.log(data);
  console.log('data missionnaire',data);
this.nom=data.nom ; 
this.prenom=data.prenom ;
this.name=this.nom+' '+this.prenom ; 
this.cin=data.cin ; 
let i=0; 
let found : Boolean=false; 
console.log(this.ords.length) ; 

this.cinF = this.selectedOrd.cin ;
this.numMissF= this.selectedOrd.numMission ;
this.numF= this.selectedOrd.numord ;

  console.log('el if tawa') ; 
  this.dateAller=this.selectedOrd.datdepP ; 
  this.dateRetour=this.selectedOrd.datarrP ; 
  this.numOrd = this.selectedOrd.numord ; 

this.loadFraisMission(this.cod,this.numMissF,this.cinF,this.numF ) ; 


},
  error => {console.log(error)}, 
  () => {console.log('loading ords was done ');})

  }

  loadFraisMission(code : String , numMission:String , cin : String , numOrd:Number )
  { let f:frais=new frais() ; 
    f.code=this.cod ; 
    f.numMission=numMission ; 
    f.numord=this.numOrd ; 
    f.cin=cin ; 
    console.log('données kbal el services',cin , numMission , numOrd , code)
    this.missionService.getFraisMission(f)
    .subscribe(
    data => {
      this.fraisMiss=data ; 
    console.log(this.fraisMiss) ; 
},
    error => {console.log(error) } , 
    () => {console.log('loading frais was done ');
  }
  ) ; 
 }
 annulerMission(){

  console.log(this.selectedOrd) ;
  this.selectedOrd.etat='A';
  this.missionService.validerMission(this.selectedOrd).subscribe(data=>{
    console.log(data); 
    alert('لقد تم الغاء المامورية') ;
    this.initialiser(); 
    this.ngOnInit(); 
    this.ListMissionValid(); 
    window.location.reload() ; 

  },
  error => {console.log(error) ; } , 
  () => {console.log('done');}
  );
 }
 initialiser(){
  this.objet="";
this.cin="" ; 
this.name="" ; 
this.dateAller=new Date() ; 
this.dateRetour= new Date() ; 
this.fraisMiss.length=0 ; 
}
 validation(){
   console.log('valider') ;
   console.log(this.selectedOrd) ;
this.selectedOrd.etat='V';
this.missionService.validerMission(this.selectedOrd).subscribe(data=>{
  console.log(data) ; 
  alert(' لقد تمت المصادقة بنجاح') ; 
  this.initialiser(); 
  window.location.reload() ; 


} , 
error => {console.log(error) ; } , 
() => {console.log('done');}
);
 }
 hasRoleCTRL:boolean ; 
 AttendreMission(){
  console.log(this.selectedOrd) ;
  this.selectedOrd.etat='I';
  this.missionService.validerMission(this.selectedOrd).subscribe(data=>{
    console.log(data) ; 
    alert('لقد تم وضع المامورية في الانتظار')
    this.initialiser(); 
    window.location.reload() ; 

  } , 
  error => {console.log(error) ; } , 
  () => {console.log('done');}
  )
  

  
 }
 hasRoleController(){
  this.principal.authorities.forEach(item => {
    if (item.authority === 'ROLE_CONTROL')
    {
      this.hasRoleCTRL=true ;  
      console.log('role controller') ; 
    }
    
  });
  return this.hasRoleCTRL ; 
}
 

 hasRoleUser(){
   this.principal.authorities.forEach(item => {
     if (item.authority === 'ROLE_ORD')
     {
       this.hasRole=true ;  
       console.log('role ord') ; 
     }
     
   });
   return this.hasRole ; 
 }
 validationController(){
  console.log('valider') ;
  console.log(this.selectedOrd) ;
this.selectedOrd.etat='S';
this.missionService.validerMission(this.selectedOrd).subscribe(data=>{
 console.log(data) ;
 alert(' لقد تمت المصادقة بنجاح')
 this.initialiser(); 
 window.location.reload() ; 


} , 
error => {console.log(error) ; } , 
() => {console.log('done');}
)}
}

