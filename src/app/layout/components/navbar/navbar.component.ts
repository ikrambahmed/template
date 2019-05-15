import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DeptGen } from 'src/app/models/DeptGen';
import { UserStruct } from 'src/app/models/UserStruct';
import { User } from 'src/app/models/User';
import { Principal } from 'src/app/shared/principal.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  operation:String ;
  cin_user :String ; 
  depart:String="" ; 
  dep:DeptGen = new DeptGen();
  dept: UserStruct; 
  hasRole :Boolean=false ; 
  private principal : Principal ; 
  hasRoleCTRL:boolean ;
  constructor(private homeService : HomeService) {
  }
  
  DeptOfUsername(){

    console.log("dkhalna lfonctions dept")
    this.homeService.getDept(this.cin_user).subscribe(
      data => { this.dept=data;
        let key = 'deptGen';
        localStorage.setItem(key, JSON.stringify(this.dept));
      }
    ,
      error => {console.log(error); } , 
      () => {console.log("loading username was done") ; }
    )}
  user : User ; 
  NameString : String ; 
  onLoggedout(){
    localStorage.clear() ; 
  }
    LoadNameUser(){
      this.homeService.getuserName(this.cin_user).subscribe(
        data => { 
          console.log(data) ; 
          this.user=data;
          this.NameString=this.user.nom +" "+this.user.prenom ; 
        }
      ,
        error => {console.log(error); } , 
        () => {console.log("loading username was done") ; }
      )}
    
      hasRoleController(){
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
       
      
       hasRoleUser(){
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
  
  
  
  
  
  
        

    ngOnInit() {
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.cin_user = localStorage.getItem('username');
    console.log("username: "+this.cin_user) ; 
    this.DeptOfUsername() ; 
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('libelee arabe ',data.departement.libA) ;
    this.depart=data.departement.libA;
    this.LoadNameUser() ; 
  
    console.log('localStorage' , JSON.parse(localStorage.getItem('principal'))) ; 
    this.principal=JSON.parse(localStorage.getItem('principal')) ;
    this.hasRoleController() ; 
    this.hasRoleUser() ; 
          resolve();
        }, 1000);
    
    
      
      })
    } 

}
