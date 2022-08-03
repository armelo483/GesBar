import { DATE_FORMAT } from './../../lib/globalVar';
import { format } from 'date-fns';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dateConfig } from 'src/app/models/dateConfig';
import { AlertController, IonDatetime } from '@ionic/angular';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { convertForDateTime, showPreloader, toDisplayDate, toTimeStamp } from 'src/app/lib/FonctionUsuelle';

@Component({
  selector: 'app-ravitaillement',
  templateUrl: './ravitaillement.page.html',
  styleUrls: ['./ravitaillement.page.scss'],
})
export class RavitaillementPage  {

  date: number = new Date().getTime();

  // max date of calendar is set to today
  max_date: number = new Date().getTime();
  // min date of calendar
  min_date: number = toTimeStamp("2022-01-01");

  searchTextSubcription: BehaviorSubject<string> = new BehaviorSubject<string>("");
  
  @ViewChild(IonDatetime) ionDateTime: IonDatetime;

  constructor(public alertController: AlertController,
              public ravitaillementSvc: RavitaillementService,
              public crudSvc: CrudService,
              public router: Router) { console.log('je suis ici'); }
              

  toTextDate(date: number | string){
    return toDisplayDate(date);
  }

  dateChanged(value){
    this.date = toTimeStamp(value);
  }

  ionViewWillLeave(){
    // affection de la date au ravitaillement
    this.ravitaillementSvc.getProduitRavitailler().date = this.date;
  }

  gotoProduct($event){
    // Initialiser les produits ravitaillés
    this.ravitaillementSvc.getProduitRavitailler().produits = [];
    this.router.navigateByUrl("list_produit_ravitailler", { state : $event.fournisseur });
  }

  confirmDate(){
    this.ionDateTime.confirm(true);
  }

  closeDate(){
    this.ionDateTime.cancel(true);
  }

  toDatetimeFormat(date: number){
    return convertForDateTime(date);
  }

}
