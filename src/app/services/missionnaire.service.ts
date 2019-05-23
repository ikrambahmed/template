import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Missionnaire } from '../models/missionnaire';
import { environment } from '../shared/environment';
import { grade } from '../models/grade';
import { ordMiss } from '../models/Ord_Miss';
import { DeptGen } from '../models/DeptGen';

@Injectable()
export class MissionnaireService {
  grades:grade[] ; 
  missionnaires : Missionnaire[] ; 
  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient){

  }
  searchMissionnaire(m:Missionnaire):Observable<any> {
    return this.http.post(this.baseUrl+'/api/searchMissionnaire',m); 
  }
  getMissionares(m:DeptGen):Observable<any> {
    return this.http.post(this.baseUrl+'/api/listeMissionnaireByDept',m); 
  }
  cod :String ; 
  m:DeptGen ; 
  loadMissionaire()
  {   this.m=new DeptGen() ; 
    this.m.code=this.cod ; 
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('retrievedObject: ',data.code) ;
    this.cod=data.code;
    this.getMissionares(this.m).subscribe(
    data => { this.missionnaires=data},
    error => {console.log(error) } , 
    () => {console.log('loading missionnaires was done ')}
  )}
  addMissionnaire( miss : Missionnaire) : Observable<any>{
    console.log('fi west el service') ; 
    return this.http.post(this.baseUrl+'/api/add',miss  ) ; 
 
  }
  updateMissionnaire(miss : Missionnaire ): Observable<any> {
    return this.http.put(this.baseUrl+'/api',miss) ;
  }

  deleteMissionnaire(cin : String) : Observable<any>{
   return this.http.delete(this.baseUrl+'/api'+`/${cin}`) ; 
  }
  getGrade():Observable<any> 
  { return this.http.get(this.baseUrl+'/api/allGrade') ; 
  }
  
  getfonctions():Observable<any> 
  {console.log('dkhalna lil fonctions')
    return this.http.get(this.baseUrl+'/api/listfonction'); }
  
  getClasses():Observable<any> 
  {
    return this.http.get(this.baseUrl+'/api/allClasse') ; 
  }
  public getToken():string {
    return localStorage.getItem('token');
  }

  getCategories():Observable<any> 
  {    
   /* var jsonObject : any = JSON.parse(this.getToken()) ; 
  
const httpOptions = {
     headers: new HttpHeaders({
     'Authorisation': 'Token '+jsonObject 
    })
};
console.log('Token '+jsonObject) ; 
    return this.http.get('http://localhost:8080/rest/listcategorie/allcat') ; 
  */
 return this.http.get(this.baseUrl+'/api/all') ; 

  }

  getgroupes():Observable<any> 
  {
    return this.http.get(this.baseUrl+'/api/listgroupe') ; 
  }
/* getOneGrade(lib : String):Observable<any>
 {
  return this.http.get(this.rl+'/listegrade?name='+lib)
}*/
//getMissionnaireByCin
getOneMiss(missCin : Missionnaire) : Observable<any>{
  return this.http.post(this.baseUrl+'/api/getOneMiss',missCin) ; 
 }
 getDept(cin:Missionnaire):Observable<any> 
 {
   return this.http.post(this.baseUrl+'/api/DeptOfUsername',cin) ; 
 }
 rechercheMissionnaire(miss : Missionnaire) : Observable<any>{
  return this.http.get(this.baseUrl+'/api/') ; 

 }

}
