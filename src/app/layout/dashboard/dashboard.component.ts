import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Store } from '@ngrx/store';
import { Principal } from '../../shared/principal.model';
import { PrincipalState } from '../../shared/principal.state';
import { UserStruct } from 'src/app/models/UserStruct';
import { DeptGen } from 'src/app/models/DeptGen';
import { HomeService } from 'src/app/services/home.service';
import { Missionnaire } from 'src/app/models/missionnaire';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor(private store : Store<PrincipalState>,private homeService : HomeService ) {
        this.sliders.push(
            {
                imagePath: 'assets/images/slider1.jpg',
                label: '',
                text:
                    ''
            },
            {
                imagePath: 'assets/images/slider2.jpg',
                label: '',
                text: ''
            },
            {
                imagePath: 'assets/images/slider3.jpg',
                label: '',
                text:
                    ''
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }
    hasRole :Boolean=false ; 
    private principal : Principal ; 
    ngOnInit() {

        this.store.select('principal').subscribe(principal =>{
            this.principal = principal ;    
            console.log('principal',principal) ; 
        }) ; 
        this.cin_user = localStorage.getItem('username');
        console.log("username: "+this.cin_user) ; 
        this.DeptOfUsername() ; 
        var DeptGenVal = localStorage.getItem('deptGen') ; 
        var data = JSON.parse(DeptGenVal) ; 
        console.log('libelee arabe ',data.departement.libA) ;
        this.depart=data.departement.libA;
    }
    msg : String = 'off' ; 
    dept: UserStruct; 
    private cin_user : String ; 
    user:string;
    username:string;
    depart:String="" ; 
    dep:DeptGen = new DeptGen();

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    DeptOfUsername(){
        let m : Missionnaire=new Missionnaire() ; 
m.cin=this.cin_user ; 
        this.homeService.getDept(m).subscribe(
          data => { this.dept=data;
            let key = 'deptGen';
            localStorage.setItem(key, JSON.stringify(this.dept));
          }
        ,
          error => {console.log(error); } , 
          () => {console.log("loading username was done") ; }
        )}
}
