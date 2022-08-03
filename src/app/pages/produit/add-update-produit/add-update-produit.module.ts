import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddUpdateProduitPageRoutingModule } from './add-update-produit-routing.module';

import { AddUpdateProduitPage } from './add-update-produit.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AddUpdateProduitPageRoutingModule
  ],
  declarations: [AddUpdateProduitPage]
})
export class AddUpdateProduitPageModule {}
