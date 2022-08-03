import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewEmployePageRoutingModule } from './view-employe-routing.module';

import { ViewEmployePage } from './view-employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEmployePageRoutingModule
  ],
  declarations: [ViewEmployePage]
})
export class ViewEmployePageModule {}
