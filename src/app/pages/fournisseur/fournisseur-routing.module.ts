import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FournisseurPage } from './fournisseur.page';

const routes: Routes = [
  {
    path: '',
    component: FournisseurPage
  },
  {
    path: 'add-update-fournisseur',
    loadChildren: () => import('./add-update-fournisseur/add-update-fournisseur.module').then( m => m.AddUpdateFournisseurPageModule)
  },
  {
    path: 'view-fournisseur/:id',
    loadChildren: () => import('./view-fournisseur/view-fournisseur.module').then( m => m.ViewFournisseurPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FournisseurPageRoutingModule {}
