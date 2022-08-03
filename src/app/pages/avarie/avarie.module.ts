import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvariePageRoutingModule } from './avarie-routing.module';

import { AvariePage } from './avarie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvariePageRoutingModule
  ],
  declarations: [AvariePage]
})
export class AvariePageModule {}
