import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvariePage } from './avarie.page';

const routes: Routes = [
  {
    path: '',
    component: AvariePage
  },
  {
    path: 'add-update-avarie',
    loadChildren: () => import('./add-update-avarie/add-update-avarie.module').then( m => m.AddUpdateAvariePageModule)
  },
  {
    path: 'view-avarie',
    loadChildren: () => import('./view-avarie/view-avarie.module').then( m => m.ViewAvariePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvariePageRoutingModule {}
