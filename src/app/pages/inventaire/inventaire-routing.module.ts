import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventairePage } from './inventaire.page';

const routes: Routes = [
  {
    path: '',
    component: InventairePage
  },
  {
    path: 'list-inventaire',
    loadChildren: () => import('./list-inventaire/list-inventaire.module').then( m => m.ListInventairePageModule)
  },
  {
    path: 'view-inventaire',
    loadChildren: () => import('./view-inventaire/view-inventaire.module').then( m => m.ViewInventairePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventairePageRoutingModule {}
