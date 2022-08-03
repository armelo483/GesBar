import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewLigneDepensePage } from './view-ligne-depense.page';

const routes: Routes = [
  {
    path: '',
    component: ViewLigneDepensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewLigneDepensePageRoutingModule {}
