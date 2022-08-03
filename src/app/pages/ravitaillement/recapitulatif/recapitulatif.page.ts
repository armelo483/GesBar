import { Router } from '@angular/router';
import { convertForDateTime, showToast, toTimeStamp } from 'src/app/lib/FonctionUsuelle';
import { dateConfig } from './../../../models/dateConfig';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UpdateRecapComponent } from 'src/app/components/update-recap/update-recap.component';


// for manage update of all string or number var
const TYPESIMPLE: number = 1;
// for manage update of all Array and Object
const TypeArray = 2;


@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.page.html',
  styleUrls: ['./recapitulatif.page.scss'],
})
export class RecapitulatifPage implements OnInit {

  // is it index or view?, create? ,update?
  // view @action = "view"
  // create @action = null
  // update @action = "update"
  action: string = null;
  ravitaillement: Ravitaillement;
  somme_total: number;

  @ViewChild(IonDatetime) ionDatetime: IonDatetime;

  constructor(
    private ravitaillementSvc: RavitaillementService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {

    let state = history.state;
    this.action = state.action;

    console.log(!(this.action == 'view'))
    if(state.action == "view"){
      console.log("view");
      this.ravitaillementSvc.setProduitRavitailler(state.ravitaillement);
    }
    
    if (state.action == "update"){
      console.log('update');
      this.ravitaillementSvc.setProduitRavitailler(state.ravitaillement);
    }
    // -----------------------------------------------------
    // let rav : Ravitaillement = {
    //   date: "2022-06-20",
    //   dette: 0,
    //   fournisseur: {id: 4, nom: 'Réné TKc'},
    //   id: 3,
    //   id_point_vente: 0,
    //   inventaireIsOK: 0,
    //   montant_verse: 1000000,
    //   nbre_bouteille_sup_entree: [],
    //   nbre_bouteille_sup_sortie: [],
    //   nbre_casier_plein_entree: 70,
    //   nbre_casier_plein_sortie: 10,
    //   nbre_casier_sup_entree: 0,
    //   nbre_casier_sup_sortie: 0,
    //   num_facture: "Num_facture",
    //   photo: null,
    //   produits: [
    //     {
    //       casier: {id: 2, nbreBtleParCasier: 24, nom: 'C24', description: '', visibilite: 1},
    //       categorie: {id: 1, nom: 'Bière', description: 'je suis la description', visibilite: 1},
    //       fournisseurs: [
    //         {id: 3, nom: 'Guinness', adresse: '', phone1: '', phone2: '', visibilite:1, collecte_ristourne: false},
    //         {id: 4, nom: 'Réné TKc', adresse: '', phone1: '', phone2: '', visibilite:1, collecte_ristourne: false}
    //       ],
    //       hasCasier: true,
    //       id: 4,
    //       imgLink: null,
    //       nbreBtleParCasier: 24,
    //       nom: "Petite Guinness",
    //       prixA: 13200,
    //       prixV: 14400,
    //       qte: 1680,
    //       ristourne: 300,
    //       upload: 0
    //   },
    //   {
    //       casier: {id: 2, nbreBtleParCasier: 24, nom: 'C24', description: '', visibilite: 1},
    //       categorie: {id: 1, nom: 'Bière', description: 'je suis la description', visibilite: 1},
    //       fournisseurs: [
    //         {id: 3, nom: 'Guinness', adresse: '', phone1: '', phone2: '', visibilite:1, collecte_ristourne: false},
    //         {id: 4, nom: 'Réné TKc', adresse: '', phone1: '', phone2: '', visibilite:1, collecte_ristourne: false}
    //       ],
    //       hasCasier: true,
    //       id: 5,
    //       imgLink: null,
    //       nbreBtleParCasier: 15,
    //       nom: "Kadji",
    //       prixA: 7200,
    //       prixV: 7800,
    //       qte: 100,
    //       ristourne: 250,
    //       upload: 0
    //   }
    //   ],
    //   save: 0,
    //   somme_total: 924000,
    // }
    // this.ravitaillementSvc.setProduitRavitailler(rav);
    // -----------------------------------------------------------------
    
    this.ravitaillement = this.ravitaillementSvc.getProduitRavitailler();
    console.log(this.ravitaillement); 
  }

  divisionEntiere(dividende: number, diviseur: number){
    return Math.floor(dividende/diviseur);
  }

  divisionReste(dividende: number, diviseur: number){
    return dividende % diviseur;
  }
  

  addRavitaillement(){
    
    let isInvalid = this.ravitaillementSvc.validate();

    if(typeof isInvalid == 'object' && isInvalid.length != 0){
      console.log(isInvalid);   // on verifie qu'il ne veut pas enregistré la facture
    }else{
      // isInvalide == true
      this.ravitaillementSvc.getProduitRavitailler().somme_total = this.ravitaillementSvc.totalMontant();
      this.ravitaillementSvc.addRavitaillement().then((val:Ravitaillement) =>{
        this.router.navigateByUrl("/ravitaillement/list-ravitailler");
        showToast("Ravitaillement effectué avec succès !!!");
     }).catch((err) => {
       if(err[0].indexOf('exist') != -1){
         showToast("ce numéro de facture existe déjà");
       }
      console.log(err);
      
     })
    }
  }

  async update(element:any){

    const modal = await this.modalCtrl.create({
      component: UpdateRecapComponent,
      cssClass: 'custom-modal',
      mode: 'ios',
      animated: true,
      componentProps: {value: element},
    })

    modal.onDidDismiss().then((val)=>{
      
      if( val.role == "backdrop"){
        return;
      }
      console.log(val.data);
      this.ravitaillement[element] = val.data.nom
      
    })

    modal.present();
  }

  updateDate(date){
    console.log(date);
    this.ravitaillement.date = toTimeStamp(date);
  }
  cancelDate(){
    this.ionDatetime.cancel(true);
  }
  confirmDate(){
    this.ionDatetime.confirm(true);
  }

  // cette fonction est utilisée pour convertir les timestamps en format de date pour les composant <ion-datime>
  toDatetimeFormat(date: number){
    return convertForDateTime(date);
  }

}
