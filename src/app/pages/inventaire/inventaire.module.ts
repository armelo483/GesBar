import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentModule } from 'src/app/components/component.module';

import { InventairePageRoutingModule } from './inventaire-routing.module';

import { InventairePage } from './inventaire.page';

@NgModule({
  imports: [
    CommonModule,ComponentModule,
    FormsModule,
    IonicModule,
    InventairePageRoutingModule
  ],
  declarations: [InventairePage]
})
export class InventairePageModule {}
