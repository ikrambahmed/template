import { Injectable } from '@angular/core';
import { environment } from '../shared/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ordMiss } from '../models/Ord_Miss';
import { frais } from '../models/frais';
@Injectable()
export class OrdMissService {
  baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getOrdreMission(ord : ordMiss) : Observable<any>{
    return this.http.post(this.baseUrl+'/api/getMissionnByMision',ord); }
    getLatestOrdreCode(ord:ordMiss) : Observable<any>{
      console.log('service') ; 
      return this.http.post(this.baseUrl+'/api/latestOrdreCode',ord) ;
    }
    getOrdsMiss(ord : ordMiss):Observable<any>{
      return this.http.post(this.baseUrl+'/api/getOrdreMission',ord) ; 

    }
    getOrdre(o:ordMiss):Observable<any>{
      return this.http.post(this.baseUrl+'/api/getAllOrdre',o) ; 

    }
    deleteOrd(o:ordMiss):Observable<any>{
      return this.http.post(this.baseUrl+'/api/delete',o) ; 
    }
    deleteFrais(f:frais):Observable<any>{
      return this.http.post(this.baseUrl+'/api/deleteFrais',f) ; 
    }
}
