import { DateTransformPipe } from './../../../pipes/date-transform.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFournisseurPageRoutingModule } from './view-fournisseur-routing.module';

import { ViewFournisseurPage } from './view-fournisseur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFournisseurPageRoutingModule
  ],
  declarations: [ViewFournisseurPage,DateTransformPipe]
})
export class ViewFournisseurPageModule {}
