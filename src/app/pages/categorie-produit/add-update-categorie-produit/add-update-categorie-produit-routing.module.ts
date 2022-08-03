import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateCategorieProduitPage } from './add-update-categorie-produit.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateCategorieProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateCategorieProduitPageRoutingModule {}
