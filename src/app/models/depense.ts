import { Daddy } from './daddyObj';

export class Depense extends Daddy{

  constructor(
    public nom: string,
    public date: Date,
    public description?: string,
    ){
    super();
  }
}
