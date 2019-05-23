import { Component, OnInit } from '@angular/core';
import { Missionnaire } from 'src/app/models/missionnaire';
import { MissionnaireService } from 'src/app/services/missionnaire.service';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { AlertService } from 'src/app/services/alert.service';
import { Observable } from 'rxjs';
import { DeptGen } from 'src/app/models/DeptGen';

@Component({
  selector: 'app-liste-missionnaire',
  templateUrl: './liste-missionnaire.component.html',
  styleUrls: ['./liste-missionnaire.component.scss']
})
export class ListeMissionnaireComponent implements OnInit {
  cod : String ;
  missionnaires: Missionnaire[] ;
  searchText;
  operation: string;
  selectedMissionnaire : Missionnaire ; 
  constructor(private missionnaireService : MissionnaireService , private alertService : AlertService
    ) { }
  ngOnInit() {
   this.initMiss() ;
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.departement.code) ;
   this.cod=data.departement.code;
   this.loadMissionaire() ; 
   this.displayName(); 
 // this.refreshData() ; 
 } 
 /* _timeout1: any = null;

 refreshData(){

 
    this._timeout1  = null;
    if(this._timeout1){ 
      window.clearTimeout(this._timeout1);
    }
    this._timeout = window.setTimeout(() => {
       this._timeout1 = null;
     this.loadMissionaire() ;
    },1000);
 
}*/
 
 exist:boolean ; 
 ord : ordMiss ; 
 error(message: string) {
  this.alertService.error(message);
}

info(message: string) {
  this.alertService.info(message);
}

warn(message: string) {
  this.alertService.warn(message);
}

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
 { console.log(this.selectedMissionnaire) ; 
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
success(message: string) { 
  this.alertService.success(message);
}
  editOp()
  {
    this.operation='EDIT' ; 
  }
  removeOp()
  {
    this.operation="REMOVE" ; 

    
  }
  m:DeptGen ; 
 loadMissionaire()
  {this.m=new DeptGen() ; 
    this.m.code=this.cod ; 

    this.missionnaireService.getMissionares(this.m).subscribe(
    data => { this.missionnaires=data},
    error => {console.log('an error occured') } , 
    () => {console.log('loading missionnaires was done ')}
  )

  }
  initMiss()
{
  this.selectedMissionnaire= new Missionnaire() ; 
  
}}



