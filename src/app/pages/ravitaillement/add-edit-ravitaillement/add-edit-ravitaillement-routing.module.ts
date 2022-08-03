import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditRavitaillementPage } from './add-edit-ravitaillement.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditRavitaillementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditRavitaillementPageRoutingModule {}
