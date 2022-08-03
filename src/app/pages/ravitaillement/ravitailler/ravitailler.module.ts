import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RavitaillerPageRoutingModule } from './ravitailler-routing.module';

import { RavitaillerPage } from './ravitailler.page';
import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    IonicModule,
    RavitaillerPageRoutingModule
  ],
  declarations: [RavitaillerPage]
})
export class RavitaillerPageModule {}
