import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { timeConverter } from 'src/app/lib/FonctionUsuelle';
import { Daddy } from 'src/app/models/daddyObj';
import { Fournisseur } from 'src/app/models/fournisseur';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update-recap',
  templateUrl: './update-recap.page.html',
  styleUrls: ['./update-recap.page.scss'],
})
export class UpdateRecapPage implements OnInit {
  modalForm: FormGroup;
  @Input() objInModal : any; 
  ravitaillement: Daddy;
  date;
  index: number;
  fournisseurs: Daddy[];
  groupObject: any = {recap_variable: null};
  label_variable = '';
  field_type = '';
  currentFournisseur: Daddy;

  constructor(private modalCtrl: ModalController,
    private router: Router,
    private formBuilder: FormBuilder, params: NavParams, private crudService: CrudService) { 
      this.objInModal = params.data.value;
    }

  ngOnInit() {

      if (this.objInModal.field === 'num_facture') {
        var num_facture = this.objInModal.obj.num_facture; 
        this.groupObject.recap_variable = [num_facture];
        this.field_type = 'text';
      }else if (this.objInModal.field === 'fournisseur') {
        // this.ravitaillement = window.history.state.customData;
       this.crudService.read('fournisseur').then(fournisseurs =>
        { 
          this.fournisseurs = fournisseurs.filter(Boolean); 
          var nom_fournisseur = this.objInModal.obj.fournisseur;
          this.groupObject.recap_variable = [nom_fournisseur];
          this.field_type = 'select';
        });
              
      }else if (this.objInModal.field === 'somme_total') {
        var somme_total = this.objInModal.obj.somme_total; 
        this.groupObject.recap_variable = [somme_total];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'montant_verse') {
        var montant_verse = this.objInModal.obj.montant_verse;
        this.groupObject.recap_variable = [montant_verse];
        this.field_type = 'numeric';
      }else if(this.objInModal.field === 'date') {
        var dateInMilliSeconds = this.objInModal.obj.date;
        this.date = new Date(dateInMilliSeconds).toJSON();
        // this.date = new Date(dateInMilliSeconds);
        this.groupObject.recap_variable = [this.date];
        this.field_type = 'date';

        console.log(this.date)
      }else if (this.objInModal.field === 'nbre_casier_sup_entree') {
        var nbre_casier_sup_entree = this.objInModal.obj.nbre_casier_sup_entree;
        this.groupObject.recap_variable = [nbre_casier_sup_entree];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'nbre_casier_sup_sortie') {
        var nbre_casier_sup_sortie = this.objInModal.obj.nbre_casier_sup_sortie;
        this.groupObject.recap_variable = [nbre_casier_sup_sortie];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'nbre_casier_plein_entree') {
        var nbre_casier_plein_entree = this.objInModal.obj.nbre_casier_plein_entree;
        this.groupObject.recap_variable = [nbre_casier_plein_entree];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'nbre_casier_plein_sortie') {
        var nbre_casier_plein_sortie = this.objInModal.obj.nbre_casier_plein_sortie;
        this.groupObject.recap_variable = [nbre_casier_plein_sortie];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'prixA') {
        this.index = this.objInModal.index; console.log(this.index, this.objInModal);
        let produits = this.objInModal.obj.produits.filter(Boolean);
        let prixA = produits[this.index]['prixA'];
        // this.objInModal.obj['produits'][this.index][`${}`].prixA; console.log(this.objInModal.obj, prixA);
        this.groupObject.recap_variable = [prixA];
        this.field_type = 'numeric';
      }else if (this.objInModal.field === 'qte') {
        this.index = this.objInModal.index; 
        let produits = this.objInModal.obj.produits.filter(Boolean);
        let qte = produits[this.index]['qte'];
        // this.objInModal.obj['produits'][this.index][`${}`].prixA; console.log(this.objInModal.obj, prixA);
        this.groupObject.recap_variable = [qte];
        this.field_type = 'numeric';
      } if (this.objInModal.field === 'nom') {
        this.index = this.objInModal.index; 
        // console.log(this.objInModal);
        let produits = this.objInModal.obj.produits.filter(Boolean);
        let nom = produits[this.index]['nom'];
        this.groupObject.recap_variable = [nom];
        this.field_type = 'text';
      }
      
      
      this.label_variable = this.objInModal.label;
      this.modalForm  = this.formBuilder.group(this.groupObject); 
      
  }


  dismiss(value: any, fieldName: string) {
  
    this.modalCtrl.dismiss({'dismissed': true, 'value':value, 'fieldName': fieldName, 'index': this.index??null});
  }

  submitModalForm() {
    var recap_variable_value = this.modalForm.value.recap_variable;
    console.log(recap_variable_value);
    // this.router.navigateByUrl('/ravitaillement/recapitulatif', {state: {ravitaillement: this.objInModal.obj, action: "update"}});
    this.dismiss(recap_variable_value, this.objInModal.field);
    // var ravitaillementNew = new Ravitaillement();
    // var ravitaillement = this.objInModal.obj;
    // var ravitaillementMerged = Object.assign({}, ravitaillement, ravitaillementNew);
    // ravitaillementMerged.constructor = Ravitaillement;
    // // console.log(ravitaillementMerged);
    // ravitaillementMerged.num_facture = this.modalForm.get('recap_variable').getRawValue();

      // this.crudService.update(ravitaillementMerged).then(ravitaillement => {
      //   // this.modalCtrl.dismiss({ravitaillement: ravitaillement,'dismissed': true});
      //   this.dismiss();
      // });
      
      // console.log(this.objInModal);
  }



  async ionViewWillEnter(){

    if (this.objInModal.field === 'fournisseur') {
      this.currentFournisseur = this.fournisseurs[0];
    }

    // eslint-disable-next-line no-underscore-dangle
    // this._getSelectedPtVente();

}

}
