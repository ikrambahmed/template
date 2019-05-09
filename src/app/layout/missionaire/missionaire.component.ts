import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { grade } from 'src/app/models/grade';
import { fonction } from 'src/app/models/fonction';
import { categorie } from 'src/app/models/categorie';
import { groupe } from 'src/app/models/groupe';
import { classe } from 'src/app/models/classe';
import { Missionnaire } from 'src/app/models/missionnaire';
import { MissionnaireService } from 'src/app/services/missionnaire.service';
import { DeptGen } from 'src/app/models/DeptGen';
import { Router } from '@angular/router';
import { ListeMissionnaireComponent } from '../liste-missionnaire/liste-missionnaire.component';

@Component({
  selector: 'app-missionaire',
  templateUrl: './missionaire.component.html',
  styleUrls: ['./missionaire.component.scss']
})
export class MissionaireComponent implements OnInit {

  missionnaireForm :FormGroup ; 
  searchText ; 
  grades : grade [];
  fonctions : fonction[] ; 
  categories : categorie[] ; 
  groupes : groupe[] ; 
  classes : classe[] ; 
  public onegrade : any ; 
  done:Boolean ; 
@Input ()
operation ; 
@Input() 
butonMsg ;
@Input()
 selectedMissionnaire ; 

  constructor(private fb : FormBuilder , private missionnaireService : MissionnaireService, private router : Router) { 
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
  ngOnInit() {
    this.loadgrade(); 
    this.loadcateg(); 
    this.loadclasse(); 
    this.loadgroupe(); 
    this.loadclasse(); 
    this.loadfonction();

    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.departement.code) ;
    this.cod=data.departement;
  
}
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
    ministr: ['',Validators.required],
    rib: ['',Validators.required] , 
    grp : ['',Validators.required],
    graade : ['',Validators.required],
    fonnction: ['',Validators.required],
    classgrd: ['',Validators.required],
    codCat : ['',Validators.required],
    groupe: ['',Validators.required],
    code : ['',Validators.required]
    //dept: ['',Validators.required]
});
}
  initMiss()
  { 
    this.selectedMissionnaire= new Missionnaire() ; 
    this.createForm(); 
  }
  update() {
  this.missionnaireService.updateMissionnaire(this.selectedMissionnaire)
  .subscribe(
    res =>{
      alert('لقد تم التغيير بنجاح') ; 

      this.initMiss() ; 
      this.missionnaireService.loadMissionaire() ; 

      this.operation='' ; 
    },
    error => {console.log(error) ; 
    alert('الرجاءالتثبت من المعطيات') ;}
  )} 
  remove()
  {
  this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
    res => {
      alert('لقد تم الحذف بنجاح') ; 

      this.selectedMissionnaire = new Missionnaire() ;
      this.missionnaireService.loadMissionaire() ; 
      this.operation='' ; 
    },error =>{console.log(error) ; 
      alert('الرجاءالتثبت ') ;
    
    }
  )}

  ListeMissionnaireComponent : any ;

  add(){
    console.log(this.missionnaireForm.value.graade) ; 
    const m = this.missionnaireForm.value ;

   // alert(JSON.stringify(m));
    this.missionnaireService.addMissionnaire(m).subscribe(
      res => {
       /* let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
        element.click();

        this.myModal.nativeElement.click();*/

        this.done=true; 
        alert('لقد تمت الاضافة بنجاح') ; 
     //   alert(JSON.stringify(res));

        //console.log('c bon lka res') ; 
        this.initMiss() ; 
        this.missionnaireService.loadMissionaire() ; 
        this.operation='' ; 
      },
      error =>{console.log(error);
      alert("الرجاءالتثبت من المعطيات");}
      
    )
  }
}
