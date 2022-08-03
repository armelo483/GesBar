import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RavitaillerPage } from './ravitailler.page';

const routes: Routes = [
  {
    path: '',
    component: RavitaillerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RavitaillerPageRoutingModule {}
