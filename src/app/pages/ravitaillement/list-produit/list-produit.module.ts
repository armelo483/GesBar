import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProduitPageRoutingModule } from './list-produit-routing.module';

import { ListProduitPage } from './list-produit.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,ComponentModule,
    FormsModule,
    IonicModule,
    ListProduitPageRoutingModule
  ],
  declarations: [ListProduitPage]
})
export class ListProduitPageModule {}
