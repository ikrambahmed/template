import { Component, OnInit } from '@angular/core';
import { Missionnaire } from 'src/app/models/missionnaire';
import { MissionnaireService } from 'src/app/services/missionnaire.service';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { OrdMissService } from 'src/app/services/ord-miss.service';

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
 exist:boolean ; 
 ord : ordMiss ; 
 searchMissionnaire() 
 { console.log(this.selectedMissionnaire) ; 
   this.missionnaireService.searchMissionnaire(this.selectedMissionnaire).subscribe(
  data => {
     if (data.length==0 ||data===undefined || data ===null){ 
    this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
      res => {
        alert('لقد تم الحذف بنجاح');
        this.loadMissionaire() ; 
        this.operation='' ; 
        
      },error =>{console.log(error) ; 
        alert('الرجاءالتثبت ') ;
      
      }
    )
  }
  else {
  alert("لا يمكن حذف المنتفع") ;}
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



