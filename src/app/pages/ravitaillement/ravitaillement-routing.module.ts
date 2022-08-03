import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RavitaillementPage } from './ravitaillement.page';

const routes: Routes = [
  {
    path: '',
    component: RavitaillementPage
  },
  {
    path: 'ravitailler',
    loadChildren: () => import('./ravitailler/ravitailler.module').then( m => m.RavitaillerPageModule)
  },
  {
    path: 'add-edit-ravitaillement',
    loadChildren: () => import('./add-edit-ravitaillement/add-edit-ravitaillement.module').then( m => m.AddEditRavitaillementPageModule)
  },
  {
    path: 'list-produit/:id',
    loadChildren: () => import('./list-produit/list-produit.module').then( m => m.ListProduitPageModule)
  },
  {
    path: 'list-ravitailler',
    loadChildren: () => import('./list-ravitailler/list-ravitailler.module').then( m => m.ListRavitaillerPageModule)
  },
  {
    path: 'add-edit-entree-sortie-casier',
    loadChildren: () => import('./add-edit-entree-sortie-casier/add-edit-entree-sortie-casier.module').then( m => m.AddEditEntreeSortieCasierPageModule)
  },
  {
    path: 'recapitulatif',
    loadChildren: () => import('./recapitulatif/recapitulatif.module').then( m => m.RecapitulatifPageModule)
  }
];

@NgModule({
  imports: [
    
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RavitaillementPageRoutingModule {}
