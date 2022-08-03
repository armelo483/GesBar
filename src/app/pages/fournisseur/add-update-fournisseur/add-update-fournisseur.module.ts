import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateFournisseurPageRoutingModule } from './add-update-fournisseur-routing.module';

import { AddUpdateFournisseurPage } from './add-update-fournisseur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    IonicModule,
    AddUpdateFournisseurPageRoutingModule
  ],
  declarations: [AddUpdateFournisseurPage]
})
export class AddUpdateFournisseurPageModule {}
