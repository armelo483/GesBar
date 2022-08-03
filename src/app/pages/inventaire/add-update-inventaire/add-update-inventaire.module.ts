import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateInventairePageRoutingModule } from './add-update-inventaire-routing.module';

import { AddUpdateInventairePage } from './add-update-inventaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUpdateInventairePageRoutingModule
  ],
  declarations: [AddUpdateInventairePage]
})
export class AddUpdateInventairePageModule {}
