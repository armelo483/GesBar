import { Injectable } from '@angular/core';
import { Famille} from '../models/famille';
@Injectable({
  providedIn: 'root'
})
export class FamilleService {
  famille: Array<Famille> = [
    {nom: 'Kadji', desc: 'la description ici', id: 1},
    {nom: 'Brasserie', desc: 'la description ici', id: 2},
    {nom: 'Guinness', desc: 'la description ici', id: 3},
    {nom: 'Autres', desc: 'la description ici', id: 4},
  ];
  constructor() { }

  All(): Famille[]{
    return this.famille;
  }
  // always verify if not exits before create
  create(data: Famille): void{
    this.famille.push(data);
    console.log(this.famille);
  }

  update(name: string): Famille[]{
    return this.famille;
  }

  delete(name: string): Famille[]{
    return this.famille;
  }
}
