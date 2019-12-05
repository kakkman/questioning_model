import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./guards/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'acct-info', loadChildren: './acct-info/acct-info.module#AcctInfoPageModule' },
  { path: 'entitled-deployed', loadChildren: './entitled-deployed/entitled-deployed.module#EntitledDeployedPageModule' },
  { path: 'cloud-info', loadChildren: './cloud-info/cloud-info.module#CloudInfoPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[AuthGuardService]}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
