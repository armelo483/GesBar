import { Component, OnInit } from '@angular/core';
import { Inventaire, InventaireProduit } from 'src/app/models/inventaire';
import { Produit } from 'src/app/models/produit';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { CrudService } from 'src/app/services/crud.service';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';

@Component({
  selector: 'app-view-inventaire',
  templateUrl: './view-inventaire.page.html',
  styleUrls: ['./view-inventaire.page.scss'],
})
export class ViewInventairePage implements OnInit {


  inventaire: Inventaire;
  produits: Array<Produit>= [];
  ravitaillement: Array<Ravitaillement> = [];

  details ; // tous les details de l'inventaire et les ravitaillements concernés
            // cette variable sert à afficher le tableau des ravitaillements.
  
  constructor(
    public crudSvc: CrudService,
    public ravSvc: RavitaillementService
  ) { 
    
  }

  async ngOnInit() {

   
     
  }

  async ionViewWillEnter(){
    this.inventaire = history.state;
    console.log("inventaire");
    console.log(this.inventaire);
    
    // this.crudSvc.readAndUpdatePropertiesObject('produit')
    //  .then((prods: Array<Produit>)=>{
    //   this.produits = prods.filter(Boolean);
    //   console.log(this.produits);
    //  }).catch(e =>{
    //   console.log(e)
    //  });

    console.log(this.inventaire.dateDebut);
    console.log(this.inventaire.dateFin);
    
     await this.ravSvc.getRavitaillement(this.inventaire.dateDebut, this.inventaire.dateFin)
        .then((ravitaillement:Ravitaillement[])=>{
          console.log(ravitaillement);
          
          if(ravitaillement.length != 0){
            this.ravitaillement = ravitaillement.filter(Boolean);
            let produits: Array<any> = this.ravitaillement[0].produits.filter(Boolean)
            console.log(this.isInArray(4, produits));
            
            this.details = this.getDisplayRavitaillementDetails(this.ravitaillement, this.inventaire); 
          }
        })
        .catch(e => console.log(e));
     console.log(this.details);
  }


  // @return
  getDisplayRavitaillementDetails(ravitaillement: Array<Ravitaillement>, inventaire: Inventaire){

    try {
      
    } catch (error) {
      
    } finally {

    }
 
    let restes = inventaire.restes.filter(Boolean);

    if(restes.length == 0){ console.log('le reste n est pas definie dans les inventaires' ); return;  }

    if(ravitaillement.length != 0){
      
      ravitaillement = ravitaillement.filter(Boolean);
      // let i = 0;
      restes = restes.filter(Boolean);

      var ravitaillementParProduit : Array<any> = [];

      for(let res of restes){

          console.log(res.nom);
          let vente = inventaire.ventes.filter(Boolean)
                                       .find((elt) => elt.id == res.id );

          if(!vente){ console.log('la vente n est pas definie dans les inventaires' ); return;  }
          // tableau des ravitaillement par produit
          let listRavitaillement = [];

          let i= 0;
          for(let rav of ravitaillement){
            i++;
            console.log("rav "+i);
            
            let produits = rav.produits.filter(Boolean);

            let isRavitailler = produits.find((elt)=>{ 
              return elt.id == res.id;
            });

            console.log(isRavitailler);
            console.log(rav);

            let ravQte = isRavitailler ? isRavitailler.qte : 0;
            
            listRavitaillement.push(ravQte);
          }

          ravitaillementParProduit.push({
              nom : res.nom,
              reste: res.qte,
              vente: vente.qte,
              ravitailler : listRavitaillement,
              prixV: res.prixV,
              nbreBtleParCasier: res.nbreBtleParCasier,
              stock: res.qte
          });
      }
      // return "ravitaillementParProduit";
      return ravitaillementParProduit;
    }else{
      console.log("je suis un problème");
      return false;
    }
  }

  // @return boolean
  isInArray(ID:number,arr: Array<any>){
    if(typeof arr == "object"){
      return !!arr.find((val:any) => val.id == ID);
    }else{
      return false;
    }
  }

}
