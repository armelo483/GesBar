import { Injectable } from '@angular/core';
import { SubFamille } from '../models/sub-famille';
@Injectable({
  providedIn: 'root'
})
export class SubFamilleService {
  subfamille: Array<SubFamille> = [
    {nom: 'Bière', famille: 'Brasserie', desc: 'la description ici', id: 1},
    {nom: 'Jus', famille: 'Brasserie', desc: 'la description ici', id: 2},
    {nom: 'Whisky', famille: 'Guinness', desc: 'la description ici', id: 3},
  ];
  constructor() { }

  All(): SubFamille[]{
    console.log(this.subfamille);
    return this.subfamille;
  }
  // always verify if not exits before create
  create(data : SubFamille): void{
    this.subfamille.push(data);
    console.log(this.subfamille);
  }

  update(name: string): SubFamille[]{
    return this.subfamille;
  }

  delete(name: string): SubFamille[]{
    return this.subfamille;
  }
}
