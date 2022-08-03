import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProduitPageRoutingModule } from './produit-routing.module';

import { ProduitPage } from './produit.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, ComponentModule,
    ProduitPageRoutingModule
  ],
  declarations: [ProduitPage]
})
export class ProduitPageModule {
  
}
