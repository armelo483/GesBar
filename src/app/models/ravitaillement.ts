import { DATE_FORMAT } from './../lib/globalVar';
import { format } from 'date-fns';
import { Daddy } from "./daddyObj";
import { Produit } from './produit';
import { Casier } from './casier';

export class Ravitaillement extends Daddy{
     // indique si le ravitaillement à ulterieurement ete pris en consideration par un inventaire


    constructor(
        public id: number = 1, 
        public date: number = null,
        public num_facture: string = null,
    
        public nbre_casier_plein_entree: number = 0,
        public nbre_casier_plein_sortie: number = 0,
        public nbre_casier_sup_sortie: number = 0,
        public nbre_casier_sup_entree: number = 0,
        public nbre_bouteille_sup_entree: Array<BouteilleSuplementaire> = [],
        public nbre_bouteille_sup_sortie: Array<BouteilleSuplementaire> = [],
        public id_point_vente: number = 0,
        public somme_total: number = 0,
        public dette: number = 0,
        public montant_verse: number = 0,
        public fournisseur: {id:number,nom:string} = null,
        public produits: Array<Produit> = [],

        public save: number = 0, // indique si le ravitaillement est definitivement enregistré ou pas
        public photo: string = null,
        public inventaireIsOK: 0 | 1 = 0) // si le ravitaillement a été inventorié on fait ou pas
        { 
            
        super();
        this.date = new Date().getTime();
    }

}

export class BouteilleSuplementaire{ casier: Casier; nbreBouteille:number;}

class produitRavitaillement {
    id:number = 1;
    nom:string;
    qte:number = 0;
    prix:number = 0;
    nbreBtleParCasier:number = 0;
}

class fournisseurRavitaillement {
    id:number = 0;
    nom:string;
}