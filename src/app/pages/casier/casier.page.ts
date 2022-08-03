import { CrudService } from 'src/app/services/crud.service';
import { Casier } from './../../models/casier';
import { Component, OnInit } from '@angular/core';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-casier',
  templateUrl: './casier.page.html',
  styleUrls: ['./casier.page.scss'],
})
export class CasierPage implements OnInit {

  casiers: Casier[];
  constructor(
    public storageSvc: CrudService
  ) { }

  ngOnInit() {
    showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    let tableName = new Casier(null,null,"","").constructor.name.toLowerCase().trim();
    console.log(tableName)
    this.storageSvc.read(tableName)
      .then((casier: Casier[]) =>{
        if(casier){
          console.log(casier)
          this.casiers = (casier)?casier.filter(n => n):[]; 
        } 
    },(e)=> {console.log(e);
    showToast(ErrorMsg.loading+'casiers')});
  }

  deleteItem(item:Casier){
    // for casting item var to type Casier
    let itemCast = castObject(item,new Casier(null,null,"",""))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }).catch(e => {
      console.log(e);
      showToast(ErrorMsg.delete)
    });
  }

}
