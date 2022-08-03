import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateAvariePageRoutingModule } from './add-update-avarie-routing.module';

import { AddUpdateAvariePage } from './add-update-avarie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddUpdateAvariePageRoutingModule
  ],
  declarations: [AddUpdateAvariePage]
})
export class AddUpdateAvariePageModule {}
