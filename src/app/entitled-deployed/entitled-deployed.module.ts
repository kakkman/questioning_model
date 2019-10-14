import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EntitledDeployedPage } from './entitled-deployed.page';

const routes: Routes = [
  {
    path: '',
    component: EntitledDeployedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EntitledDeployedPage]
})
export class EntitledDeployedPageModule {}
