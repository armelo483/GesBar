import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAvariePage } from './view-avarie.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAvariePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAvariePageRoutingModule {}
