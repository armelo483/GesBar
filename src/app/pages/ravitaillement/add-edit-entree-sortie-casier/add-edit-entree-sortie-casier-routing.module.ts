import { MoneyFormatPipe } from './../../../pipes/money-format.pipe';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditEntreeSortieCasierPage } from './add-edit-entree-sortie-casier.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditEntreeSortieCasierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditEntreeSortieCasierPageRoutingModule {}
