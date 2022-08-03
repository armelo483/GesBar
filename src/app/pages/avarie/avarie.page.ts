import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg, IndeletableTables } from 'src/app/lib/globalVar';
import { Avarie } from 'src/app/models/avarie';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-avarie',
  templateUrl: './avarie.page.html',
  styleUrls: ['./avarie.page.scss'],
})
export class AvariePage implements OnInit {

  avaries : Avarie[];
  constructor(
    public storageSvc: CrudService,
    public router: Router
  ) { }

  ngOnInit() {
    showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    let tableName = 'avarie';
    this.storageSvc.readAndUpdatePropertiesObject(tableName)
      .then((avaries: Avarie[]) => {
        if(avaries){
          this.avaries = avaries?avaries.filter(Boolean):[]; 
        } 
    },(e)=> console.log(e)).catch(e => {
      console.log(e);
      showToast(ErrorMsg.loading+'avaries')
    });;
  }

  deleteItem(item:Avarie){
    // for casting item var to type Fournisseur
    let itemCast = castObject(item,new Avarie(null))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }).catch(e => {
      console.log(e);
      showToast(ErrorMsg.delete)
    });
  }

  viewItem(item: Avarie){
    this.router.navigateByUrl("avarie/view",{state:item});
  }
  updateItem(item: Avarie){
    this.router.navigateByUrl("avarie/update",{state:item});
  }

}
