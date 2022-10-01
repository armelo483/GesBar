import { Ravitaillement } from 'src/app/models/ravitaillement';
import { CrudService } from './crud.service';
import { Produit } from 'src/app/models/produit';
import { Injectable } from '@angular/core';
import { castObject, compareDate, showToast } from '../lib/FonctionUsuelle';

@Injectable({
  providedIn: 'root'
})
export class RavitaillementService {

  private produitRavitaille:Ravitaillement;
  // private listeProduitRavitailles:Ravitaillement[];
  
  constructor(
    public crudSvc: CrudService
  ) { 
    
  }

  // getProduitRavitaille(){
  //   return this.produitRavitaille;
  // }

  getProduitRavitailler(){
    if(!this.produitRavitaille){
      this.produitRavitaille = new Ravitaillement();
    }
    return this.produitRavitaille;
  }

  setProduitRavitailler(rav: Ravitaillement){
    if(rav){
      this.produitRavitaille = new Ravitaillement();
      this.produitRavitaille = rav;
    }
  }

  setId(id){
    this.getProduitRavitailler().id = id;
  }

  // getListeProduitRavitailles(){
  //   return this.listeProduitRavitailles;
  // }

  // verifie si un produit est present dans la table de de ravitaillement
  productExist(id:number){
    
    let produits:any = this.getProduitRavitailler().produits;

    if(!!produits){
      produits = produits.filter(Boolean)
      return !!produits.find((val:any) => val.id == id);
    } 
    else return false;
    
  }

  checkAndGetProduit(p): Array<Produit> | false{
    let backValue : false = false;
    if(this.productExist(p.id)){

      let produits:any = this.getProduitRavitailler().produits;

      if(!!produits){
        produits = produits.filter(Boolean)
        backValue = produits.filter((val:any) => val.id == p.id);
      } 
    }
    return backValue;
  }

  // verifie si le client à passer une commande customisée
  // cad si on a les bouteille supplementaire et casier supll
  // dans ce cas le user est inviter à saisir toutes les infos d'entree sortie des casier
  isCustomCommand(): boolean{

      let backValue = false;
      let produits:any = this.getProduitRavitailler().produits;

      if(!!produits){
        produits = produits.filter(Boolean)
        console.log(produits);
        
        backValue = !!produits.find((val:any) => {
          console.log(val);
          return val.qte % val.nbreBtleParCasier !== 0
        });
      }

      return backValue;
  }

  

  // il s'agit du total de casier plein
  totalCasier(): number {

      let som = 0;
      let produits:any = this.getProduitRavitailler().produits;

      if(!this.isCustomCommand()){
        if(!!produits){
          som = 0;
          produits.forEach((prod:Produit) => {
            som += Math.floor(prod.qte/prod.nbreBtleParCasier);
          });
        }
      }
      console.log(som);
      
      return som;
  }

  // il s'agit du total de casier plein
  totalMontant(produits:any = this.getProduitRavitailler().produits): number {
    produits = produits.filter(Boolean);
    console.log(produits);
    let som = 0;
    if(!!produits){
      som = 0;
      produits.forEach((prod:Produit) => {
        if(prod.nbreBtleParCasier == 0){
          showToast('erreur configuration casier')
          return 0;
        }

        som += Math.ceil(prod.qte/prod.nbreBtleParCasier * prod.prixA);
      });
    }
    console.log(som);
    return som;
  }

  addRavitaillement(): Promise<Ravitaillement>{
    return this.crudSvc.create(this.getProduitRavitailler());
  }

  validate(): true | Array<string> | boolean {
    let errors = [];
    let r = this.getProduitRavitailler();
    if( r.date == null ){ errors.push("Vous devez renseigner la date") }
    if( r.nbre_casier_plein_entree == null || r.nbre_casier_plein_entree == 0){ errors.push("Le nombre de casier acheter ne peux être null") }
    if( r.nbre_casier_plein_sortie == null ){ errors.push("Vous devez renseigner le nombre de casier sorti") }
    if( r.somme_total == null ){ errors.push("Somme total ne peut être null") }
    if( r.montant_verse == null ){ errors.push("Le montant versé ne peut être null") }
    if( r.fournisseur == null ){ errors.push("Le fournisseur ne peut être null") }
    if( r.produits == null || r.produits.length == 0 ){ errors.push("veuillez rentrez des produits") }
    if( r.num_facture == null ) { errors.push("num_facture") }
    if( errors.length != 0 ) { return errors }
    return false;
  }


  // retourne leS ravitaillemntS compris entre beginDate et enDate
  getRavitaillement (beginDate: number, endDate: number ): Promise<Array<Ravitaillement>>{
    console.log(beginDate);
    console.log(endDate);
    
    return this.crudSvc.read("ravitaillement").then(( val: Ravitaillement[] )=>{
      
      console.log(val);
      
      if(val){
        if(!beginDate && endDate){
          return val.filter((r: Ravitaillement) => ( compareDate(r.date, '<=' ,endDate) && r.inventaireIsOK == 0))
        }else
        if(!endDate && beginDate){
          return val.filter((r: Ravitaillement) => ( compareDate(beginDate, '<=', r.date)  && r.inventaireIsOK == 0))
        }else if (beginDate && endDate){
          return val.filter((r: Ravitaillement) => ( compareDate(beginDate, '<=', r.date) && compareDate(r.date, '<=', endDate) && r.inventaireIsOK == 0 ))
        }else{
          return [];
        }
      }
    })
  }

  async lockLigneRavitaillement(ravitaillements: Ravitaillement){
    // async updateLigneRavitaillement(ravitaillements: Ravitaillement[]){
    console.log('updatigneRavitaillement')

    let rav = new Ravitaillement();
    rav = castObject(ravitaillements, rav);
    rav.inventaireIsOK = 1;
    // ravitaillements.forEach( ravitaillement =>{
      
    //   let rav = new Ravitaillement();


    //   rav.id =  ravitaillement.id;
    //   rav.date =  ravitaillement.date;
    //   rav.num_facture =  ravitaillement.num_facture;
    //   rav.nbre_casier_plein_entree= ravitaillement.nbre_casier_plein_entree;
    //   rav.nbre_casier_plein_sortie =  ravitaillement.nbre_casier_plein_sortie;
    //   rav.nbre_casier_sup_sortie =  ravitaillement.nbre_casier_sup_sortie;
    //   rav.nbre_casier_sup_entree =  ravitaillement.nbre_casier_sup_entree;
    //   rav.nbre_bouteille_sup_entree =  ravitaillement.nbre_bouteille_sup_entree;
    //   rav.nbre_bouteille_sup_sortie =  ravitaillement.nbre_bouteille_sup_sortie;
    //   rav.id_point_vente =  ravitaillement.id_point_vente;
    //   rav.somme_total =  ravitaillement.somme_total;
    //   rav.dette =  ravitaillement.dette;
    //   rav.montant_verse =  ravitaillement.montant_verse;
    //   rav.fournisseur =  ravitaillement.fournisseur;
    //   rav.produits =  ravitaillement.produits;
    //   rav.save =  ravitaillement.save; // indique si le ravitaillement est definitivement enregistré ou pas
    //   rav.photo =  ravitaillement.photo;
    //   rav.inventaireIsOK =  1;
      await this.crudSvc.update(rav);
      return rav
    // })

  }
}