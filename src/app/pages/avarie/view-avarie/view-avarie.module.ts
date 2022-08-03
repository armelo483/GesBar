import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAvariePageRoutingModule } from './view-avarie-routing.module';

import { ViewAvariePage } from './view-avarie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAvariePageRoutingModule
  ],
  declarations: [ViewAvariePage]
})
export class ViewAvariePageModule {}
