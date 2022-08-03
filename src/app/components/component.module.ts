import { RacapInventaireComponent } from './racap-inventaire/racap-inventaire.component';
import { NgModule } from '@angular/core';
import { AddIvenventaireComponent } from './add-ivenventaire/add-ivenventaire.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ShopModalComponent } from './shop-modal/shop-modal.component';
import { ShopComponent } from './shop/shop.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { DateComponent } from './date/date.component';
import { BarComponent } from './bar/bar.component';
import { ProduitsComponent } from './produits/produits.component';
import { ListProduitComponent } from './list-produit/list-produit.component';

@NgModule({
  imports:[
    CommonModule,RouterModule,FormsModule
  ],
  declarations: [ 
    ShopComponent, ShopModalComponent,ListFournisseurComponent,DateComponent,ProduitsComponent,
    AddIvenventaireComponent,ListPageComponent,SearchbarComponent,BarComponent,RacapInventaireComponent,ListProduitComponent,
  ],
  exports: [ 
    ShopComponent, ShopModalComponent,SearchbarComponent,ListFournisseurComponent,DateComponent,ProduitsComponent,
    AddIvenventaireComponent,ListPageComponent,BarComponent,RacapInventaireComponent,ListProduitComponent,
  ],
})
export class ComponentModule {}