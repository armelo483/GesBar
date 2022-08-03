import { Fournisseur } from 'src/app/models/fournisseur';
import { Casier } from 'src/app/models/casier';
import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { Daddy } from './daddyObj';

export class Produit extends Daddy{

    constructor(
        public nom: string = null,
        public qte: number = 0,
        public prixA: number = 0,
        public prixV: number = 0,
        public nbreBtleParCasier = 0,
        public ristourne: number = 0, // it means refund or discount
        // public stoBoInit: number = null, // number of bottle at the begin
        // public stoCaInit: number = null, // number of full locker with bottle
        public categorie: CategorieProduit = null, 
        public casier: Casier = null, 
        public fournisseurs: Fournisseur[]= null, 
        public upload: number = 0,
        public imgLink: string = null,
        public hasCasier: boolean = true){
            super();
        }
 }
