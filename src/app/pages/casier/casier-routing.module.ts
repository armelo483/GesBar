import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasierPage } from './casier.page';

const routes: Routes = [
  {
    path: '',
    component: CasierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasierPageRoutingModule {}
