import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { PrincipalState } from './shared/principal.state';
import { SAVE_PRINCIPAL } from './shared/save.principal.action';
import { environment } from './shared/environment';
import { Observable } from 'rxjs';


@Injectable()
export class AppService {
  response ; 
  authenticated: boolean = false;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
      private cookieService: CookieService, 
      private store :Store<PrincipalState> ) { }
      
   /* createToken(m) : Observable<any>{
        console.log('fi west el service createToken') ; 
        return this.http.post('http://localhost:8080/token',m,{responseType: 'text'}) ; 
      } */

  authenticate(credentials, callback) {
    if(credentials){
      let user = credentials.username ; 
      const token = btoa(credentials.username + ':' + credentials.password);
      console.log('create token') ;
     // this.cookieService.set('token',token);
localStorage.setItem('token',token) ; 
      this.http.get(this.baseUrl+'/api/user').subscribe(response => {
         if (response && response['name']) {
        localStorage.setItem('principal',JSON.stringify(response)
        ) ; 
          console.log(response);
           // this.response=response; 
            this.authenticated = true;
            //on met le principal dans le store 

          this.store.dispatch({
              type : SAVE_PRINCIPAL , 
              payload : response
            }) ; 
            let key = 'username';
             localStorage.setItem(key, user); 
          } else {
              this.authenticated = false;
          }
          return callback && callback();
      });
    }
    else {
      this.authenticated = false;
    }
  }

  logout(callback){
    this.authenticated = false;
    return callback && callback();
  }

}
