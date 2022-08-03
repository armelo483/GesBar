import { RavitaillerPage } from './../ravitailler/ravitailler.page';
import { presentModal, showToast } from 'src/app/lib/FonctionUsuelle';
import { AlertService } from './../../../services/alert-service.service';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/models/fournisseur';
import { ModalController } from '@ionic/angular';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { Ravitaillement } from 'src/app/models/ravitaillement';

import { ErrorMsg } from 'src/app/lib/globalVar';
import { ListProduitComponent } from 'src/app/components/list-produit/list-produit.component';

// import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.page.html',
  styleUrls: ['./list-produit.page.scss'],
})
export class ListProduitPage implements OnInit {

  produits : any | Ravitaillement [] = [];
  fournisseur : {id: number, nom: string};
  somme_total : number;
  last_id = 0;

  constructor(public crudSvc: CrudService,
    public router: Router,
    private alertSvc: AlertService,
    public modalCtrl: ModalController,
    public ravitaillementSvc: RavitaillementService) {
     
   }
// here we first have to snap fournisseur id NB
// very important
  ngOnInit() {
    console.log(history.state);
    
    console.log("list-produit.page.ts2");
    
    this.fournisseur = this.ravitaillementSvc.getProduitRavitailler().fournisseur;
 
    this.somme_total = this.ravitaillementSvc.totalMontant(); console.log(this.somme_total);
        
  }

  ionViewWillEnter(){

    this.produits = this.ravitaillementSvc.getProduitRavitailler().produits;

    this.somme_total = this.ravitaillementSvc.totalMontant();

    this.somme_total = this.ravitaillementSvc.totalMontant(); 
    
    console.log(this.somme_total);

    console.log(this.produits);
    
  }

  getTotal(){
    return this.ravitaillementSvc.totalMontant();
  }

  isRavitailler(p:Produit): false | Array<Produit>{
    if(this.ravitaillementSvc.getProduitRavitailler()){
        return this.ravitaillementSvc.checkAndGetProduit(p);
    }else false
  }

  getNbreCasier(p:Produit): number {

    let ravitProducts = (this.isRavitailler(p))??0;
    let nbCasier = 0;

    if(ravitProducts){ 

      let qte = (!isNaN(ravitProducts[0].qte))?ravitProducts[0].qte:0;
      let nbreBtleParCasier = (!isNaN(ravitProducts[0].nbreBtleParCasier))?ravitProducts[0].nbreBtleParCasier:0;

      nbCasier = (nbreBtleParCasier)?Math.floor(qte/nbreBtleParCasier):0;
      
    }

    return nbCasier;
  }

  getNbreBouteilleSupplementaire(p:Produit): number{

    let nbreBouteilleSupplementaire = 0;

    if(this.isRavitailler(p)){

      let qte = this.isRavitailler(p)[0].qte;
      let nbreBtleParCasier = (!isNaN(this.isRavitailler(p)[0].nbreBtleParCasier))?this.isRavitailler(p)[0].nbreBtleParCasier:0;
      nbreBouteilleSupplementaire = (nbreBtleParCasier)?Math.floor(qte%nbreBtleParCasier):0;
    }

    return nbreBouteilleSupplementaire;
  }

  goto(p){
    this.router.navigateByUrl("ravitailler", {state:p});
  }

  withNoObjectGoTo(){
    this.router.navigateByUrl("ravitailler");
  }

  gotoEntreeSortieCasier(){
    if(this.ravitaillementSvc.getProduitRavitailler().produits.length == 0){
      showToast("Aucun produit n'est ravitailler")
      return;
    }
    this.router.navigateByUrl("/ravitaillement/add-edit-entree-sortie-casier");
  }


  logForm(){

    let ravitaillement = new Ravitaillement();
    ravitaillement.produits = this.produits;
    ravitaillement.fournisseur = this.fournisseur;
    ravitaillement.montant_verse = this.somme_total;

    this.crudSvc.create(ravitaillement).then((p)=>{
      console.log(ravitaillement);
      this.router.navigateByUrl('/ravitaillement')
      showToast("Ravitaillement créé")
    }, (e) => showToast(ErrorMsg.create));
      
  }

  

 deleteItem(p) {
  
  this.produits = this.produits.filter(function(value, index, arr){ 
    return value.id != p.id;
  });
 }

 async presentRavitaillerModal(produit){
   await presentModal(this.modalCtrl, RavitaillerPage, {state:produit});
 }
 // ouvre un modal dans lequel on a la liste des fournisseurs actifs
 async openProductModalByFournisseur(){
    const modal = await presentModal(this.modalCtrl, ListProduitComponent);
    // modal.onWillDismiss().then((data)=>{
    //   console.log(data);
    // });
  }

}