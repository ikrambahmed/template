import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { BudgetDeptComponent } from '../budget-dept/budget-dept.component';
import { ProjetComponent } from '../projet/projet.component';
import { BudgetProjComponent } from '../budget-proj/budget-proj.component';
import { MissionnaireComponent } from './missionnaire/missionnaire.component';
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
import { RoleGuard } from '../shared/guard/role.guard';
import { RoleCTRLGuard } from '../shared/guard/role-ctrl.guard';

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
            {path:'budgetDept',component:BudgetDeptComponent ,canActivate: [RoleGuard] } ,
            {path:'projet',component:ProjetComponent,canActivate: [RoleGuard]} , 
            {path:'missionnaire', component:MissionnaireComponent,canActivate: [RoleGuard]},
            {path:'mission', component:MissionComponent,canActivate: [RoleGuard]},
            {path:'listeOdreMission',component:ListeOrdreComponent,canActivate: [RoleGuard]} , 
            {path:'budgetProj',component:BudgetProjComponent,canActivate: [RoleGuard]} , 
            {path:'stepper',component:StepperComponent,canActivate: [RoleGuard]},
            {path:'ord',component:OrdMissionnaireComponent,canActivate: [RoleGuard]},
            {path:'frais',component:FraisMissionComponent,canActivate: [RoleGuard]},
            {path:'validation',component:ValidationComponent,canActivate: [RoleGuard]},
            {path:'oneMission',component:OneMissionComponent,canActivate: [RoleGuard]},
            {path:'ajoutMission',component:AjoutMissionComponent,canActivate: [RoleGuard]},
            {path:'validationDept',component:ValidationBudgetComponent, canActivate: [RoleCTRLGuard]},
            {path:'validationProj',component:ValidationBudProjComponent, canActivate: [RoleCTRLGuard]},
            {path:'validMissCtrl',component:ValidationCTRLMissionComponent ,  canActivate: [RoleCTRLGuard]},
            {path:'changePassword',component:ChangePassComponent},
            {path:'recap',component:RecapComponent,canActivate: [RoleGuard]},
            {path:'modif',component : ModifMissionComponent,canActivate: [RoleGuard]}, 
            {path:'listeMissionnaire',component:MissionnaireComponent,canActivate: [RoleGuard]}




        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
