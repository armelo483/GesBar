import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { IonicModule } from '@ionic/angular';
import { RavitaillementPageRoutingModule } from './ravitaillement-routing.module';
import { RavitaillementPage } from './ravitaillement.page';
import { ComponentModule } from 'src/app/components/component.module';
import { ScrollVanishDirective } from 'src/app/directives/scroll-vanish.directive';

@NgModule({
  imports: [
    CommonModule, ComponentModule,
    FormsModule,
    IonicModule,
    RavitaillementPageRoutingModule
  ],
  declarations: [RavitaillementPage, ScrollVanishDirective]
})
export class RavitaillementPageModule {}
