import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployePage } from './employe.page';

const routes: Routes = [
  {
    path: '',
    component: EmployePage
  },
  {
    path: 'view-employe',
    loadChildren: () => import('./view-employe/view-employe.module').then( m => m.ViewEmployePageModule)
  },
  {
    path: 'add-update-employe',
    loadChildren: () => import('./add-update-employe/add-update-employe.module').then( m => m.AddUpdateEmployePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployePageRoutingModule {}
