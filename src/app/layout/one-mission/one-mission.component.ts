import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { budget } from 'src/app/models/budget';
import { Mission } from 'src/app/models/mission';
import { Motcle } from 'src/app/models/Motcle';
import { MissionService } from 'src/app/services/mission.service';
import { Router } from '@angular/router';
import { budgetProjet } from 'src/app/models/budgetProjet';
import { DeptGen } from 'src/app/models/DeptGen';

@Component({
  selector: 'app-one-mission',
  templateUrl: './one-mission.component.html',
  styleUrls: ['./one-mission.component.scss']
})
export class OneMissionComponent implements OnInit {
  @Input ()
  operation :String; 
  @Input()
  selectedMission:Mission /*=new Mission()*/ ;  
  
  next : boolean ; 
  codeMission :String; 
  Avoirbudg:Boolean ; 
  x:Number ; 
  Date_depart :Date ; 
  Date_arrivee:Date; 
  show : Boolean  ; 
  datdepP1:Date=new Date() ; 
  datarrP1:Date=new Date() ; 
  mission: Mission ; 
  cod : String ;
  missionForm:FormGroup;
  date_debut:Date ; 
  currentYea: number;
  strr : String ; 
  motcles : Motcle [];
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  y:String = this.year.toString().substr(2,2) ; 
 
  nb:number ; 
  ajout:boolean;

  constructor(private fb : FormBuilder , private missionService:MissionService,private router:Router ) { 
    this.createForm() ; 
    this.currentYea = (new Date()).getFullYear() ;
  
    
   }
 
   loadMotcle()
   {this.missionService.getMotcle().subscribe(
     data => { this.motcles=data;},
     error => {console.log(error); } , 
     () => {console.log('loading motcles was done ')}
   )}
budgets : budget[] ; 
loadBudgets()
{ let b : budget = new budget() ; 
  b.code=this.cod ; 
  this.missionService.getBudget(b).subscribe(
  data => { this.budgets=data;
  console.log('length',data.length) ;
if((data.length==0)||(data==null) || (data==undefined)){
  this.Avoirbudg=false ; 
  console.log(this.Avoirbudg) ;

}
else
this.Avoirbudg=true ;
console.log(this.Avoirbudg) ;
},
  error => {console.log(error); } , 
  () => {console.log('loading budgets was done ')}
)}
Avoirbudgproj:Boolean ; 
budgetsProjet:budget[] ; 

dateDiff(date1, date2){
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  let sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-sec)/60);    // Nombre de minutes (partie entière)
  let min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-min)/60);    // Nombre d'heures (entières)
  let hour = tmp % 24;                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-hour)/24);   // Nombre de jours restants
  let day = tmp;
  console.log('days',day) ; 

  return day;
}
success:boolean ; 

loadBudgetsProjet()
{
  let b : DeptGen= new DeptGen() ; 
  b.code= this.cod ;
  
  this.missionService.getBudgetsProjet(b).subscribe(
  data => { this.budgetsProjet=data;
    console.log(data.length) ; 
    if((data.length==0)||(data==null) || (data==undefined)){
      this.Avoirbudgproj=false ; 
      console.log('budproj',this.Avoirbudgproj) ;   
    }
    else
    this.Avoirbudgproj=true ;
    console.log('budproj',this.Avoirbudgproj) ;
  },
  error => {console.log(error); } , 
  () => {console.log('loading budgets was done ')}
)}

/*toggle(){
  console.log('karouma') ;
  console.log(this.datdepP1) ; 
  console.log(this.datarrP1) ; 
  let key1 = 'datdepP';

  localStorage.setItem(key1, JSON.stringify(this.datdepP1));
  let key2 = 'datarrP';

  localStorage.setItem(key2, JSON.stringify(this.datarrP1));

  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let dateString=localStorage.getItem('datdepP') ; 
      this.Date_depart = new Date(dateString);
      console.log('daate',this.Date_depart) ; 
     
      let dateString2=localStorage.getItem('datarrP') ; 
      this.Date_arrivee = new Date(dateString2);
     console.log(this.Date_arrivee) ; 
     this.nb =this.dateDiff(this.Date_depart,this.Date_arrivee) ;
     if(this.nb<=0){
      //alert('erreur ');
      // this.ajout=true;
       window.alert('erreur') ; 
      }
     else{
     console.log('durree',this.nb) ; 
     let key3='duree' ; 
     localStorage.setItem(key3, JSON.stringify(this.nb));}
      resolve();
    }, 1000);
  
});

}*/


toggle(){
  console.log(this.selectedMission.datdepP) ; 
  console.log(this.selectedMission.datarrP) ; 
  let key1 = 'datdepP';
  localStorage.setItem(key1, JSON.stringify(this.selectedMission.datdepP));
  let key2 = 'datarrP';
  localStorage.setItem(key2, JSON.stringify(this.selectedMission.datarrP));
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let dateString=localStorage.getItem('datdepP') ; 
      this.Date_depart = new Date(dateString);
      console.log('daate',this.Date_depart) ; 
      let dateString2=localStorage.getItem('datarrP') ; 
      this.Date_arrivee = new Date(dateString2);
     console.log(this.Date_arrivee) ; 
     if( this.dateDiff(this.Date_depart,this.Date_arrivee)<0){
      
       window.alert('الرجاء التثبت من المدة') ; 
      }
   if(this.dateDiff(this.Date_depart,this.Date_arrivee)>0)
     {console.log('durree',this.nb) ; 
     this.nb=this.dateDiff(this.Date_depart,this.Date_arrivee) ; 
     this.selectedMission.duree=this.nb+"" ; 
    }
      resolve();
    }, 1000);
  
});

}
motcle :Motcle ; 
  ngOnInit() {
    this.selectedMission=JSON.parse(localStorage.getItem('selectedMission')) ; 
    console.log('selectedMission',this.selectedMission) ; 
this.motcle=this.selectedMission.motcle ; 
    //this.mission=new mission() ; 
    this.currentYea = (new Date()).getFullYear() ; 
    this.strr=this.currentYea.toString() ;
    console.log('tawa code') ; 

    this.loadMotcle() ;
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.departement.code) ;
    this.cod=data.departement.code ;

    console.log('cod'+this.cod) ;  
    console.log('d'+this.d) ; 
    console.log('year'+this.year) ; 
    console.log('y'+this.y) ; 
    console.log('loooppp',this.operation);
    this.show=true ; 
    this.loadBudgets() ; 
    this.loadBudgetsProjet() ; 
  //  this.datdepP1= this.selectedMission.datdepP;
  this.reloadCode() ; 
  }
  date1: Date =new Date() ; 
  createForm()
  {
    console.log('creation form') ; 
    this.missionForm = this.fb.group({
      numMission:['',Validators.required],
      code :['',Validators.required]  , 
      objeta: ['',Validators.required],
      objetl: ['',Validators.required],
      datdepP: ['',Validators.required],
      datarrP : ['',Validators.required],
      motcle :  ['',Validators.required] , 
      duree  :  ['',Validators.required] 
  });
  }

  add(){
    
    const m = this.missionForm.value ;
   // alert(JSON.stringify(m));
    if(this.nb<0 || this.nb==undefined){
      window.alert('الرجاء التثبت من المدة') ; 
    }
    if(this.nb>=0){
    this.missionService.addMission(m).subscribe(
      res => {
        console.log(res) ; 
        localStorage.setItem('selectedAjoutMission',JSON.stringify(res) ); 
    //    alert('just ba3ed el selected mission') ; 
        this.mission=res ; 
         let key5='duree' ; 
        // localStorage.setItem(key5, JSON.stringify(this.nb));

          let key = 'num_mission';
          localStorage.setItem(key,this.missionForm.get('numMission').value);
          let key1 = 'datdepP';
          localStorage.setItem(key1, JSON.stringify(this.selectedMission.datdepP));
          let key2 = 'datarrP';
          localStorage.setItem(key2, JSON.stringify(this.selectedMission.datarrP));
          alert('لقد تمت الاضافة بنجاح') ; 
          this.reloadCode() ; 
          this.createForm() ; 
          this.ngOnInit();
          this.show=false 
       //   this.router.navigateByUrl('ord') ;
          this.success=true ; 
         },
         error=>{console.log(error);
          alert("الرجاءالتثبت من المعطيات");}
    );}
   
  }

  reloadCode()
  {   let d : DeptGen=new DeptGen() ; 
    d.code=this.cod ; 
  this.missionService.getLatestMissionCode(d).subscribe(
  d=>{
    if((d===null) || (d===undefined) || (d.length ===0 ))
    {console.log('d') ; 
      this.codeMission=this.y+"0001" ; 
      console.log('codeMissioNLOading'+this.codeMission) ; 
    
    }
    else 
    { console.log('y') ; 
      this.codeMission=(Number(d)+1)+"" ;
      console.log('codeMissioNLOad'+this.codeMission) ; 

    }
    let key = 'num_mission';
 //  localStorage.setItem(key,JSON.stringify(this.codeMission));
  // localStorage.setItem(key,this.missionForm.get('numMission').value);
  //console.log('codeeee',this.missionForm.get('numMission').value);

 //  this.x =this.dateDiff(this.datdepP,this.datarrP) ; 
  //console.log('durreeeee',this.x) ; 


  },
  //error => { this.codeMission=this.y+"0001" ; }
  ) ; 
}
clickMethod(name: string) {
  if(confirm("Are you sure to delete "+name)) {
    console.log("Implement delete functionality here");
  }
}

update(){
  const m = this.missionForm.value ;
  this.missionService.updateMission(m).subscribe(
    res => {
      alert('لقد تم التغيير بنجاح') ; 

      this.mission=res ; 
       /* console.log("donne") ;   
        let key = 'num_mission';
        localStorage.setItem(key,this.missionForm.get('numMission').value);
        let key1 = 'datdepP';

        localStorage.setItem(key1, JSON.stringify(this.selectedMission.datdepP));
        let key2 = 'datarrP';

        localStorage.setItem(key2, JSON.stringify(this.selectedMission.datarrP));
        let x =this.dateDiff(this.selectedMission.datdepP,this.selectedMission.datarrP) ; 
        console.log('durree',x) ; 
        let key3='duree' ; 
        localStorage.setItem(key3, JSON.stringify(this.x));
*/
        //this.reloadCode() ; 
        //this.createForm() ; 
        //this.ngOnInit();
        this.operation='' ; 
      
        this.show=false ;
       // this.router.navigateByUrl('mission') ; 
       this.next=true ; 
        //this.router.navigateByUrl('ord') ;
       },
       error=>{console.log(error);
        alert('الرجاءالتثبت من المعطيات') ;}
  
  );

}

}
