import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { Router } from '@angular/router';

const DEFAULT_ID = 0;
@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})


export class ProduitPage implements OnInit {

  produits;
  
  constructor(
    private crudSvc: CrudService,
    public router: Router
  ) { }

  ngOnInit(){
    // showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.reload();
  }

  reload(){
    this.crudSvc.read(new Produit().constructor.name.toLowerCase().trim()).then((val:Produit[])=>{
      if(val){
        this.produits = val.filter(Boolean);
        console.log(this.produits);
      }
    });
  }


  searchMenuIsOpen = false;

  toogleSearchView(){
    console.log("toto");
    this.searchMenuIsOpen = !this.searchMenuIsOpen;
    console.log(this.searchMenuIsOpen);
  }



  search(value:string){
      this.crudSvc.search(new Produit(),'nom',value).then((val) =>{
        if(val){
          this.produits = val;
          console.log(this.produits)
        }
      });
  }

  closeFab(){}


  deleteItem(item:Produit){
    let itemCast = castObject(item,new Produit())
    this.crudSvc.delete(itemCast).then((val) =>{
      this.reload();
      showToast("Suppression effectuée")
    })
  }

  viewItem(item: Produit){
    this.router.navigateByUrl("produit/view",{state:item});
  }
  
  updateItem(prod: Produit){
    this.router.navigateByUrl("produit/update",{state: prod});
  }

}
