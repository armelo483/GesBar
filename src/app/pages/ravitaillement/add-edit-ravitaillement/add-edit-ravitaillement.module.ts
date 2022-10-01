import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditRavitaillementPageRoutingModule } from './add-edit-ravitaillement-routing.module';

import { AddEditRavitaillementPage } from './add-edit-ravitaillement.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddEditRavitaillementPageRoutingModule
  ],
  declarations: [AddEditRavitaillementPage]
})
export class AddEditRavitaillementPageModule {}
