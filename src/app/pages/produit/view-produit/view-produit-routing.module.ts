import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProduitPage } from './view-produit.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProduitPageRoutingModule {}
