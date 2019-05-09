import { Component, OnInit } from '@angular/core';
import { Missionnaire } from 'src/app/models/missionnaire';
import { MissionnaireService } from 'src/app/services/missionnaire.service';

@Component({
  selector: 'app-liste-missionnaire',
  templateUrl: './liste-missionnaire.component.html',
  styleUrls: ['./liste-missionnaire.component.scss']
})
export class ListeMissionnaireComponent implements OnInit {
  cod : String ;
  missionnaires: Missionnaire[] ;
  searchText;
  operation: string ;
  selectedMissionnaire : Missionnaire ; 
  constructor(
  private missionnaireService : MissionnaireService
    ) { }
  ngOnInit() {
   this.initMiss() ;
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.departement.code) ;
   this.cod=data.departement.code;
   this.loadMissionaire() ; 
 }
 remove()
 {
 this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
   res => {
     alert('لقد تم الحذف بنجاح') ; 

     this.selectedMissionnaire = new Missionnaire() ;
     this.missionnaireService.loadMissionaire() ; 
     this.initMiss() ; 
     this.operation='' ; 
   },error =>{console.log(error) ; 
     alert('الرجاءالتثبت ') ;
   
   }
 )}
  editOp()
  {
    this.operation='EDIT' ; 
  }
  removeOp()
  {
    this.operation="REMOVE" ; 

    
  }
 loadMissionaire()
  {this.missionnaireService.getMissionares(this.cod).subscribe(
    data => { this.missionnaires=data},
    error => {console.log('an error occured') } , 
    () => {console.log('loading missionnaires was done ')}
  )

  }
  initMiss()
{
  this.selectedMissionnaire= new Missionnaire() ; 
  
}}



