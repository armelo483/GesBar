import { Router } from '@angular/router';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.page.html',
  styleUrls: ['./categorie-produit.page.scss'],
})
export class CategorieProduitPage implements OnInit {

  cat_produits : CategorieProduit[];
  constructor(
    public storageSvc: CrudService,
    public router: Router
  ) { }

  ngOnInit() {
    showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    let tableName = new CategorieProduit(null,"","").constructor.name.toLowerCase().trim();
    console.log(tableName)
    this.storageSvc.read(tableName)
      .then((cat_produit: CategorieProduit[]) =>{
        if(cat_produit){
          console.log(cat_produit)
          this.cat_produits = cat_produit;
        }
    },(e)=> {console.log(e); showToast(ErrorMsg.loading+'catégories de produits')});
  }

  deleteItem(item:CategorieProduit){
    // for casting item var to type Fournisseur
    let itemCast = castObject(item,new CategorieProduit(null,"",""))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }).catch(e => {
      console.log(e);
      showToast(ErrorMsg.delete);
    });
  }

  viewItem(item: CategorieProduit){
    this.router.navigateByUrl("categorie-produit/view-categorie-produit",{state:item});
  }
  updateItem(item: CategorieProduit){
    this.router.navigateByUrl("categorie-produit/add-update-categorie-produit",{state:item});
  }
}