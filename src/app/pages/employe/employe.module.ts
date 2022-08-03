import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployePageRoutingModule } from './employe-routing.module';

import { EmployePage } from './employe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployePageRoutingModule
  ],
  declarations: [EmployePage]
})
export class EmployePageModule {}
