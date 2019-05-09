import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { BudgetDeptComponent } from './budget-dept/budget-dept.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { HomeService } from './services/home.service';
import { MissionService } from './services/mission.service';
import { MissionnaireService } from './services/missionnaire.service';
import { OrdMissService } from './services/ord-miss.service';
import { XHrInterceptor } from './xhr.interceptor';
import { ProjetComponent } from './projet/projet.component';
import { MissionComponent } from './mission/mission.component';
import { CookieService } from 'ngx-cookie-service';
import { BudgetProjComponent } from './budget-proj/budget-proj.component';
import { StoreModule } from '@ngrx/store';
import { principalReducer } from './shared/principal.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        StoreModule.forRoot({principal:principalReducer}),
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule , 
        ReactiveFormsModule ,
        HttpClientModule ,
        BrowserModule,
        HttpClientModule,
        Ng2SearchPipeModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        NgbModule.forRoot() , 
     
    
       
    ],
    declarations: [AppComponent ],
    providers: [AuthGuard,AppService,CookieService,
     HomeService,MissionService, OrdMissService, MissionnaireService, 
        {provide :HTTP_INTERCEPTORS, useClass :XHrInterceptor  , multi : true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
