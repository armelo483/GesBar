import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateRecapPageRoutingModule } from './update-recap-routing.module';

import { UpdateRecapPage } from './update-recap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateRecapPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateRecapPage]
})
export class UpdateRecapPageModule {}
