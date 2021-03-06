import { Component, OnInit } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Projet } from '../models/Projet';
import { AlertService } from '../services/alert.service';
import { DeptGen } from '../models/DeptGen';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  selectedProjet:Projet =new Projet(); 
  PojetForm : FormGroup ; 
  operation:String ; 
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  cod : String ; 
  codeProjet:String ; 
  DateSaisie : Date = new Date() ; 
  searchText:String ; 
  constructor(private alertService : AlertService , private fb : FormBuilder , private missionService : MissionService) {
    this.createForm() ; 
      }
createForm(){this.PojetForm = this.fb.group({  
  libprjA: ['',Validators.required],
  libPrjL: ['',Validators.required],
 });}
   add(){
     this.PojetForm.value.codPrj=this.codeProjet ; 
     this.PojetForm.value.code=this.cod ; 
     const m = this.PojetForm.value ;
  //  alert(JSON.stringify(m));
    this.missionService.addProjet(m).subscribe(
      res => {
          this.success('لقد تمت الاضافة بنجاح') ; 
          this.reloadCodeProjet() ; 
          this.loadProjets() ; 
          this.PojetForm.reset() ; 
          this.operation='' ; 
         },
         error=>{console.log("erreur");}    
    )
  }

reloadCodeProjet(){
  this.missionService.getLatestProjetCode(this.cod).subscribe(
    d=>{
      if((d==null) || (d==undefined) || (d.length ==0 ))
      {
        this.codeProjet="1" ; 
        console.log('codeProjet'+this.codeProjet) ; 

      }
      else 
      {
        console.log(d) ; 

        this.codeProjet=(+d+1)+"" ;
        console.log('codeProjet'+this.codeProjet) ; 
      }
  
    }) ; 
  
}

 
//projets:Array<Projet>[]=new Array() ; 
projets : Projet[] ; 
loadProjets()
{
  let d:DeptGen=new DeptGen() ; 
  d.code=this.cod ; 
  this.missionService.getprojets(d).subscribe(
  data => { this.projets=data ; 
    
  //this.projets.sort() ; 
  
},
  error => {console.log('an error occured') } , 
  () => {console.log('loading projets was done ')}
)

}

firstName: FormControl;

  ngOnInit() {
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject:',data.departement.code) ;
    this.cod=data.departement.code;
    this.reloadCodeProjet() ;
    this.loadProjets() ; 
    this.firstName = new FormControl('', Validators.required);

  }
  projet : Projet ; 
  update(){
    this.missionService.updateProjet(this.selectedProjet).subscribe(
    data => { 
      this.success('تم تغيير المشروع بنجاح')
      this.projet=data ;
      this.PojetForm.reset() ;  
      this.operation='' ; 
  this.loadProjets() ; },
    error => {console.log(error)  } , 
    () => {console.log('loading projets was done ')}
  ) ; 
  this.PojetForm.reset() ; 

  }
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
