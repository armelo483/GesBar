import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCasierPageRoutingModule } from './view-casier-routing.module';

import { ViewCasierPage } from './view-casier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCasierPageRoutingModule
  ],
  declarations: [ViewCasierPage]
})
export class ViewCasierPageModule {}
