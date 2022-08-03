import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdatePointVentePageRoutingModule } from './add-update-point-vente-routing.module';

import { AddUpdatePointVentePage } from './add-update-point-vente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddUpdatePointVentePageRoutingModule
  ],
  declarations: [AddUpdatePointVentePage]
})
export class AddUpdatePointVentePageModule {}
