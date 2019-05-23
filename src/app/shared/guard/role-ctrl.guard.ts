import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Principal } from '../principal.model';

@Injectable({
  providedIn: 'root'
})
export class RoleCTRLGuard implements CanActivate {
  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }*/
  private principal : Principal ; 
  hasRoleCTRL:boolean ;

  constructor(private router: Router) {}
  canActivate() {
    if (this.hasRoleController()==true) {
        return true;
    }
this.router.navigate(['/']) ; 
    //this.router.navigate(['/']);
    return false;
}

hasRoleController(){
  this.principal=JSON.parse(localStorage.getItem('principal')) ;

  console.log('principal',this.principal) ; 
  this.principal.authorities.forEach(item => {
    if (item.authority === 'ROLE_CONTROL')
    {
      this.hasRoleCTRL=true ;  
      console.log('role controller') ; 
    }
    
  });
  return this.hasRoleCTRL ; 
}
 

}
