import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointVentePage } from './point-vente.page';

const routes: Routes = [
  {
    path: '',
    component: PointVentePage
  },
  {
    path: 'view-point-vente',
    loadChildren: () => import('./view-point-vente/view-point-vente.module').then( m => m.ViewPointVentePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointVentePageRoutingModule {}
