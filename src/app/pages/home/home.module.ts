import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ComponentModule } from 'src/app/components/component.module';
// import { ComponentModule } from 'src/app/components/component.module';

@NgModule({
  imports: [
    CommonModule, FormsModule,ComponentModule,
    IonicModule, HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
