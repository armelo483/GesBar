import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPointVentePageRoutingModule } from './view-point-vente-routing.module';

import { ViewPointVentePage } from './view-point-vente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPointVentePageRoutingModule
  ],
  declarations: [ViewPointVentePage]
})
export class ViewPointVentePageModule {}
