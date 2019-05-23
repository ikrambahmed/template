import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Principal } from 'src/app/shared/principal.model';
import { DeptGen } from 'src/app/models/DeptGen';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    depart:DeptGen ; 

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(private translate: TranslateService, public router: Router) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }
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
       
      hasRole :Boolean=false ; 
      private principal : Principal ; 
      hasRoleCTRL:boolean ;
    
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
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        var DeptGenVal = localStorage.getItem('deptGen') ; 
        var data = JSON.parse(DeptGenVal) ; 
        console.log('libelee arabe ',data.departement.libA) ;
        this.depart=data.departement.libA;
        console.log('localStorage' , JSON.parse(localStorage.getItem('principal'))) ; 
        this.principal=JSON.parse(localStorage.getItem('principal')) ;
    
        this.hasRoleController() ; 
        this.hasRoleUser() ; 
    
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
