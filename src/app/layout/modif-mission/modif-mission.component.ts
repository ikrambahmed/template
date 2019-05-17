import { Component, OnInit, Input } from '@angular/core';
import { Mission } from 'src/app/models/mission';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { Router } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { frais } from 'src/app/models/frais';

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
  //='EDIT'; 
 
  ordreMis:ordMiss[]; 
  ord: ordMiss ; 
  constructor(private router : Router,private ordMissService:OrdMissService,private missionService : MissionService) { }

  ngOnInit() {
    console.log('selectedMission modif',this.selectedMission) ;
    this.loadOrdeMission() ;    
//this.operation='EDIT' ; 
    //this.selectedMission=JSON.parse(localStorage.getItem('selectedMission')); 

  }
  f:frais[] ; 
  fraisMiss:frais
  selectedMissionn(o:ordMiss){ 
  this.fraisMiss=new frais() ; 
  this.fraisMiss.cin=o.cin; 
  this.fraisMiss.code=o.code ; 
  this.fraisMiss.numMission=o.numMission ; 
  this.fraisMiss.numord=o.numord ; 
  console.log(this.fraisMiss) ; 

  this.missionService.getFraisByOne(this.fraisMiss).subscribe(
  data => { this.f=data ; 
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
    alert(JSON.stringify(this.o)) ; 

    this.fr=new frais() ;
    this.fr.code=this.o.code ; 
    this.fr.numMission=this.o.numMission ; 
    this.fr.cin=this.o.cin ; 
    this.fr.numord=this.o.numord ; 
    this.ordMissService.deleteFrais(this.fr).subscribe(
      res=>{if (res==true){
      this.ordMissService.deleteOrd(this.o).subscribe(res=>
        {
      if (res==true){
        alert('لقد تم الحذف بنجاح');
      }
      else if(res==false){
        alert('لقد وقع خطا');
  
      }
      },
         error => {console.log(error) ; } , 
         ()=>{console.log('done') ; }
  
        ) ; 
    }
      else if (res==false){alert('not done deleting frais') ; }
    },
      error =>{console.log(error);},
      ()=>{console.log('done') ; }

    )
  
     
  }
  loadOrdeMission()
  {this.ord=new ordMiss() ; 
    this.ord.code=this.selectedMission.code ; 
    this.ord.numMission=this.selectedMission.numMission ; 
    console.log(this.ord) ; 
    this.ordMissService.getOrdre(this.ord).subscribe(
    data => { this.ordreMis=data ; 
      console.log("data",data);},
    error => {console.log(error); } , 
    () => {console.log('loading ordres was done ')}
  )}

}
