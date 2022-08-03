import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasierPageRoutingModule } from './casier-routing.module';

import { CasierPage } from './casier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasierPageRoutingModule
  ],
  declarations: [CasierPage]
})
export class CasierPageModule {}
