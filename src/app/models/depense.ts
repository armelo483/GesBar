import { Daddy } from './daddyObj';

export class Depense extends Daddy{

  constructor(
    public nom: string,
    public description?: string){

    super();
  }
}
