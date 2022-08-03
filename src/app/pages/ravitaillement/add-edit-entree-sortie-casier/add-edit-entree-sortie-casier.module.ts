import { DateTransformPipe } from './../../../pipes/date-transform.pipe';
import { MoneyFormatPipe } from './../../../pipes/money-format.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditEntreeSortieCasierPageRoutingModule } from './add-edit-entree-sortie-casier-routing.module';

import { AddEditEntreeSortieCasierPage } from './add-edit-entree-sortie-casier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditEntreeSortieCasierPageRoutingModule
  ],
  declarations: [AddEditEntreeSortieCasierPage,MoneyFormatPipe]
})
export class AddEditEntreeSortieCasierPageModule {}
