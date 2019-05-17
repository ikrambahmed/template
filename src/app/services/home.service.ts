import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environment';

@Injectable()
export class HomeService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getDept(cin:String):Observable<any> 
  {
    return this.http.get(this.baseUrl+'/api/DeptOfUsername?username='+cin) ; 
  }
  getuserName(cin:String):Observable<any>{
    return this.http.get(this.baseUrl+'/api/getNomPrenom?cin='+cin) ; 

  }
  getDepartments():Observable<any>{
    return this.http.get(this.baseUrl+'/api/alldept') ; 
  }
}
