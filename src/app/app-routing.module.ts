import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'acct-info', loadChildren: './acct-info/acct-info.module#AcctInfoPageModule' },
  { path: 'entitled-deployed', loadChildren: './entitled-deployed/entitled-deployed.module#EntitledDeployedPageModule' },
  { path: 'cloud-info', loadChildren: './cloud-info/cloud-info.module#CloudInfoPageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
