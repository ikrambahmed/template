import { Component, OnInit } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Projet } from '../models/Projet';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {

  PojetForm : FormGroup ; 
  operation:String ; 
  d:Date = new Date() ; 
  year : number = this.d.getFullYear() ; 
  cod : String ; 
  codeProjet:String ; 
  DateSaisie : Date = new Date() ; 
  searchText:String ; 
  constructor(private fb : FormBuilder , private missionService : MissionService) {
    this.PojetForm = this.fb.group({  
      libprjA: ['',Validators.required],
      libPrjL: ['',Validators.required],
     });
      }

   add(){
     this.PojetForm.value.codPrj=this.codeProjet ; 
     this.PojetForm.value.code=this.cod ; 
     const m = this.PojetForm.value ;
  //  alert(JSON.stringify(m));
    this.missionService.addProjet(m).subscribe(
      res => {
        this.reloadCodeProjet() ; 
          alert('لقد تمت الاضافة بنجاح') 
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
projets:Projet[] ; 
loadProjets()
{this.missionService.getprojets(this.cod).subscribe(
  data => { this.projets=data},
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

}
