import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    credentials = {
      username: '',
      password: ''
    };
 isLoggedin:boolean ; 
    constructor(private fb: FormBuilder,
      private appService: AppService,
      private router: Router ,
      private alertService : AlertService) { }
  
  ngOnInit() {
  this.loginForm = this.fb.group({
  username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
  });
  }
  authenticated:Boolean ; 
  error(message: string) {
    this.alertService.error(message);
  }

  login(){
    this.appService.authenticate(this.credentials,()=>{
      this.isLoggedin=JSON.parse(localStorage.getItem('isLoggedin') ); 
if(this.isLoggedin==true)
      {this.router.navigateByUrl('/dashboard');}
else
        {alert('usename or password is invalid');}
      })}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
    success(message: string) { 
      this.alertService.success(message);
    }
}
