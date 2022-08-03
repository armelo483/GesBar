import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Daddy } from '../models/daddyObj';

// const tableName = "toto";
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
  }

  getTableName(obj: Object) {
    return obj.constructor.name.toLowerCase();
  }

  //Create
  public async create(item:Daddy): Promise<any>{
    let tableName = this.getTableName(item);
    return this.storage.get(tableName).then((items:[]) =>{
      let tab = []
      if(items){
        tab = items;
        this.generateKey(item).then((id:number) => {
          item.id = id;
          tab[id] = item;
          return this.storage.set(tableName, tab).then(() =>{
            console.log(items)
          });
        });
        
      }else{
        this.generateKey(item).then(id => {
          item.id = id;
          tab[id] = item;
          return this.storage.set(tableName, tab).then(()=>{
            console.log(item);
          })
        });
      }
    }) 
  }

  public async generateKey(tableName: Daddy): Promise<number>{

    return this.read(tableName).then((daddiesArr: Daddy[]) => {
      let  keys : any[] = [];

      // Pour eviter de faire Object.keys(null)
      if(!(daddiesArr == null)){
        keys =  Object.keys(daddiesArr);
      }

      return (keys.length != 0)?parseInt(keys.pop(), 10) + 1:0;
    });
  }


  //Read
  public async read(item:Daddy): Promise<Daddy[]>{
    let tableName = this.getTableName(item);
    console.log(tableName);
    
    return this.storage.get(tableName);
  }

  // update(item:Daddy){
  //   let tableName = this.getTableName(item);
  //   console.log(tableName);
    
  //   return this.storage.get(tableName).then((items: Daddy[]) =>{
  //     console.log(items);
  //     if(!items || items.length === 0){
  //       return null;
  //     }
  //     let newItems: Daddy[] = [];
      
  //     for(let i of items) {
  //       if(i.id === item.id) {
  //         newItems.push(item);
  //       }else{
  //         newItems.push(i);
  //       }
  //     }
  //     return this.storage.set(tableName, newItems);
  //   });
  // }
  //Update
  public async update(item:Daddy){
    let tableName = this.getTableName(item);
    console.log(tableName);
    
    return this.storage.get(tableName).then((items: Daddy[]) =>{
      console.log(items);

      if(!items || items.length === 0){
        return null;
      }
      let tab = [];
      tab = items.slice();
      tab[item.id] = item;
      return this.storage.set(tableName, tab);

    });
  }

   public async getById(item:Daddy, id:number|string){
    let tableName = this.getTableName(item);
    return  this.storage.get(tableName).then((items: Daddy[]) =>{
      if(!items || items.length === 0){
        return null;
      }

      return items.find((elt) => elt.id == id);
    })
  }

  //Delete
  public async delete(item:Daddy){
    let tableName = this.getTableName(item);
    return this.storage.get(tableName).then((items: Daddy[]) =>{
      if(!items || items.length === 0){
        return null;
      }

      delete items[item.id];

      return this.storage.set(tableName, items);
    });
  }
}

