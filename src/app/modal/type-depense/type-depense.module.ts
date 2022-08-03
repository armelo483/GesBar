import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeDepensePageRoutingModule } from './type-depense-routing.module';

import { TypeDepensePage } from './type-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeDepensePageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [TypeDepensePage]
})
export class TypeDepensePageModule {}
