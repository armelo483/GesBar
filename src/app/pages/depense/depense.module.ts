import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepensePageRoutingModule } from './depense-routing.module';

import { DepensePage } from './depense.page';
import { ComponentModule } from 'src/app/components/component.module';
import { SkipemptyPipe } from 'src/app/pipes/skipempty.pipe';

@NgModule({
  imports: [
    CommonModule,ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DepensePageRoutingModule
  ],
  declarations: [DepensePage, SkipemptyPipe]
})
export class DepensePageModule {}
