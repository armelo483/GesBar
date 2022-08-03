import { Inventaire } from './../models/inventaire';

import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  private inventaire:Inventaire;
  // private listeProduitRavitailles:Ravitaillement[];
  
  constructor(
    public crudSvc: CrudService
  ) { 
    
  }

  getInventaire(): Inventaire{
    if(!this.inventaire){
       this.inventaire = new Inventaire();
    }
    return this.inventaire;
  }

  async addInventaire(): Promise<any>{
      return this.crudSvc.create(this.inventaire);
  }

  getAll(){
    return this.crudSvc.read('inventaire');
  }


  
}

