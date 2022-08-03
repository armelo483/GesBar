import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Produit } from 'src/app/models/produit';
import { CrudService } from 'src/app/services/crud.service';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss'],
})
export class ListProduitComponent implements OnInit {

  fournisseur;
  produits : Produit[];
  constructor(
    public modalCtrl: ModalController,
    public ravitaillementSvc: RavitaillementService,
    public crudSvc: CrudService,
    public router: Router) { }

  async ngOnInit() {

    this.fournisseur = this.ravitaillementSvc.getProduitRavitailler().fournisseur;
      
    console.log("les fournisseur sont: " + this.fournisseur);
    
    if(this.fournisseur){
      this.crudSvc.readAndUpdatePropertiesObject('produit').then((prods: Produit[]) =>{
        console.log(prods);
        
        this.produits = prods.filter((prod: Produit)=>{
          console.log(prod.fournisseurs);
          
          let f_exist = prod.fournisseurs.filter((f) => f.id == this.fournisseur.id );
          return f_exist.length != 0 ? true : false;
        });
        
        console.log(this.produits);
      }).catch(e => console.log(e));
    }
  }

  dismiss(produit=null){
    // on ajoute le produit dans la liste des produits a ravitailler
    if(produit){
      this.router.navigateByUrl("/ravitaillement/ravitailler",{state: produit}).then(()=>{
        this.modalCtrl.dismiss();
      });
      
    }else{
      this.modalCtrl.dismiss();
    }
  }

}
