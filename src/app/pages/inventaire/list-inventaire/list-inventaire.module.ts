import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListInventairePageRoutingModule } from './list-inventaire-routing.module';

import { ListInventairePage } from './list-inventaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListInventairePageRoutingModule
  ],
  declarations: [ListInventairePage]
})
export class ListInventairePageModule {}
