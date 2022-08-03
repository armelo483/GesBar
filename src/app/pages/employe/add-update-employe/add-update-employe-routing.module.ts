import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateEmployePage } from './add-update-employe.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateEmployePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateEmployePageRoutingModule {}
