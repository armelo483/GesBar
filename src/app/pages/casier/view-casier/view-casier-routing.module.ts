import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCasierPage } from './view-casier.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCasierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCasierPageRoutingModule {}
