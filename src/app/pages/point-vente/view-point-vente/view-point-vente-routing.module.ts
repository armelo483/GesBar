import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPointVentePage } from './view-point-vente.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPointVentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPointVentePageRoutingModule {}
