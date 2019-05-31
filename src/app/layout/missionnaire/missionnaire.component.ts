import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { MissionnaireService } from '../../services/missionnaire.service';
import { Missionnaire } from '../../models/missionnaire';
import { FormGroup, FormArray, FormBuilder,Validators,ReactiveFormsModule  } from '@angular/forms';
import { grade } from '../../models/grade';
import { fonction } from '../../models/fonction';
import { categorie } from '../../models/categorie';
import { groupe } from '../../models/groupe';
import { classe } from '../../models/classe';
import { DeptGen } from '../../models/DeptGen';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { ordMiss } from 'src/app/models/Ord_Miss';
@Component({
  selector: 'app-missionnaire',
  templateUrl: './missionnaire.component.html',
  styleUrls: ['./missionnaire.component.scss']
})
export class MissionnaireComponent implements OnInit {

  
  missionnaires: Missionnaire[] = new Array();
  ListeMissionnaireComponent : any ;
  missionnaireForm :FormGroup ; 
  searchText ; 
  grades : grade [];
  fonctions : fonction[] ; 
  categories : categorie[] ; 
  groupes : groupe[] ; 
  classes : classe[] ; 
  public onegrade : any ; 
  done:Boolean ; 
  operation: string;
  selectedMissionnaire : Missionnaire=new Missionnaire() ;

  
  constructor(private alertService : AlertService , private fb : FormBuilder , private missionnaireService : MissionnaireService, private router : Router) { 
    this.createForm() ; 
  
  }

  loadgrade()
  {this.missionnaireService.getGrade().subscribe(
    data => { this.grades=data;},
    error => {console.log(error); } , 
    () => {console.log('loading grades was done ')}
  )}
  loadfonction()
  {
    this.missionnaireService.getfonctions().subscribe(
    data => { this.fonctions=data;},
    error => {console.log(error); } , 
    () => {console.log('loading fonctions was done ')}
  )}

  loadclasse()
  {this.missionnaireService.getClasses().subscribe(
    data => { this.classes=data;},
    error => {console.log(error); } , 
    () => {console.log('loading classes was done ')}
  )}

  loadcateg()
  {this.missionnaireService.getCategories().subscribe(
    data => { this.categories=data;},
    error => {console.log(error); } , 
    () => {console.log('loading categories was done ')}
  )}

  loadgroupe()
  {this.missionnaireService.getgroupes().subscribe(
    data => { this.groupes=data;},
    error => {console.log(error); } , 
    () => {console.log('loading groupes was done ')}
  )}
 cod:DeptGen ;
 classeM:String ; 
  ngOnInit() {
    
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.departement.code) ;
    this.cod=data.departement;
    this.loadMissionaire() ; 
    this.loadgrade(); 
    this.loadcateg(); 
    this.loadclasse(); 
    this.loadgroupe(); 
    this.loadclasse(); 
    this.loadfonction();
    this.selectedMissionnaire=new Missionnaire() ; 
    let dateString2=this.selectedMissionnaire.datenaissance ;
  this.dateNais = new Date(dateString2);
  this.classeM=this.selectedMissionnaire.classgrd.libclassgrda ; 
  this.displayName(); 

}
exist:boolean ; 
ord : ordMiss ; 



_timeout: any = null;

displayName(){
 this._timeout  = null;
 if(this._timeout){ 
   window.clearTimeout(this._timeout);
 }
 this._timeout = window.setTimeout(() => {
    this._timeout = null;
 this.clear() ; 
 console.log('user') ; 
 },5000);

}

clear() {
 this.alertService.clear();
}
searchMissionnaire() 
{  //alert('searching') ; 
//alert(this.selectedMissionnaire) ; 
  console.log(this.selectedMissionnaire) ; 
  this.missionnaireService.searchMissionnaire(this.selectedMissionnaire).subscribe(
 data => {
    if (data.length==0 ||data===undefined || data ===null){ 
   this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
     res => {
      // alert('لقد تم الحذف بنجاح');
       this.success('لقد تم الحذف بنجاح') ; 
       this.loadMissionaire() ; 
       this.operation='' ; 
       
     },error =>{console.log(error) ; 
       this.error('الرجاءالتثبت ') ;
       
     
     }
   )
 }
 else {
 this.error("المنتفع يتمتع بمامورية , لا يمكن حذفه ") ;}
},
 error => {console.log(error) } , 
 () => {console.log('deleting missionnaire is done');}
) ; 

}
 editOp()
 {
   this.operation='EDIT' ; 
 }
 removeOp()
 {
   this.operation="REMOVE" ; 

   
 }
dateNais : Date=new Date() ; 
createForm()
{
  this.missionnaireForm = this.fb.group({
    cin: ['',Validators.required],
    matricule: ['',Validators.required],
    nom: ['',Validators.required],
    nomL: ['',Validators.required],
    prenom: ['',Validators.required],
    prenomL: ['',Validators.required],
    nationalite: ['',Validators.required],
    nationaliteL : ['',Validators.required],
    datenaissance : ['',Validators.required],
    place_naissance : ['',Validators.required],
    date_cin : ['',Validators.required],
    place_cin : ['',Validators.required],
    niveau  : ['',Validators.required],
    rib: ['',Validators.required] , 
    graade : ['',Validators.required],
 // codGrd:['',Validators.required] ,
    fonnction: ['',Validators.required],
    classgrd: ['',Validators.required],
    codCat : ['',Validators.required],
    groupe: ['',Validators.required],
});
}
  initMiss()
  { 
    this.selectedMissionnaire= new Missionnaire() ; 
    this.createForm(); 
  }
  update() {
    //alert(JSON.stringify(this.selectedMissionnaire)) ; 

    this.selectedMissionnaire.code=this.cod ; 
  this.missionnaireService.updateMissionnaire(this.selectedMissionnaire)
  .subscribe(
    res =>{
      this.success('لقد تم التغيير بنجاح') ; 
      this.initMiss() ; 
      this.missionnaireService.loadMissionaire() ;   
     // window.location.reload() ; 
    },
    error => {console.log(error) ; 
    this.error('الرجاءالتثبت من المعطيات') ;}
  )} 
  m : DeptGen
  loadMissionaire()
  {
    this.m=new DeptGen() ; 
    this.m.code=this.cod.code ; 
    this.missionnaireService.getMissionares(this.m).subscribe(
    data => { this.missionnaires=data},
    error => {console.log('an error occured') } , 
    () => {console.log('loading missionnaires was done ')}
  )

  }


  exportpdf(){
 // alert(JSON.stringify(this.selectedMissionnaire)) ; 
this.missionnaireService.getOneExport(this.selectedMissionnaire).subscribe(
  data=>{  
  /*  if((data==null) || (data==undefined) || (data==''))
    {alert('خطا') ;}*/
    //alert(JSON.stringify(data)) ; 
    this.missionnaireService.exportPdf(data).subscribe(
    data => { 
      alert('لقد تم التحمبل  اذهب الى ملف التحمبل')
  },
    error => {console.log('an error occured');
    alert('لقد تم تحمبل ملف تجميد الاعتمادات اذهب الى ملف التحمبل')

 // alert(JSON.stringify(error)) ; 
  
 // alert('خطا') ; 
 } , 
    () => {console.log('loading missionnaires was done ')}
  ) ;
},
error =>{console.log(error) ; }
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
  success(message: string) { 
    this.alertService.success(message);
  }
  codGrd:String  ;
  add(){
    //Ajout d'un missionnaire
    this.missionnaireForm.value.code=this.cod ; 
   
    const m = this.missionnaireForm.value ;
   
    this.missionnaireService.addMissionnaire(m).subscribe(
      res => {
      
        this.done=true; 
        this.success('لقد تمت الاضافة بنجاح') ; 
      
        this.loadMissionaire() ; 
        this.operation='' ; 
    
      },
      error =>{console.log(error);
      this.error("الرجاءالتثبت من المعطيات");}
      
    ) ; 
  }
}

  
  
