import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LigneEmployePage } from './ligne-employe.page';

const routes: Routes = [
  {
    path: '',
    component: LigneEmployePage
  },
  {
    path: 'add-update-ligne-depense',
    loadChildren: () => import('./add-update-ligne-depense/add-update-ligne-depense.module').then( m => m.AddUpdateLigneDepensePageModule)
  },
  {
    path: 'view-ligne-depense',
    loadChildren: () => import('./view-ligne-depense/view-ligne-depense.module').then( m => m.ViewLigneDepensePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LigneEmployePageRoutingModule {}
