import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecapitulatifPageRoutingModule } from './recapitulatif-routing.module';

import { RecapitulatifPage } from './recapitulatif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RecapitulatifPageRoutingModule
  ],
  declarations: [RecapitulatifPage]
})
export class RecapitulatifPageModule {}
