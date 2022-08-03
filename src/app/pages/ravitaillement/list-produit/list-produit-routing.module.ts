import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProduitPage } from './list-produit.page';

const routes: Routes = [
  {
    path: '',
    component: ListProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProduitPageRoutingModule {}
