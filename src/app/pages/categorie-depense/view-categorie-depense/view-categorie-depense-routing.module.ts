import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCategorieDepensePage } from './view-categorie-depense.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCategorieDepensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCategorieDepensePageRoutingModule {}
