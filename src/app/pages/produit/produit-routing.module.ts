import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitPage } from './produit.page';

const routes: Routes = [
  {
    path: '',
    component: ProduitPage
  },
  {
    path: 'view-produit',
    loadChildren: () => import('./view-produit/view-produit.module').then( m => m.ViewProduitPageModule)
  },
  // {
  //   path: 'update-produit',
  //   loadChildren: () => import('./add-update-produit/add-update-produit.module').then( m => m.AddUpdateProduitPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduitPageRoutingModule {}
