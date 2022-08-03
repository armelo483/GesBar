import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCategorieDepensePageRoutingModule } from './view-categorie-depense-routing.module';

import { ViewCategorieDepensePage } from './view-categorie-depense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCategorieDepensePageRoutingModule
  ],
  declarations: [ViewCategorieDepensePage]
})
export class ViewCategorieDepensePageModule {}
