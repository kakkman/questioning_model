import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./guards/auth-guard.service";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)},
  { path: 'acct-info', loadChildren: './acct-info/acct-info.module#AcctInfoPageModule', canActivate:[AuthGuardService] },
  { path: 'entitled-deployed', loadChildren: './entitled-deployed/entitled-deployed.module#EntitledDeployedPageModule',canActivate:[AuthGuardService]},
  { path: 'cloud-info', loadChildren: './cloud-info/cloud-info.module#CloudInfoPageModule', canActivate:[AuthGuardService] },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule', canActivate:[AuthGuardService] },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule', canActivate:[AuthGuardService]},
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate:[AuthGuardService]},
  { path: 'competitive-install', loadChildren: './competitive-install/competitive-install.module#CompetitiveInstallPageModule' }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
