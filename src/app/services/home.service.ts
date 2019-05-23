import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../shared/environment';
import { Missionnaire } from '../models/missionnaire';
import { User } from '../models/User';

@Injectable()
export class HomeService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  getDept(m:Missionnaire):Observable<any> 
  {
    return this.http.post(this.baseUrl+'/api/DeptOfUsername',m) ; 
  }
  getuserName(username:User):Observable<any>{
    return this.http.post(this.baseUrl+'/api/getNomPrenom',username) ; 
  }
  getDepartments():Observable<any>{
    return this.http.get(this.baseUrl+'/api/alldept') ; 
  }
}
