import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepensePage } from './depense.page';

const routes: Routes = [
  {
    path: '',
    component: DepensePage
  },
  {
    path: 'add-edit-depense',
    loadChildren: () => import('./add-edit-depense/add-edit-depense.module').then( m => m.AddEditDepensePageModule)
  },
  {
    path: 'view-depense',
    loadChildren: () => import('./view-depense/view-depense.module').then( m => m.ViewDepensePageModule)
  },
  // {
  //   path: 'add-edit-depense/:id',
  //   loadChildren: () => import('./add-edit-depense/add-edit-depense.module').then( m => m.AddEditDepensePageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepensePageRoutingModule {}
