import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateCategorieProduitPageRoutingModule } from './add-update-categorie-produit-routing.module';

import { AddUpdateCategorieProduitPage } from './add-update-categorie-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    AddUpdateCategorieProduitPageRoutingModule
  ],
  declarations: [AddUpdateCategorieProduitPage]
})
export class AddUpdateCategorieProduitPageModule {}
