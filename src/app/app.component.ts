import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { MenuController } from "@ionic/angular"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Produits', url: '/produit', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Catégories produit', url: 'categorie-produit', icon: 'trash' },
    { title: 'Points de Vente', url: '/point-vente', icon: 'warning' }, 
    { title: 'Catégories dépenses', url: '/categorie-depense', icon: 'trash' }, 
    { title: 'Inventaires', url: '/inventaire', icon: 'warning' },
    { title: 'Liste des employés', url: '/employe', icon: 'trash' },
    { title: 'Casiers', url: '/casier', icon: 'warning' },
    { title: 'Avaries', url: '/avarie', icon: 'warning' },
    { title: 'Fournisseurs', url: '/fournisseur', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private storage: Storage, private menu: MenuController, public router: Router) {

  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();

    // this.router.navigateByUrl("/ravitaillement/recapitulatif")
  }

  closeMenu(){
    this.menu.close();
  }

  
}
