import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateCategorieDepensePageRoutingModule } from './add-update-categorie-depense-routing.module';

import { AddUpdateCategorieDepensePage } from './add-update-categorie-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddUpdateCategorieDepensePageRoutingModule
  ],
  declarations: [AddUpdateCategorieDepensePage]
})
export class AddUpdateCategorieDepensePageModule {}
