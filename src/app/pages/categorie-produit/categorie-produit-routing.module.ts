import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieProduitPage } from './categorie-produit.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieProduitPage
  },
  {
    path: 'add-update-categorie-produit',
    loadChildren: () => import('./add-update-categorie-produit/add-update-categorie-produit.module').then( m => m.AddUpdateCategorieProduitPageModule)
  },
  {
    path: 'view-categorie-produit',
    loadChildren: () => import('./view-categorie-produit/view-categorie-produit.module').then( m => m.ViewCategorieProduitPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieProduitPageRoutingModule {}
