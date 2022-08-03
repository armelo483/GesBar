import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRavitaillerPageRoutingModule } from './list-ravitailler-routing.module';

import { ListRavitaillerPage } from './list-ravitailler.page';
import { ComponentModule } from 'src/app/components/component.module';
import { SkipemptyPipe } from 'src/app/pipes/skipempty.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,ComponentModule,
    IonicModule,
    ListRavitaillerPageRoutingModule
  ],
  declarations: [ListRavitaillerPage, SkipemptyPipe]
})
export class ListRavitaillerPageModule {}
