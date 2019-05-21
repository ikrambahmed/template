import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProjetComponent } from '../projet/projet.component';
import { MissionComponent } from '../mission/mission.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BudgetDeptComponent } from '../budget-dept/budget-dept.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetProjComponent } from '../budget-proj/budget-proj.component';
import { MissionnaireComponent } from './missionnaire/missionnaire.component';
import { ListeMissionnaireComponent } from './liste-missionnaire/liste-missionnaire.component';
import { MissionaireComponent } from './missionaire/missionaire.component';
import { OneMissionComponent } from './one-mission/one-mission.component';
import { OrdMissionnaireComponent } from './ord-missionnaire/ord-missionnaire.component';
import { FraisMissionComponent } from './frais-mission/frais-mission.component';
import { ValidationComponent } from './validation/validation.component';
import { StoreModule } from '@ngrx/store';
import { principalReducer } from '../shared/principal.reducer';
import { ListeOrdreComponent } from './liste-ordre/liste-ordre.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AjoutMissionComponent } from './ajout-mission/ajout-mission.component';
import { PageHeaderModule } from '../shared';
import { StepperComponent } from './stepper/stepper.component';
import {DlDateTimePickerModule, DlDateTimeDateModule, DlDateTimeInputModule} from 'angular-bootstrap-datetimepicker';
import { ValidationBudgetComponent } from './validation-budget/validation-budget.component';
import { ValidationBudProjComponent } from './validation-bud-proj/validation-bud-proj.component';
import { ValidationCTRLMissionComponent } from './validation-ctrlmission/validation-ctrlmission.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { RecapComponent } from './recap/recap.component';
import { ModifMissionComponent } from './modif-mission/modif-mission.component';
import { TabSetModifComponent } from './tab-set-modif/tab-set-modif.component';
import { AlertComponent } from './alert/alert.component'
@NgModule({
    imports: [
        CommonModule,
        DlDateTimeInputModule,
        DlDateTimeDateModule, 
        DlDateTimePickerModule,    
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule ,
        HttpClientModule ,
        HttpClientModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        NgbModule ,
        PageHeaderModule,
        StoreModule.forRoot({principal:principalReducer})
    ],
    declarations: [LayoutComponent,StepperComponent,ProjetComponent, SidebarComponent, HeaderComponent,BudgetDeptComponent,ProjetComponent, MissionComponent,MissionnaireComponent,
    BudgetProjComponent,
    ListeMissionnaireComponent,
    MissionaireComponent,
    OneMissionComponent,
    OrdMissionnaireComponent,
    FraisMissionComponent,
    ValidationComponent,
    ListeOrdreComponent,
    NavbarComponent,
    AjoutMissionComponent,
    ValidationBudgetComponent,
    ValidationBudProjComponent,
    ValidationCTRLMissionComponent,
    ChangePassComponent,
    RecapComponent,
    ModifMissionComponent,
    TabSetModifComponent,
    AlertComponent]
})
export class LayoutModule {}
