import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LigneEmployePageRoutingModule } from './ligne-employe-routing.module';

import { LigneEmployePage } from './ligne-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LigneEmployePageRoutingModule
  ],
  declarations: [LigneEmployePage]
})
export class LigneEmployePageModule {}
