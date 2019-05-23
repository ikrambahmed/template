import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from '../principal.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }*/
  hasRole :Boolean=false ; 
  private principal : Principal ; 

  constructor(private router: Router) {}
  canActivate() {
    if (this.hasRoleUser()==true) {
        return true;
    }
this.router.navigate(['/']) ; 
    //this.router.navigate(['/']);
    return false;
}

hasRoleUser(){
  this.principal=JSON.parse(localStorage.getItem('principal')) ;
  console.log('principal',this.principal) ; 

   this.principal.authorities.forEach(item => {
     if (item.authority === 'ROLE_ORD')
     {
       this.hasRole=true ;  
       console.log('role ord') ; 
     }
     
   });
   return this.hasRole ; 
 }
}
