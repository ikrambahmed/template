import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BudgetDeptComponent } from '../budget-dept/budget-dept.component';
import { ProjetComponent } from '../projet/projet.component';
import { BudgetProjComponent } from '../budget-proj/budget-proj.component';
import { MissionnaireComponent } from './missionnaire/missionnaire.component';
import { ListeMissionnaireComponent } from './liste-missionnaire/liste-missionnaire.component';
import { MissionComponent } from '../mission/mission.component';
import { ordMiss } from '../models/Ord_Miss';
import { OrdMissionnaireComponent } from './ord-missionnaire/ord-missionnaire.component';
import { FraisMissionComponent } from './frais-mission/frais-mission.component';
import { ValidationComponent } from './validation/validation.component';
import { ListeOrdreComponent } from './liste-ordre/liste-ordre.component';
import { OneMissionComponent } from './one-mission/one-mission.component';
import { AjoutMissionComponent } from './ajout-mission/ajout-mission.component';
import { StepperComponent } from './stepper/stepper.component';
import { ValidationBudgetComponent } from './validation-budget/validation-budget.component';
import { ValidationBudProjComponent } from './validation-bud-proj/validation-bud-proj.component';
import { ValidationCTRLMissionComponent } from './validation-ctrlmission/validation-ctrlmission.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { RecapComponent } from './recap/recap.component';
import { ModifMissionComponent } from './modif-mission/modif-mission.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            {path:'budgetDept',component:BudgetDeptComponent} ,
            {path:'projet',component:ProjetComponent} , 
            {path:'missionnaire', component:MissionnaireComponent},
            {path:'listeMissionnaire', component:ListeMissionnaireComponent},
            {path:'mission', component:MissionComponent},
            {path:'listeOdreMission',component:ListeOrdreComponent} , 
            {path:'budgetProj',component:BudgetProjComponent} , 
            {path:'stepper',component:StepperComponent},
            {path:'ord',component:OrdMissionnaireComponent},
            {path:'frais',component:FraisMissionComponent},
            {path:'validation',component:ValidationComponent},
            {path:'oneMission',component:OneMissionComponent},
            {path:'ajoutMission',component:AjoutMissionComponent},
            {path:'validationDept',component:ValidationBudgetComponent},
            {path:'validationProj',component:ValidationBudProjComponent},
            {path:'validMissCtrl',component:ValidationCTRLMissionComponent},
            {path:'changePassword',component:ChangePassComponent},
            {path:'recap',component:RecapComponent},
            {path:'modif',component : ModifMissionComponent}, 




        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
