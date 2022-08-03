import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieProduitPageRoutingModule } from './categorie-produit-routing.module';

import { CategorieProduitPage } from './categorie-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieProduitPageRoutingModule
  ],
  declarations: [CategorieProduitPage]
})
export class CategorieProduitPageModule {}
