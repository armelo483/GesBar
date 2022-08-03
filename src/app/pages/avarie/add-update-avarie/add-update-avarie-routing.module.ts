import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateAvariePage } from './add-update-avarie.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateAvariePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateAvariePageRoutingModule {}
