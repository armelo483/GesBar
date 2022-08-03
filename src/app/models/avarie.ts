import { PointVente } from './PointVente';
import { Daddy } from './daddyObj';
import { Produit } from './produit';

export class Avarie extends Daddy {

  constructor(
      public qte: number = 0,
      public description: string = null,
      public produit: Produit = null,
      public date?: Date
       ){
    super();
    this.date = new Date();
  }
}
