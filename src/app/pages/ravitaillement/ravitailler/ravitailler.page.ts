import { AlertService } from './../../../services/alert-service.service';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { NavController } from '@ionic/angular';
import { notEmpty } from 'src/app/inc/functions';
import { initializeErrorMessages, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';

@Component({
  selector: 'app-ravitailler',
  templateUrl: './ravitailler.page.html',
  styleUrls: ['./ravitailler.page.scss'],
})
export class RavitaillerPage implements OnInit {

  id: number;
  prod: Produit;
  modifierPrix = true;
  etatBouton = false;
  ravitaillerForm;

  // isCustom is for knowing if having bouteille supplementaire
  isCustom: boolean = false;
  /*
  * this page is use to several purposes
  *
  **/

  listeProduitsRavitailles = [];

  productToSave : Produit;
  
  // nombre de bouteille par casier qteCasier
  // id casier
  // nombre de casier
  // du nombre de bouteille supplementaire
  // prix
  // prix achat du casier
  prixA:number;
  // prix vente du casier
  prixV:number;
  nbreBouteilleParCasier:number;
  // nombre de  casier
  nbreCasier:number;
  // nombre de bouteille par casier
  nbreBouteilleVide:number;

  constructor(
    public formBuilder: FormBuilder,
    private crudSvc: CrudService,
    private alertSvc: AlertService,
    private router: Router,
    private navCtl: NavController,
    private ravitaillementSvc: RavitaillementService
  ) {
    this.prod = (Object.keys(history.state).length>1) ? history.state : null;
  }

  addRavitailler(produit){
    this.crudSvc.create(produit);
  }


  ionViewDidload(){
    this.initForm() ;
  }

  ngOnInit() {
    console.log("ravitailler.page.ts");
    this.prod = (Object.keys(history.state).length>1)?history.state:null;

    if(this.validationParametresDentree){

      console.log(this.prod);
      console.log(this.ravitaillementSvc.productExist(this.prod.id));
      console.log(this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id]);
      
      console.log(history.state.qte);
      console.log(history.state.prix);
      
      
      //case of update
      if(this.prod && this.ravitaillementSvc.productExist(this.prod.id)){

        console.log(this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id]);

          let val = this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id]
          // nombre de bouteille total
          let nbreTotalBouteille = val.qte;
          // nombre de bouteille par casier
          let nbrebouteilleparCasier = val.nbreBtleParCasier??0;
          // convertir le nombre de casier plein 
          let nbreCasier = Math.floor(nbreTotalBouteille / nbrebouteilleparCasier);
          // convertir le nombre total de bouteille supplementaire
          let nbreBoutSupplementaire = nbreTotalBouteille % nbrebouteilleparCasier;

          // is it a custom command
          // we have to open nbreCasiersupplementaire input
          if(nbreBoutSupplementaire){
            this.isCustom = !this.isCustom;
          }
          // initialiser le formulaire
          // si nbreCasier = null ou nbreBoutSupplementaire = null on remplace par ""
          this.initForm( nbreCasier,nbreBoutSupplementaire);
          return;
      }

      //case of new add
      this.initForm();
      console.log("ngOninit");
    }else{
      console.log(this.validationParametresDentree); 
    }    
  }
  ngOnDestroy(){
    // this.suscription.unsubscribe();
    
  }

  // return false si un des champ manquant pour le bon fonctionnement de cette classe est manquant
  validationParametresDentree(){
      let error = [];
      if( !(this.prod.casier)){
        error.push("Le casier contenant ce produit est mal configuré")
      } 
      if( !(this.prod.casier.nbreBtleParCasier)){
        error.push("Renseignez le nombre de casiers dans la configuration des casiers")
      }
      if( !(this.prod.prixA)){
        error.push("Le prix d'achat n'est pas renseigné dans la configuration des casiers veuillez le verifier")
      }
      if( !(this.prod.prixV)){
        error.push("Le prix de vente n'est pas renseigné dans la configuration des casiers veuillez le verifier")
      }
      return error == [] ? true : false;
  }


  initForm(nbreCasier: number = 0, nbreBoutSupplementaire: number = 0){

    let price = (this.prod) ? this.prod?.prixA : "";

    let nom = (this.prod) ? (this.prod?.nom) : '';

    if((this.prod) && this.ravitaillementSvc.productExist(this.prod.id)){
      price = this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id].prixA
    }
    
    this.ravitaillerForm = this.formBuilder.group({
      nom : [nom , [Validators.required]],
      qteCasier : [nbreCasier , [ Validators.min(0)]],
      qteBtle : [nbreBoutSupplementaire , [ Validators.min(0)]],
      prix : [price, [Validators.required, Validators.min(0)]]
    });

  }

  alertOption: any = {
    color : 'danger'
  };

 


  public errorMessages = {
    qteCasier : [
      {type : 'required', message : ''},
      {type : 'min', message : 'valeur trop petite'},
    ],
    qteBtle : [
      {type : 'required', message : ''},
      {type : 'min', message : 'valeur trop petite'},
    ],
    prix : [
      {type : 'required', message : ''},
      {type : 'min', message : 'valeur trop petite'},
    ]
  };

  get qteCasier(){
    return this.ravitaillerForm.get('qteCasier');
  }

  get qteBtle(){
    return this.ravitaillerForm.get('qteBtle');
  }

  get prix(){
    return this.ravitaillerForm.get('prix');
  }



  ionViewWillEnter(){
    this.prod = (Object.keys(history.state).length>1) ? history.state : null;
    console.log(this.prod);
    initializeErrorMessages(this.errorMessages);
  }

  logForm(){
    
    if(!this.prod){
      console.log('Aucun produit reçu')
      return;
    }
    
    if( this.ravitaillerForm.value.qteBtle == 0 && this.ravitaillerForm.value.qteCasier == 0){
      showToast('Veuillez indiquer la quantité');
      return;
    }
    
    if( this.ravitaillerForm.value.qteBtle == "" && this.ravitaillerForm.value.qteCasier == ""){
      showToast('Veuillez indiquer la quantité');
      return;
    }
    
    if( this.ravitaillerForm.value.qteBtle == null && this.ravitaillerForm.value.qteCasier == null){
      showToast('Veuillez indiquer la quantité');
      return;
    }
    
    if( this.ravitaillerForm.value.qteBtle && this.ravitaillerForm.value.qteBtle % this.prod.casier.nbreBtleParCasier == 0){
      showToast('Mettez les bouteilles supplementaires dans un casier');
      return;
    }

    if(markFormGroupTouched(this.ravitaillerForm)){


      var form :any = this.ravitaillerForm.value;
      let nbreBtleParCasier = this.prod.casier.nbreBtleParCasier;
      console.log(nbreBtleParCasier);
      
      this.productToSave = {
        id : (this.prod)?this.prod.id:null,
        prixV : notEmpty(this.prod.prixV),
        categorie : this.prod.categorie,
        casier: this.prod.casier,
        fournisseurs: this.prod.fournisseurs,
        imgLink: this.prod.imgLink,
        upload: this.prod.upload,
        hasCasier: this.prod.hasCasier,
        ristourne: notEmpty(this.prod.ristourne),
        nom : this.prod.nom,

        qte : notEmpty(form.qteCasier) * notEmpty(nbreBtleParCasier) + notEmpty(form.qteBtle),
        prixA : notEmpty(form.prix),
        nbreBtleParCasier : notEmpty(nbreBtleParCasier),
      };
      

      if(this.prod && this.ravitaillementSvc.productExist(this.prod.id)){

        this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id] = this.productToSave;
        console.log('ancien');
        
      }else if(this.prod){
        
        if(this.ravitaillementSvc.getProduitRavitailler().produits.length == 0){
          this.ravitaillementSvc.getProduitRavitailler().produits = [];
        }
        
        this.ravitaillementSvc.getProduitRavitailler().produits[this.prod.id] = this.productToSave;
        
      }

      console.log(this.ravitaillementSvc.getProduitRavitailler());
      this.router.navigateByUrl("list_produit_ravitailler", {state: this.productToSave})

      }else {
        showToast();
      }

    //  this.router.navigateByUrl('/ravitaillement');
  }

  customCommande(){
    this.isCustom = !this.isCustom;
    if(this.isCustom == false){
      this.ravitaillerForm.controls['qteBtle'].setValue(0)
      console.log(this.ravitaillerForm.value.qteBtle);
    }
  }

}
