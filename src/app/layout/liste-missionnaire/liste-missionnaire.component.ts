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
    console.log(data,'dataaa') ; 
  this.missionnaires=data; 
  if (data.length===0){
    console.log('false') ; 
    this.exist=false ; 
    this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
      res => {
        alert('لقد تم الحذف بنجاح');
        this.loadMissionaire() ; 
        this.operation='' ; 
        //window.location.reload() ; 
      },error =>{console.log(error) ; 
        alert('الرجاءالتثبت ') ;
      
      }
    )
  }
  else {this.exist=true ;}
},
  error => {console.log('an error occured') } , 
  () => {console.log('loading missionnaires was done');}
) ; 

}
  /* this.missionnaireService.rechercheMissionnaire(this.selectedMissionnaire).subscribe(
     res=>{this.existe=true ;}, 
     error => {console.log(error);},
     ()=>{console.log("loading done") ; }
   ) ; */
  /* if(this.existe===false){
     alert("لا يمكن حذف المنتفع") ; 
   }
   if (this.existe===true) */

 remove()
{this.searchMissionnaire() ; 
  console.log(this.exist) ;  //if (this.exist===false){
    
   /*  this.missionnaireService.deleteMissionnaire(this.selectedMissionnaire.cin).subscribe(
   res => {
     alert('لقد تم الحذف بنجاح') ; 

     this.selectedMissionnaire = new Missionnaire() ;
     this.missionnaireService.loadMissionaire() ; 
     this.operation='' ; 
   },error =>{console.log(error) ; 
     alert('الرجاءالتثبت ') ;
   
   }
 )*/
//}
 if(this.exist===true)
 {alert('لا يمكن حذف المنتفع') ; }
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



