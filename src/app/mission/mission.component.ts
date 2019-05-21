import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MissionService } from '../services/mission.service';
import { Router } from '@angular/router';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  selectedMission:Mission=new Mission(); 
  changer:boolean ; 
  missions:Mission[]; 
  totalRec : number;
  page: number = 1;
  cod : String ; 
  operation:String='' ; 
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  y:String = this.year.toString().substr(2,2) ; 
  constructor(private missionService : MissionService , 
    private http : HttpClient , 
    private router : Router) { }
    goToADD(){
      this.router.navigateByUrl('/stepper') ; 
    }
    goToMission(){
    this.router.navigateByUrl('/stepper');
    }
    update(){
      console.log("thisSelectedMission",this.selectedMission);
      localStorage.setItem('selectedMission',JSON.stringify(this.selectedMission)) ;}
  loadMissions()
  {this.missionService.getMissions(this.cod).subscribe(
   list => { 
     console.log('missions loading') ; 
     this.missions=list ;
     this.totalRec = this.missions.length;

    },
    error => {console.log(error) } , 
    () => {console.log('loading missions was done ');}
  ) ;  
}

  ngOnInit() {
   var DeptGenVal = localStorage.getItem('deptGen') ; 
   var data = JSON.parse(DeptGenVal) ; 
   console.log('retrievedObject: ',data.departement.code) ;
   this.cod=data.departement.code ;
   this.loadMissions();
   this.changer=false;
  
}
}
