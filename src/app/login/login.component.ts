import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

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
  
    constructor(private fb: FormBuilder,
      private appService: AppService,
      private router: Router) { }
  
  ngOnInit() {
  this.loginForm = this.fb.group({
  username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  password: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
  });
  }
  
  
  login(){
    this.appService.authenticate(this.credentials, ()=>{
      this.router.navigateByUrl('/dashboard');
    });
    /*this.router.navigateByUrl('/home') ;*/
    
   // this.router.navigateByUrl('/dashboard');

  }
  
    
    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
