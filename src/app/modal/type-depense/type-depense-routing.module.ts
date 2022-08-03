import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeDepensePage } from './type-depense.page';

const routes: Routes = [
  {
    path: '',
    component: TypeDepensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeDepensePageRoutingModule {}
