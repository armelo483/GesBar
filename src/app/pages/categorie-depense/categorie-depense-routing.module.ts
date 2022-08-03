import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieDepensePage } from './categorie-depense.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieDepensePage
  },
  {
    path: 'add-update-categorie-depense',
    loadChildren: () => import('./add-update-categorie-depense/add-update-categorie-depense.module').then( m => m.AddUpdateCategorieDepensePageModule)
  },
  {
    path: 'view-categorie-depense',
    loadChildren: () => import('./view-categorie-depense/view-categorie-depense.module').then( m => m.ViewCategorieDepensePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieDepensePageRoutingModule {}
