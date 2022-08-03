import { PointVente } from './PointVente';
import { Employe } from './employe';
import { Daddy } from "./daddyObj";

export class Inventaire extends Daddy{

    constructor(
        public id: number = 1,
        public employe: Employe[] = [],
        public dateFin: number= null,
        public dateDebut: number= null,
        public pointVente: PointVente = null,
        public reference: string = "",
        public total_vente: number = null,
        public versement: number = 0,
        public manquant: number = 0,
        public restes: InventaireProduit[] = [],
        public ventes: InventaireProduit[] = [],
        public ids_ravitaillement: Array<number|string> = [], // Tableau des ravitaillement concerné par l'inventairee
    ){ 
        super();
    }

}

export class InventaireProduit{
    id: number = 1;
    nom: string;
    prixA: number = 0;
    prixV: number = 0;
    ristourne:number = 0;
    nbreBtleParCasier: number = 0;
    qte: number = 0;
  }

