import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateRecapPage } from './update-recap.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateRecapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateRecapPageRoutingModule {}
