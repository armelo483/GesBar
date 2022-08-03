import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCategorieProduitPageRoutingModule } from './view-categorie-produit-routing.module';

import { ViewCategorieProduitPage } from './view-categorie-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCategorieProduitPageRoutingModule
  ],
  declarations: [ViewCategorieProduitPage]
})
export class ViewCategorieProduitPageModule {}
