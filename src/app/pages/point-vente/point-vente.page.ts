import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { PointVente } from 'src/app/models/PointVente';
import { StorageService } from 'src/app/services/storage.service';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-point-vente',
  templateUrl: './point-vente.page.html',
  styleUrls: ['./point-vente.page.scss'],
})
export class PointVentePage implements OnInit {

  pointeVente: PointVente[];
  constructor(private storageSvc: CrudService){ 
    // this.load();
  }

  ngOnInit() {
    showPreloader();
    //this.load();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    let tableName = new PointVente(null,"","","").constructor.name.toLowerCase().trim();
    console.log(tableName)
    this.storageSvc.read(tableName)
      .then((pointVente: PointVente[]) =>{
        if(pointVente){
          console.log(pointVente  )
          this.pointeVente = pointVente;
          let tab = [];
          tab = pointVente.filter(n => n);
          console.log(tab);
        }
    }, (e) => showToast(ErrorMsg.loading+'points de vente'));
  }

  deleteItem(item:PointVente){
    // for casting item var to type PointVente
    let itemCast = castObject(item,new PointVente(null,"","",""))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }, (e) => showToast(ErrorMsg.delete))
  }

}
