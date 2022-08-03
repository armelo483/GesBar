import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFournisseurPage } from './view-fournisseur.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFournisseurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFournisseurPageRoutingModule {}
