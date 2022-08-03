import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateInventairePage } from './add-update-inventaire.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateInventairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateInventairePageRoutingModule {}
