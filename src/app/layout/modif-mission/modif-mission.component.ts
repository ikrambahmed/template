import { Component, OnInit, Input } from '@angular/core';
import { Mission } from 'src/app/models/mission';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { Router } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { frais } from 'src/app/models/frais';
import { Missionnaire } from 'src/app/models/missionnaire';
import { MissionnaireService } from 'src/app/services/missionnaire.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-modif-mission',
  templateUrl: './modif-mission.component.html',
  styleUrls: ['./modif-mission.component.scss']
})
export class ModifMissionComponent implements OnInit {
  @Input()
  selectedMission:Mission ; 
  @Input ()
  operation :String
 
  ordreMis:ordMiss[]; 
  ord: ordMiss ; 
  constructor(private alertService : AlertService,  private missionnaireService : MissionnaireService ,private router : Router,private ordMissService:OrdMissService,private missionService : MissionService) { }

  ngOnInit() {

    this.loadOrdeMission() ;    
//this.operation='EDIT' ; 
    //this.selectedMission=JSON.parse(localStorage.getItem('selectedMission')); 
  }
  f:frais[] ; 
  fraisMiss:frais ; 
  existFrais : Boolean ; 
  selectedMissionn(o:ordMiss){ 

  this.fraisMiss=new frais() ; 
  this.fraisMiss.cin=o.cin; 
  this.fraisMiss.code=o.code ; 
  this.fraisMiss.numMission=o.numMission ; 
  this.fraisMiss.numord=o.numord ; 
  console.log(this.fraisMiss) ; 
  this.existFrais=false ;

  this.missionService.getFraisByOne(this.fraisMiss).subscribe(
  data => { this.f=data ; 
    if((data.length!=0)&&(data!=null)&&(data!=undefined))
    {this.existFrais=true ;} 
   // alert(JSON.stringify(data)) ;
    console.log(data) ; 
    console.log("done ");},
  error => {console.log(error); } , 
  () => {console.log('loading frais was done ')}
)}

  goToOrd(){
    this.router.navigateByUrl('/ord') ; 
    localStorage.setItem('selectedMission',JSON.stringify(this.selectedMission) ); 
  }
o:ordMiss=new ordMiss() ;
fr : frais ; 
  remove(){
    console.log('delete',this.o) ;
    if(this.existFrais==true)
    {this.fr=new frais() ;
    this.fr.code=this.o.code ; 
    this.fr.numMission=this.o.numMission ; 
    this.fr.cin=this.o.cin ; 
    this.fr.numord=this.o.numord ; 

    this.ordMissService.deleteFrais(this.fr).subscribe(
      res=>{if (res==true){
      this.ordMissService.deleteOrd(this.o).subscribe(res=>
        {
      if (res==true){
        this.success('لقد تم الحذف بنجاح');
      }
      else if(res==false){
        this.error('لقد وقع خطا');
  
      }
      },
         error => {console.log(error) ; } , 
         ()=>{console.log('done') ; }
  
        ) ; 
    }
      else if (res==false){//alert('not done deleting frais') ;
    this.error('لا يمكن الحذف') }
    },
      error =>{console.log(error);},
      ()=>{console.log('done') ; }

    )}
    else{
      this.ordMissService.deleteOrd(this.o).subscribe(res=>
        {
      if (res==true){
        this.success('لقد تم الحذف بنجاح');
      }
      else if(res==false){
        this.error('لقد وقع خطا');
  
      }
      this.loadOrdeMission() ; 
      },
         error => {console.log(error) ; } , 
         ()=>{console.log('done') ; }
  
        ) ; 
    }
  }
  fraisMission:frais ; 
  removeFrais(){
    this.ordMissService.deleteFrais(this.fraisMission).subscribe(
      res=>{
        /*if (res==true){
        alert('لقد تم الحذف بنجاح');
      }
      else if(res==false){
        alert('لقد وقع خطا');
  
      }*/
      this.success('لقد تم الحذف بنجاح');
     // window.location.reload() ; 

      },
         error => {console.log(error) ;
     
        } , 
         ()=>{console.log('done') ; }
      );
       
      }
  loadOrdeMission()
  {
    this.ord=new ordMiss() ; 
    this.ord.code=this.selectedMission.code ; 
    this.ord.numMission=this.selectedMission.numMission ; 
    console.log(this.ord) ; 
    this.ordMissService.getOrdre(this.ord).subscribe(
    data => { this.ordreMis=data ; 
      console.log("data خقي",data);},
    error => {console.log(error); } , 
    () => {console.log('loading ordres was done ') ; }
  )}
  missionnaire:Missionnaire ; 
  
 /* getMissionnaire(){
    
    this.missionnaireService.getOneMiss(this.o.cin).subscribe(
      data=>{console.log(data);
        this.missionnaire=data ;
    } , 
      error => { console.log(error) ; } , 
      ()=>{console.log('done') ; }
    ) ; 
    
    
  }*/

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
