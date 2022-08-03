import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditDepensePageRoutingModule } from './add-edit-depense-routing.module';

import { AddEditDepensePage } from './add-edit-depense.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditDepensePageRoutingModule
  ],
  declarations: [AddEditDepensePage]
})
export class AddEditDepensePageModule {}
