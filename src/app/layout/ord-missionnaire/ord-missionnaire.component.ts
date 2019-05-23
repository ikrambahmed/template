import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Missionnaire } from 'src/app/models/missionnaire';
import { ordMiss } from 'src/app/models/Ord_Miss';
import { Router } from '@angular/router';
import { MissionService } from 'src/app/services/mission.service';
import { OrdMissService } from 'src/app/services/ord-miss.service';
import { Mission } from 'src/app/models/mission';
import { DeptGen } from 'src/app/models/DeptGen';

@Component({
  selector: 'app-ord-missionnaire',
  templateUrl: './ord-missionnaire.component.html',
  styleUrls: ['./ord-missionnaire.component.scss']
})
export class OrdMissionnaireComponent implements OnInit {
@Input()
selectedOrdre ; 
@Input() 
operation; 
  numMission:String ;
  duree_miss:number ;  
  cin: string = '';
  existe : Boolean ; 
  numOrd:number =0; 
  num:number=0;
  OrdMissForm :FormGroup ; 
  missionnare : Missionnaire ; 
  nom: String ; 
  prenom : String ; 
  Date_depart :Date = new Date(); 
  Date_arrivee:Date= new Date(); 
  date_dep : Date ; 
  date_ret:Date ; 
  ordmiss : ordMiss ; 
  num_miss :String ; 
  cod : String ;
  show1 : Boolean ;
  @Input()
  date_debut ; 
  duree:number ; 
  date: any = { date: {year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate()} };
   timer :any = null;
  constructor(private router : Router ,private fb : FormBuilder , private missionService : MissionService , private ordMisService : OrdMissService) { 
   
    this.OrdMissForm = this.fb.group({
      cin: ['',Validators.required],
      datarrP: ['',Validators.required],
      datdepP: ['',Validators.required],
      code : ['',Validators.required],
      numMission:['',Validators.required] , 
      numord : ['',Validators.required] , 
      duree : ['',Validators.required] ,
    }) ; 
  }

  dateDiff(date1, date2){
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             
    let sec = tmp % 60;                   
 
    tmp = Math.floor((tmp-sec)/60);   
    let min = tmp % 60;                    
 
    tmp = Math.floor((tmp-min)/60);    
    let hour = tmp % 24;                  
 
    tmp = Math.floor((tmp-hour)/24);   
    let day = tmp;
    console.log('days',day) ; 
 
    return day;
}

toggle(){
  console.log('karouma') ;
  console.log('date dep',this.date_dep) ; 
  console.log('date_arr',this.date_ret);
  let key1 = 'datdepP1';
  localStorage.setItem(key1, JSON.stringify(this.date_dep));
  let key2 = 'datarrP1';

  localStorage.setItem(key2, JSON.stringify(this.date_ret));

  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      let dateString=JSON.parse(localStorage.getItem('datdepP1')) ; 
      this.date_dep = new Date(dateString);
      console.log('daate',this.Date_depart) ; 
     
      let dateString2=JSON.parse(localStorage.getItem('datarrP1')) ; 
      this.date_ret = new Date(dateString2);
     console.log(this.Date_arrivee) ; 
     let dur =JSON.parse(localStorage.getItem('duree') ); 
     if(this.dateDiff(this.date_dep,this.date_ret)>dur)
     {
       window.alert('الرجاء التثبت من المدة') ; 
     }
     if(this.dateDiff(this.date_dep,this.date_ret)<0)
     {window.alert('الرجاء التثبت من المدة');
     console.log('duree',this.duree_miss);}
     else if (this.dateDiff(this.date_dep,this.date_ret)>=0)
     {let key3='duree_missionnaire' ; 
     this.duree_miss =this.dateDiff(this.date_dep,this.date_ret) ; 
    }
      resolve();
    }, 1000);
  
});}
x:Number ; 

  add(){
    
   const m = this.OrdMissForm.value ;
  if(this.duree_miss <0 || this.duree_miss ==undefined){
    window.alert('الرجاء التثبت من المدة') ; 
  }
  if(this.duree_miss>=0){
    this.missionService.addOrdMiss(m).subscribe(
      res => {
        window.alert('لقد تمت الاضافة بنجاح') ; 

         this.ordmiss=res;
         localStorage.setItem('selectedOrd',JSON.stringify(res)) ; 
         },
         error=>{console.log(error);}    
    )
    let key='numOrd' ;
    let ord=this.num+"" ; 
    let key23='cin' ;
    console.log('cin',this.cin)
    localStorage.setItem(key23,this.cin);
      localStorage.setItem(key,ord);
      localStorage.setItem('nom',this.nom+"");
      localStorage.setItem('prenom',this.prenom+"");
    
      localStorage.setItem('duree_ord', JSON.stringify(this.duree_miss));
      console.log('x',this.x) ; 
      this.show1=true; 
      this.router.navigateByUrl('frais') ;
  }
}


  Search(cin)
  {
    let m:Missionnaire=new Missionnaire(); 
    m.cin=this.cin; 
    m.code=this.depart; 
    if((cin!=null) || (cin.length!=0)|| (cin !=''))
    return this.missionService.getOneMiss(m).subscribe(
      data => { 
        if (data && data['cin']) {
        this.missionnare=data ; 
        this.nom=data['nom']; 
        this.prenom=data.prenom ; 
        console.log(this.nom , this.prenom) ; 
        console.log('lkitou el cin') ; 
        this.existe=true ; 
      }
     else 
     this.existe=false ; },
      error => {console.log(error); 
     } , 
      () => {console.log('loading classes was done ')}
    )
  }
    go(){
      this.cin='' ; 
    }
    name: string = '';
    name1: string = '';
    _timeout: any = null;

    displayName(){
      this._timeout  = null;
      if(this._timeout){ 
        window.clearTimeout(this._timeout);
      }
      this._timeout = window.setTimeout(() => {
         this._timeout = null;
        // this.lc.run(() => this.name1 = this.name);
         if( (this.cin.length==0)|| (this.cin =='')||(this.cin.length!=8))
         console.log("erreur") ; 
         else 
          this.Search(this.cin);
      },1000);
   
}

goToMission(){
  this.router.navigateByUrl('/stepper');
}
goToFrais(){
  this.router.navigateByUrl('/frais') ; 
}
 doStuff() {
    alert('do stuff');
}
affich2 : boolean ; 
selectedMission:Mission; 
depart:DeptGen ; 
  ngOnInit() {

  this.selectedMission=JSON.parse(localStorage.getItem('selectedMission')); 
  //alert(this.selectedMission) ; 
  this.num_miss = this.selectedMission.numMission ; //JSON.parse(localStorage.getItem('num_mission')) ;
  var DeptGenVal = localStorage.getItem('deptGen') ; 
  var data = JSON.parse(DeptGenVal) ; 
  console.log('retrievedObject:',data.departement.code) ;
  this.cod=data.departement.code;
  this.depart=data.departement ; 

  let dateString=this.selectedMission.datdepP ; //localStorage.getItem('datdepP') ; 
  this.Date_depart = new Date(dateString);
  console.log('daate',this.Date_depart) ; 
  let dateString2=this.selectedMission.datarrP ; //localStorage.getItem('datarrP') ; 
  this.Date_arrivee = new Date(dateString2);
  console.log(this.Date_arrivee) ; 
  this.show1=false;
  this.duree_miss=+this.selectedMission.duree ; //JSON.parse(localStorage.getItem('duree')) ; 
  this.duree =this.dateDiff(this.Date_depart,this.Date_arrivee) ;
  console.log('duree mission',this.duree);
  this.reloadCode();
}

reloadCode(){
  console.log('numMission',this.num_miss);
  let o :ordMiss=new ordMiss() ; 
  o.code=this.cod ; 
  o.numMission=this.num_miss ; 
  this.ordMisService.getLatestOrdreCode(o).subscribe(
    d=>{
      if((d==null) || (d == undefined) || (d == 0 ))
      {
        this.num=1 ; 
        console.log('codeMissioNLOad'+this.num) ; 

      }
      else 
      {      
        this.num=(d+1);
        console.log('codeOrdre'+this.num) ; 
      }
    }) ; 
  
}

}