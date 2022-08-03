import { DATE_FORMAT } from './../../../lib/globalVar';
import { StatService } from './../../../services/stat.service';
import { showToast } from 'src/app/lib/FonctionUsuelle';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Fournisseur } from './../../../models/fournisseur';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Env } from 'src/app/models/env';
import { format } from 'date-fns';
import { IonDatetime } from '@ionic/angular';

const INIT_DATE: number = 1643673600000; //Tue Feb 01 2022 01:00:00 GMT+0100 (heure normale d’Afrique de l’Ouest);
@Component({
  selector: 'app-view-fournisseur',
  templateUrl: './view-fournisseur.page.html',
  styleUrls: ['./view-fournisseur.page.scss'],
})
export class ViewFournisseurPage implements OnInit {

  id : number;
  fournisseur : Fournisseur;
  dateDebut : number ; // valeur Thu Jan 06 2022 14:03:25 GMT+0100 (heure normale d’Afrique de l’Ouest) ;
  dateFin : number = new Date().getTime();
  ristourne: number;
  nbre_casier : number;
  env : Env;

  @ViewChild(IonDatetime) ionDateTime: IonDatetime;


  constructor ( 
    public crudSvc: CrudService, 
    public activatedRoute: ActivatedRoute, 
    public stat: StatService
  ){}

  async ngOnInit()
  { 
    this.fournisseur = history.state;
    // init the initial date of ristourne
    await this.initDates();
    // init the initial date of ristourne
    this.getRistourne(this.fournisseur.id, this.dateDebut, this.dateFin);
  }

  // 1) enregistrer la date sur le bon format
  // 2) Supprimer le timestamp de la memoire
  // 3) modifier la fonction getristourne

  async initDates(){

    this.env = await this.crudSvc.getVal('env');
    console.log(this.env);
    
    if(!this.env || !this.env.last_ristourne_date){
      
      if(!this.env){
        this.env = new Env();
      }
      // Init last ristourne date
      this.env.last_ristourne_date = INIT_DATE;
      // La date de debut est indiquée dans le model Env
      await this.crudSvc.setVal('env', this.env);
    }else{
      // showToast(ErrorMsg.bd + "p = vfp")
    }

    this.dateDebut = new Date(this.env.last_ristourne_date).getTime();

  }
 
  getRistourne(id: number|null, date_debut:number, date_fin: number){

    this.stat.getRistourne(id, date_debut, date_fin).then((val: any[]) =>{
      
      if(val.length != 0){
        this.ristourne = val[0].ristourne;
        this.nbre_casier = val[0].nbre_casier;
      }
      // 
    }).catch(e => {
      showToast("la ristourne n'a pas été recuperée");
      console.log(e);
    })

  }

  async dateChange() {

    this.env = new Env();

    this.env.last_ristourne_date = this.dateDebut;

    this.getRistourne(this.fournisseur.id, this.dateDebut, this.dateFin);

    await this.crudSvc.setVal('env',this.env);

  }

  dateChanged(value, dateType: string){

    if(dateType == 'date_fin'){
      this.dateFin = value;
    }

    if(dateType == 'date_debut'){
      this.dateDebut = value;
    }

    this.dateChange();

  }

  confirmDate(){
    this.ionDateTime.confirm(true);
  }

  closeDate(){
    this.ionDateTime.cancel(true);
  }
}
