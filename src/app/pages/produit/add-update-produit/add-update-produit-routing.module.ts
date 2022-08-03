import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateProduitPage } from './add-update-produit.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateProduitPageRoutingModule {}
