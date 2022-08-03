import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDepensePage } from './view-depense.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDepensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDepensePageRoutingModule {}
