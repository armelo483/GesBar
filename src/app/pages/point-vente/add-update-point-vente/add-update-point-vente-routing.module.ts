import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdatePointVentePage } from './add-update-point-vente.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdatePointVentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdatePointVentePageRoutingModule {}
