import { Ravitaillement } from 'src/app/models/ravitaillement';
import { Fournisseur } from 'src/app/models/fournisseur';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { compareDate } from '../lib/FonctionUsuelle';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor (public crudSvc: CrudService) {}

  async getRistourne (fournisseur_id: number| null, date_debut: number, date_fin: number ): Promise<any[]> {
   
    let fournisseurs:Fournisseur[] = await this.crudSvc.read('fournisseur');
    // On retire tous les valeurs null
    let output = [];
    fournisseurs = fournisseurs.filter(Boolean);
    // pour avoir la ristourne de tous les fournisseur fournisseur_id = null

    if(fournisseur_id == null || fournisseur_id == undefined){
      console.log("fournisseur_id n'est pas disponible");
      return []; 
    }
    if(fournisseur_id != null && fournisseur_id != undefined){
      console.log(fournisseur_id);
      fournisseurs = fournisseurs.filter((val : Fournisseur) => val.id == fournisseur_id );
    }
    
    return this.crudSvc.read('ravitaillement').then((val:Ravitaillement[])=>{ 
      
      if(val){     
        if(fournisseurs.length != 0){
          fournisseurs.forEach((fournisseur)=>{
            let ristourne: number = 0;
            let nbre_casier: number = 0;
            if(fournisseur.collecte_ristourne){
                
              let ravitaillements :Ravitaillement[];

              console.log(date_debut);
              console.log(date_fin);
              

              ravitaillements = val.filter( ravitaillement => compareDate(date_debut, '<=', ravitaillement.date) && compareDate(ravitaillement.date, '<=', date_fin) && ravitaillement.fournisseur.id == fournisseur.id);
              console.log(ravitaillements);
              
              if(ravitaillements.length != 0){
                ravitaillements.forEach(ravitaillement => {
                  ristourne += this.getRavitaillementRistourne(ravitaillement).ristourne
                  nbre_casier += this.getRavitaillementRistourne(ravitaillement).nbre_casier
                });
              }
              output.push({fournisseur: fournisseur, ristourne: ristourne, nbre_casier: nbre_casier});
            } 
          });
        }
      }else{
        // instance de fournisseur null
        let fournisseur_null = new Fournisseur();
        // variable de retour null
        let $return = {fournisseur: fournisseur_null, ristourne: 0, nbre_casier: 0};
        // DANS LE CAS OU il n'y a pas de ravitaillement on retourne
        // return { fournisseur : {}, ristourne: 0, nbre_casier: 0}
        output.push($return);
      }
      return output;   
    })

  }

  // retourne la ristourne d'un ravitaillement et le nombre de casiers
  getRavitaillementRistourne(ravitaillement: Ravitaillement): {ristourne :number, nbre_casier: number} {
    let ristourne: number = 0;
    let nbre_casier: number = 0;
    ravitaillement.produits.forEach((produit) =>{
      ristourne += +Math.floor(produit.qte / produit.nbreBtleParCasier) * +produit.ristourne;
      nbre_casier += +Math.floor(produit.qte / produit.nbreBtleParCasier)
    });
    return {ristourne :ristourne, nbre_casier: nbre_casier};
  }


}
