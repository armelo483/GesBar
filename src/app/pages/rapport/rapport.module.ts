import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapportPageRoutingModule } from './rapport-routing.module';

import { RapportPage } from './rapport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RapportPageRoutingModule
  ],
  declarations: [RapportPage]
})
export class RapportPageModule {}
