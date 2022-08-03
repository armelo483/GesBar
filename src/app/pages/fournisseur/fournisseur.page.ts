import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Component, OnInit } from '@angular/core';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.page.html',
  styleUrls: ['./fournisseur.page.scss'],
})
export class FournisseurPage implements OnInit {

  fournisseurs : Fournisseur[];
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
    let tableName = new Fournisseur().constructor.name.toLowerCase().trim();
    console.log(tableName)
    this.storageSvc.read(tableName)
      .then((fournisseur: Fournisseur[]) =>{
        if(fournisseur){
          console.log(fournisseur)
          this.fournisseurs = fournisseur?.filter(Boolean);  
        } 
    },(e)=> {showToast(ErrorMsg.loading+'fournisseurs')});

  }

  deleteItem(item:Fournisseur){
    // for casting item var to type Fournisseur
    let itemCast = castObject(item,new Fournisseur(null,"","","",""))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    },(e)=> {showToast(ErrorMsg.delete)})
  }
  view(item:Fournisseur){
    this.router.navigateByUrl('fournisseur/view', {state : item});
  }
}
