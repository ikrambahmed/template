import { Injectable } from '@angular/core';
import { frais } from '../models/frais';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';
import { budget } from '../models/budget';
import { budgetProjet } from '../models/budgetProjet';
import { Projet } from '../models/Projet';
import { ordMiss } from '../models/Ord_Miss';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environment';
import { DeptGen } from '../models/DeptGen';
import { Missionnaire } from '../models/missionnaire';

@Injectable()
export class MissionService {

  baseUrl = environment.baseUrl;

  missions : Mission[];
  constructor(private http : HttpClient) { }
  getMissionValider(dept : String) :Observable<any>{
    return this.http.get(this.baseUrl+'/api/'+dept);
  }

  getOneMiss(m : Missionnaire) : Observable<any>{
    return this.http.post(this.baseUrl+'/api/getOneMiss',m) ; 
   }

  getMissions(m: Mission):Observable<any> {
    return this.http.post(this.baseUrl+'/api/mission/listeMissionByDept',m) ; 
  }

  addOrdMiss(o:ordMiss):Observable<any> {
    
    return this.http.post(this.baseUrl+'/api/addordMiss',o  ) ; 
  }
  
  addMission( mission : Mission) : Observable<any>{
    console.log('el service') ; 
    return this.http.post(this.baseUrl+'/api/mission/add' ,mission  ) ; 
  }
  getMotcle():Observable<any> 
  {
    return this.http.get(this.baseUrl+'/api/allMotcle') ; 
  }

  getLatestMissionCode(codeDept : DeptGen) :Observable<any>{
    return this.http.post(this.baseUrl+'/api/mission/latestCode',codeDept) ; 
  }
  getPays() :Observable<any>{
    return this.http.get(this.baseUrl+'/api/listPays') ; 
  }
  getBudget(budg :budget) :Observable<any>{
    return this.http.post(this.baseUrl+'/api/listbyDept',budg) ; 
  }
  addBudgetDept(m :budget):Observable<any>{
    return this.http.post(this.baseUrl+'/api/addBudget' , m) ; 

  }
  addBudgetProj(m :budgetProjet):Observable<any>{
    return this.http.post(this.baseUrl+'/api/addBProjet', m) ; 
  }
  addProjet( p:Projet):Observable<any> {
    return this.http.post(this.baseUrl+'/api/addProjet', p) ;
  }

  getLatestProjetCode(code : String) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/latestProjetCode?codeDept='+code,{responseType: 'text'}) ;
  }
getAllBudgetProjets():Observable<any>{
  return this.http.get(this.baseUrl+'/api/listeBudgetProjet')
}
getAllBudgetDepts():Observable<any>{
  return this.http.get(this.baseUrl+'/api/listeBudget')
}

  getBudgetsProjet(d:DeptGen):Observable<any>{
    return this.http.post(this.baseUrl+'/api/listBudgetProjetbydept',d) ; 

  }
  getTypeFrais():Observable<any>{
    return this.http.get(this.baseUrl+'/api/listType') ; 
  }
  getprojets(cod:DeptGen):Observable<any>{

    return this.http.post(this.baseUrl+'/api/listeProjetByDept',cod) ; 
  }

  getOneMission(m:Mission):Observable<any>{
    console.log("inside service");
    return this.http.post(this.baseUrl+'/api/mission/findById',m) ; 
  }
  getFraisMission(m:frais ):Observable<any>{
    return this.http.post(this.baseUrl+'/api/getFraisMission',m,{responseType: 'json'}) ; 
  }
  
  validerMission(m:ordMiss):Observable<any> {
return this.http.put(this.baseUrl+'/api/updateordMiss',m)
  }

  addFrais(m:frais):Observable<any>{
    console.log('service frais') ; 
    return this.http.post(this.baseUrl+'/api/addFrais',m) ; }
  updateBudget(a :budget):Observable<any>{
    console.log('service budget update') ; 
     return this.http.put(this.baseUrl+'/api/updateBudget',a) ; 
    }
  updateBudgetProjet(a :budgetProjet):Observable<any>{
    console.log('west service');
      return this.http.put(this.baseUrl+'/api/updateBudgetProjet',a) ; 
     }
     updateMission(m:Mission):Observable<any>{
       return this.http.put(this.baseUrl+'/api/mission/update',m) ; 
     }
     getMission(m:Mission):Observable<any>{
      return this.http.post(this.baseUrl+'/api/mission/missionValidation',m) ; 
     }
     validerBudget(budgetValid : budgetProjet):Observable<any>{
       return this.http.put(this.baseUrl+'/api/updateBudgetProjet',budgetValid);
     }
     validerBudgetProjet(b:budget):Observable<any>{
       return this.http.put(this.baseUrl+'/api/updateBudget',b) ; 
     }
     getFraisByOne(f:frais):Observable<any>{
      return this.http.post(this.baseUrl+'/api/getFrais',f) ; 
     }
     updateProjet(p:Projet):Observable<any>{
      return this.http.put(this.baseUrl+'/api/updateProjet',p) ; 
     }
     getMissionNumbers(annee : String) :Observable<any>{
       console.log('west el srvice') ; 
      return this.http.get(this.baseUrl+'/api/mission/CountMission?annee='+annee) ; 
    }



}
