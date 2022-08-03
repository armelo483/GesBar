import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewLigneDepensePageRoutingModule } from './view-ligne-depense-routing.module';

import { ViewLigneDepensePage } from './view-ligne-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewLigneDepensePageRoutingModule
  ],
  declarations: [ViewLigneDepensePage]
})
export class ViewLigneDepensePageModule {}
