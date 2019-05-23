import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/models/mission';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { Router } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { frais } from 'src/app/models/frais';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {

  numCin:String ; 
  numMission:String ;
  missions : Mission ; 
  cod:String; 
  m:Mission ; 
  ordreMis : ordMiss [] ; 
  constructor(private router : Router ,private missionService : MissionService , private ordMissService : OrdMissService){
    this.numMission = JSON.parse(localStorage.getItem('num_mission')) ;
    console.log('num_mission',this.numMission); 
  }
numOrd:number ;
  ngOnInit(){
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.code) ;
    this.cod=data.code;
    this.loadMission() ;
    this.numOrd = JSON.parse(localStorage.getItem('numOrd')) ; 
    this.loadOrdeMission(this.numMission) ;   
}
f: frais [] ; 
loadFrais()
{ 
  let f:frais=new frais() ; 
  f.code=this.cod ; 
  f.numMission=this.numMission ; 
  f.numord=this.numOrd ; 
  f.cin=this.numCin ; 
  this.missionService.getFraisMission(f).subscribe(
  data => { this.f=data ; 
    console.log(data) ; 
    console.log("done ");},
  error => {console.log(error); } , 
  () => {console.log('loading frais was done ')}
)}

selectedCin(cin:String)
{
  this.numCin=cin ;
  console.log(this.numCin,'ikram') ; 
  //this.loadFraisMission(this.numCin) ; 
  this.loadFrais() ; 

}
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
  {
    let o : ordMiss=new ordMiss() ; 
    o.numMission=this.numMission ; 
    this.ordMissService.getOrdreMission(o).subscribe(
    data => { this.ordreMis=data ; 
      console.log("errur");},
    error => {console.log(error); } , 
    () => {console.log('loading ordres was done ')}
  )}

  loadMission()
  {
  this.m= new Mission() ;
  this.m.code=this.cod; 
  this.m.numMission=this.numMission;  
  console.log('mission',this.m);
  this.missionService.getOneMission(this.m).subscribe(
    data => {console.log('retour',data) ;
      this.missions=data ; },
    error => {console.log(error); } , 
    () => {console.log('loading mission was done ')}
  )}

  goToOrd()
  {
    this.router.navigateByUrl('ord');

  }
}



