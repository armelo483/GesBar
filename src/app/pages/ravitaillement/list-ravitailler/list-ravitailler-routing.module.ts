import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRavitaillerPage } from './list-ravitailler.page';

const routes: Routes = [
  {
    path: '',
    component: ListRavitaillerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRavitaillerPageRoutingModule {}
