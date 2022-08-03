import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCategorieProduitPage } from './view-categorie-produit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCategorieProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCategorieProduitPageRoutingModule {}
