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

@Injectable()
export class MissionService {

  baseUrl = environment.baseUrl;

  missions : Mission[];
  constructor(private http : HttpClient) { }

  getProjet(dept : String ) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/listeProjetByDept?codeDept='+dept) ; 
  }
  getOneMiss(cin : String) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/getOneMiss?cin='+cin) ; 
   }
  getMissions(codeDept: String):Observable<any> {
    return this.http.get('http://localhost:8080/miss_cni-0.0.1-SNAPSHOT/api/mission/listeMissionByDept?codeDept='+codeDept) ; 
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

  getLatestMissionCode(code : String) :Observable<any>{
    return this.http.get(this.baseUrl+'/api/mission/latestCode?codeDept='+code) ; 
  }
  getPays() :Observable<any>{
    return this.http.get(this.baseUrl+'/api/listPays') ; 
  }
  getBudget(code :String) :Observable<any>{
    return this.http.get(this.baseUrl+'/api/listbyDept?codeDept='+code) ; 
  }
  addBudgetDept(m :budget):Observable<any>{
    return this.http.post('http://localhost:8080/miss_cni-0.0.1-SNAPSHOT/api/addBudget' , m) ; 

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

  getBudgets(code:String): Observable<any>{
    return this.http.get(this.baseUrl+'/api/listbyDept?codeDept='+code) ;
  }
  getBudgetsProjet(code:String):Observable<any>{
    return this.http.get(this.baseUrl+'/api/listBudgetProjetbydept?codeDept='+code) ; 

  }
  getTypeFrais():Observable<any>{
    return this.http.get(this.baseUrl+'/api/listType') ; 
  }
  getprojets(cod:String):Observable<any>{
    return this.http.get(this.baseUrl+'/api/listeProjetByDept?codeDept='+cod) ; 
  }

  getOneMission(m:Mission):Observable<any>{
    console.log("inside service");
    return this.http.post(this.baseUrl+'/api/mission/findById',m) ; 
  }
  getFraisMission(codeDept:String , numMission :String ,numOrd:Number , cin : String ):Observable<any>{
    console.log('données',cin,numOrd,numMission,codeDept) ; 
    return this.http.get(this.baseUrl+'/api/getFraisMission?codeDept='+codeDept+'&numMission='+numMission+'&cin='+cin+'&numOrd='+numOrd,{responseType: 'json'}) ; 
  }
  
  validerMission(m:ordMiss):Observable<any> {
return this.http.put(this.baseUrl+'/api/updateordMiss',m)
  }

  addFrais(m:frais):Observable<any>{
    console.log('service frais') ; 
    return this.http.post(this.baseUrl+'/api/addFrais',m) ; }
  updateBudget(a :budget):Observable<any>{
     return this.http.put(this.baseUrl+'/api/updateBudget',a) ; 
    }

  updateBudgetProjet(a :budgetProjet):Observable<any>{
    console.log('west service');
      return this.http.put(this.baseUrl+'/api/updateBudgetProjet',a) ; 
     }
     updateMission(m:Mission):Observable<any>{
       return this.http.put(this.baseUrl+'/api/mission/update',m) ; 


     }
     getMission(code : String , numMission:String):Observable<any>{
      return this.http.get(this.baseUrl+'/api/mission/missionValidation?codeDept='+code+'?numMission='+numMission) ; 
     }
}
