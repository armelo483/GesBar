import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListInventairePage } from './list-inventaire.page';

const routes: Routes = [
  {
    path: '',
    component: ListInventairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListInventairePageRoutingModule {}
