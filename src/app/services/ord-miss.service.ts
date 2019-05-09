import { Injectable } from '@angular/core';
import { environment } from '../shared/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class OrdMissService {
  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getOrdreMission(numMission : String) : Observable<any>{
    return this.http.get(this.baseUrl+'/api/getMissionnByMision?numMission='+numMission); }
    getLatestOrdreCode(code : String , numMission:String) : Observable<any>{
      console.log('service') ; 
      return this.http.get(this.baseUrl+'/api/latestOrdreCode?codeDept='+code+'&numMission='+numMission) ;
    }
    getOrdsMiss(code : String):Observable<any>{
      return this.http.get(this.baseUrl+'/api/getOrdreMission?codeDept='+code) ; 

    }
}
