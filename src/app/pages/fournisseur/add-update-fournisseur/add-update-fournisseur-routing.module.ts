import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateFournisseurPage } from './add-update-fournisseur.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateFournisseurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateFournisseurPageRoutingModule {}
