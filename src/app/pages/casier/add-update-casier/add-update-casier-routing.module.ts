import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateCasierPage } from './add-update-casier.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateCasierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateCasierPageRoutingModule {}
