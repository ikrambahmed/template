import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DeptGen } from 'src/app/models/DeptGen';
import { UserStruct } from 'src/app/models/UserStruct';
import { User } from 'src/app/models/User';

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
    
  
  
  
  
  
  
  
  
    ngOnInit() {
    this.cin_user = localStorage.getItem('username');
    console.log("username: "+this.cin_user) ; 
    this.DeptOfUsername() ; 
    var DeptGenVal = localStorage.getItem('deptGen') ; 
    var data = JSON.parse(DeptGenVal) ; 
    console.log('libelee arabe ',data.departement.libA) ;
    this.depart=data.departement.libA;
    this.LoadNameUser() ; 
  }

}
