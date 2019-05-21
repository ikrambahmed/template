import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})

export class ChangePassComponent implements OnInit {
  password:String ; 
  password1:String=''; 
  password2:String='' ; 

  constructor(private fb : FormBuilder ,private appService : AppService, private alertService : AlertService) { }
  myForm:FormGroup ; 
  ngOnInit() {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.userName = localStorage.getItem('username');
        resolve();
      }, 1000);     
    }) ; 
    this.myForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password1: ['', Validators.compose([Validators.required, Validators.minLength(3)])] , 
      password2: ['', Validators.compose([Validators.required, Validators.minLength(3)])]

      });
    

  }
user : User ; 
userName:String ; 
  verifier(){
   //alert('verif') ; 
    this.user=new User() ; 
    this.user.password=this.password ; 
    this.user.username=this.userName ; 
  // alert(JSON.stringify(this.user)) ; 
  alert(this.password1 );
  alert(this.password2) ; 
    this.appService.verifierUser(this.user).subscribe(
      res=>{
     //   alert('done searching') ; 
        console.log(res,'resultat') ; 
        if((res!=null)||(res!=undefined)){
          
          if(this.password1!=this.password2){
            this.error('كلمتي العبور غير متطابقتين  ') ; 
            this.myForm.controls['password1'].setErrors({'incorrect': true});
            this.myForm.controls['password2'].setErrors({'incorrect': true});


          }
          else{
          this.user.password=this.password1 ;
         /* this.appService.changerMotDePasse(this.user).subscribe
          (res=>{console.log(res) ;
          this.success('تم تغيير كلمة العبور بنجاح')},
            error =>{console.log(error);}) ; */
            this.success('تم تغيير كلمة العبور بنجاح  ')
        }}
        else{this.error('الرجاء اعادة كتابة كلمة العبور  ') ;
        this.myForm.controls['password'].setErrors({'incorrect': true});
      }
      } , 
      error =>{console.log('خطا') ; } , 
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
