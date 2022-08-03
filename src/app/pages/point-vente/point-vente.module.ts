import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointVentePageRoutingModule } from './point-vente-routing.module';

import { PointVentePage } from './point-vente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointVentePageRoutingModule
  ],
  declarations: [PointVentePage]
})
export class PointVentePageModule {}
