import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditDepensePage } from './add-edit-depense.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditDepensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditDepensePageRoutingModule {}
