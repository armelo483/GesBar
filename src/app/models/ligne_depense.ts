import { Depense } from './depense';
import { PointVente } from './PointVente';
import { Daddy } from './daddyObj';

export class LigneDepense extends Daddy {

  constructor(
      public id: number = 1,
      public montant: number = 0,
      public pointVente: PointVente = null,
      public nom: Depense = null,
      public motif?: string,
      public date?: Date
       ){
    super();
    this.date = new Date();
  }
}
