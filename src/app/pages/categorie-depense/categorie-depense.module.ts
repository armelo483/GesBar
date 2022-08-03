import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieDepensePageRoutingModule } from './categorie-depense-routing.module';

import { CategorieDepensePage } from './categorie-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieDepensePageRoutingModule
  ],
  declarations: [CategorieDepensePage]
})
export class CategorieDepensePageModule {}
