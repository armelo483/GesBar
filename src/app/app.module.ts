import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ScrollVanishDirective } from './directives/scroll-vanish.directive';
import { SkipemptyPipe } from './pipes/skipempty.pipe';
import { DateMajorationPipe } from './pipes/date-majoration.pipe';
import { DateMinorationPipe } from './pipes/date-minoration.pipe';
import { MoneyFormatPipe } from './pipes/money-format.pipe';




  @NgModule({
    declarations: [AppComponent],
  
    entryComponents: [],
    exports: [
      
    ],
    imports: [
      IonicStorageModule.forRoot({
        // eslint-disable-next-line no-underscore-dangle
        // driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
      }),
      BrowserModule,
      IonicModule.forRoot(),
      // SuperTabsModule.forRoot(),
      AppRoutingModule
    ],
  
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: LOCALE_ID, useValue: 'fr_FR' }
    ],
    bootstrap: [AppComponent],
  })
export class AppModule {}
