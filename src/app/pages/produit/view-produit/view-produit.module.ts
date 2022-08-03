import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProduitPageRoutingModule } from './view-produit-routing.module';

import { ViewProduitPage } from './view-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProduitPageRoutingModule
  ],
  declarations: [ViewProduitPage]
})
export class ViewProduitPageModule {}
