import { Ravitaillement } from 'src/app/models/ravitaillement';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Daddy } from '../models/daddyObj';
import { IndeletableTables } from 'src/app/lib/globalVar';


// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { HiddenEntries } from '../models/hidden_entries';



@Injectable({
  providedIn: 'root'
})

export class CrudService {
  key: number;

  constraintsPropertyObj = {
    depense: ['nom'],
    pointvente : ['nom'],
    casier: ['nom'],
    categorieproduit: ['nom'],
    produit: ['nom'],
    inventaire: ['reference'],
    ravitaillement: ['num_facture']
  };

  storageArrayKeys: string [];
  errorMessageArr: string [] = [];

  constructor(private storage: Storage) {
     this.init();
  }

  //On enregistre le sqlite driver

  async init(): Promise<string[]> {

    this.storage.create();
    this.storageArrayKeys = await this.storage.keys();
    return this.storage.keys();

  }

  public async create(obj: Daddy){
    
    const TAB_NAME = this.getTableName(obj)
    let matchingItemsArr: Daddy[];

    //On trimme toutes ses propriétés par mesure de securité
    Object.keys(obj).map(k => {
      if(typeof obj[k] === 'string') {
        obj[k] = obj[k].trim();
      }
    });

    const TAB_NAME_ARR = (await this.storage.get(TAB_NAME))??[];

    //On vérifie si la table se trouve dans la table "constraintsPropertyObj" des contraintes d'unicité
    if (this.constraintsPropertyObj.hasOwnProperty(TAB_NAME) && TAB_NAME_ARR.length > 0){

      this.errorMessageArr = [];

      //Ici on recupère toutes les valeurs des colonnes ayant la contrainte
      this.constraintsPropertyObj[`${TAB_NAME}`]
        .forEach((constrainedProperty, index)=> {

          const PROPERTY_COLUMN = TAB_NAME_ARR.reduce((arrayForThisColumn: string[], currentLineObj: Daddy) => {

            arrayForThisColumn.push(currentLineObj[`${constrainedProperty}`].toLowerCase().trim());

            return arrayForThisColumn;
          }, []);

          // Si erreur alors une des valeurs existe deja en base
          if(PROPERTY_COLUMN.includes(obj[`${constrainedProperty}`].toLowerCase().trim())) {
            this.errorMessageArr.push(`Ce ${constrainedProperty} existe déjà`);
          }

        });

        //Si erreur on stoppe l'enregisttrement en rejettant la promesse
        if(this.errorMessageArr.length>0){
          this.errorMessageArr = [...new Set(this.errorMessageArr)];
          return Promise.reject(this.errorMessageArr);
        }
    }

    obj.id = await this.generateKey(TAB_NAME);
    matchingItemsArr = [];

   //Si on a pas le classeur dans le storage
   matchingItemsArr = (obj.id !== 1)?(matchingItemsArr.concat(TAB_NAME_ARR)):matchingItemsArr.concat([]);

   matchingItemsArr[obj.id] = obj;
    let retrunValue = await this.storage.set(TAB_NAME, matchingItemsArr);
    return retrunValue;
  }

  public async update(obj: Daddy, tabName: string = ''){
    const TAB_NAME = (tabName)??obj.constructor.name.toLowerCase();
    let matchingItemsArr: Daddy[];
    console.log(TAB_NAME);
    console.log(obj);
    console.log(obj.id);
    
    // eslint-disable-next-line prefer-const
    matchingItemsArr = await this.storage.get(TAB_NAME);
    matchingItemsArr = matchingItemsArr.filter(Boolean);
    console.log(matchingItemsArr);
    matchingItemsArr[obj.id-1] = obj;
    return this.storage.set(TAB_NAME, matchingItemsArr).then((val)=>{
      return  val;
    });
  }

  public async delete(obj: Daddy){

    const TAB_NAME = obj.constructor.name.toLowerCase().trim();
    let matchingItemsArr: Daddy[];
    
    // eslint-disable-next-line prefer-const
    matchingItemsArr = await this.storage.get(TAB_NAME);

    if(IndeletableTables.includes(TAB_NAME)){
     const hidden_entry = new HiddenEntries(obj.id, TAB_NAME);
     this.create(hidden_entry);
    }else {
      delete matchingItemsArr[obj.id];
    }
    
    let retrunValue = await this.storage.set(TAB_NAME, matchingItemsArr);
    return retrunValue;
  }

  public async read(tableName: string): Promise<any[]>{

    return this.storage.get(tableName.toLowerCase());
  }

  public  async generateKey(tableName: string): Promise<number>{

    let key: number;

    await this.read(tableName).then(daddiesArr => {
      daddiesArr = daddiesArr??[];
      const daddiesCopy = daddiesArr.concat([]);
      const lastItem = daddiesCopy.pop();

      key = (daddiesArr.length && lastItem)? parseInt(Object.keys(daddiesArr).pop(), 10) + 1:1;

    });

     return key;
  }

  public async readAndUpdatePropertiesObject(tableName: string): Promise<any>{

    return this.storage.keys().then(storageArrayKeys => {

     return Promise.all([this.read(tableName), storageArrayKeys, this.read('hiddenentries')])})
      .then(ValuesArr => {
      let allTableNameRecords =  ValuesArr[0];
      let storageArrayKeys = ValuesArr[1];
      let hiddenEntries = ValuesArr[2];
      
      if (allTableNameRecords)
        allTableNameRecords.forEach(obj => {
          Object.keys(obj).map(key => { 
            if (storageArrayKeys.includes(key.toLowerCase().trim()) && ((obj[key] instanceof Array)|| !Number.isNaN(parseInt(obj[key], 10)))) {
                        
              if(Array.isArray(obj[key])) {
              
                let temporaryArr = [];

                this.read(key).then(innerRecords => {
                  obj[key].map((id: string) => {
                    const CURRENT_ITEM_ID = parseInt(id, 10);
                    console.log(CURRENT_ITEM_ID);
                    temporaryArr.push(innerRecords[CURRENT_ITEM_ID]); 
                  });

                  obj[key] = temporaryArr;
                });

              }else {
                const CURRENT_ITEM_IDX = parseInt(obj[key], 10);        
                this.read(key.toLowerCase().trim()).then(innerRecords => {  
                  obj[key] = innerRecords[CURRENT_ITEM_IDX]; 
                });

              }
            }
          });
        });


      let hiddenTableNameRecords;
      hiddenEntries = hiddenEntries?.filter(Boolean);
      hiddenTableNameRecords = hiddenEntries?.filter(record => { return record.tableName === tableName});

      if (hiddenTableNameRecords?.length){

        const ID_ENTRIES_COLUMN = hiddenTableNameRecords.reduce((arrayForThisColumn: string[], currentEntry: Daddy) => {

          arrayForThisColumn.push(currentEntry[`id_entry`]);
  
          return arrayForThisColumn;
        }, []);

        
        allTableNameRecords = allTableNameRecords?.filter(Boolean);console.log(allTableNameRecords);

        allTableNameRecords = allTableNameRecords.filter(record => {return !ID_ENTRIES_COLUMN.includes(parseInt(record.id, 10))});

        console.log(allTableNameRecords);
      }
        
      return Promise.resolve(allTableNameRecords);

    });

  }

  public async getById(item:Daddy, id:number|string){
    let tableName = this.getTableName(item);
    return  this.storage.get(tableName).then((items: Daddy[]) =>{
      if(!items || items.length === 0){
        return null;
      }

      return items.find((elt) => elt?.id == id);
    })
  }

  private getTableName(obj : Daddy){
    return obj.constructor.name.toLowerCase().trim();
  }


  public async search(item:Daddy, champ:string, value:string){
    let tableName = this.getTableName(item);
    return this.storage.get(tableName).then((items: Daddy[]) =>{
      if(!items || items.length === 0){
        return null;
      }
      
      let all = items.filter((item:any) => {
        return item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1 || item[champ].toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
      console.log(all)
      return all;
    })
  }

  public setVal(key:string,value:any){
    return this.storage.set(key,value);
  }
  public getVal(key:string){
    return this.storage.get(key);
  }

}

