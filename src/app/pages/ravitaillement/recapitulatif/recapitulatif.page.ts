import { Router } from '@angular/router';
import { convertForDateTime, showToast, toTimeStamp } from 'src/app/lib/FonctionUsuelle';
import { dateConfig } from './../../../models/dateConfig';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { IonDatetime, ModalController } from '@ionic/angular';
import { UpdateRecapComponent } from 'src/app/components/update-recap/update-recap.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateRecapPage } from '../../update-recap/update-recap.page';
import { CrudService } from 'src/app/services/crud.service';
import { Daddy } from 'src/app/models/daddyObj';

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
    private modalCtrl: ModalController,
    private crudService: CrudService
  ) { }

  ngOnInit() {

   
  }

  ionViewWillEnter() {
    let state = history.state;
    this.action = state.action;
    this.action = "update";
    const description = '';
    const nom = '';

    console.log(!(this.action == 'view'))
    console.log(this.action)
    if(state.action == "view"){
      console.log("view");
      this.ravitaillementSvc.setProduitRavitailler(state.ravitaillement);
    }
    
    if (state.action == "update"){
      console.log('update');
      this.ravitaillementSvc.setProduitRavitailler(state.ravitaillement);
    }
    
    this.ravitaillement = this.ravitaillementSvc.getProduitRavitailler();
    let produits = this.ravitaillement.produits.filter(Boolean);
    this.ravitaillement.produits = produits;
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

  async update(event:object, ravitaillementObj:object, fieldLabel:string, fieldName:string, secondFieldName?:string, index?:number ){

var element = {obj: null, label: null, field: null, field2:null, index:null};
element.obj = ravitaillementObj;
element.label = fieldLabel;
element.field = fieldName;
element.field2 = secondFieldName;
element.index = index;

// objInModal.value = event.val;
// objInModal.value = valueField;
console.log(element);
console.log(event);
    const modal = await this.modalCtrl.create({
      component: UpdateRecapPage,
      animated: true,
      componentProps: {value: element},
    });

    modal.onWillDismiss().then((val)=>{
      
      if( val.role == "backdrop"){
        return;
      }
      console.log("val.data");
      console.log(val.data);

      if (!['prixA', 'nom', 'qte', 'nbreBtleParCasier'].includes(fieldName)) {
        this.ravitaillement[`${val.data.fieldName}`] = val.data.value;
      }else {

        let produits = this.ravitaillement.produits.filter(Boolean);
        let index = val.data.index;
        this.ravitaillement.produits = produits;

        if (fieldName === 'prixA') {
          this.ravitaillement['produits'][index]['prixA'] = val.data.value;
        } else if (fieldName === 'nom') {
          console.log(val.data)
          this.ravitaillement['produits'][index]['nom'] = val.data.value;
        } else if (fieldName === 'qte' ) {
          this.ravitaillement['produits'][index]['qte'] = val.data.value;
        }else if (fieldName === 'nbreBtleParCasier') {
          this.ravitaillement['produits'][index]['nbreBtleParCasier'] = val.data.value;
        }
        
        this.crudService.update(this.ravitaillement['produits'][index], 'produit');
      }
      
      //this.ravitaillement.constructor = Ravitaillement;
      // this.ravitaillement
      //  this.ravitaillement = val.data.ravitaillement[0];
      console.log(this.ravitaillement);
      this.crudService.update(this.ravitaillement, 'ravitaillement');
      // this.ravitaillement[element] = val.data.nom
      
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