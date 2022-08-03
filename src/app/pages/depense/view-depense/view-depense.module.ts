import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDepensePageRoutingModule } from './view-depense-routing.module';

import { ViewDepensePage } from './view-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDepensePageRoutingModule
  ],
  declarations: [ViewDepensePage]
})
export class ViewDepensePageModule {}
