import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})

export class ChangePassComponent implements OnInit {
  password:String ; 
  newPassword:String ; 
  newPassword2:String ; 

  constructor(private appService : AppService, private alertService : AlertService) { }

  ngOnInit() {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.userName = localStorage.getItem('username');
        resolve();
      }, 1000);     
    })
  }
user : User ; 
userName:String ; 
  verifier(){
   
    this.user=new User() ; 
    this.user.password=this.password ; 
    this.user.username=this.userName ; 
    this.appService.verifierUser(this.user).subscribe(
      res=>{
        if((res!=null)||(res!=undefined)){
          if(this.newPassword!=this.newPassword2){
            this.error('كلمتي العبور غير متطابقتين')
          }
          else{
          this.user.password=this.newPassword ;
          this.appService.changerMotDePasse(this.user).subscribe
          (res=>{console.log(res) ;
          this.success('تم تغيير كلمة العبور بنجاح')},
            error =>{console.log(error);}) ; 
        }}
        else{this.error('الرجاء اعادة كتابة كلمة العبور') ; }
      } , 
      error =>{console.log('الرجاء اعادة كتابة كلمة العبور') ; } , 
      ()=>{console.log('done searching') ; }
    )
  }

  error(message: string) {
  this.alertService.error(message);
}
clear() {
  this.alertService.clear();
}
success(message: string) { 
  this.alertService.success(message);
}

}
