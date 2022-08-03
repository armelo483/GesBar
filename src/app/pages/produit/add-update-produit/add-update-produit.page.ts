import { markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from 'src/app/services/crud.service';
import { Casier } from 'src/app/models/casier';
import { Fournisseur } from 'src/app/models/fournisseur';
import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Produit } from 'src/app/models/produit';
import { NavController } from '@ionic/angular';
import { ErrorMsg } from 'src/app/lib/globalVar';


@Component({
  selector: 'app-update-add-produit',
  templateUrl: './add-update-produit.page.html',
  styleUrls: ['./add-update-produit.page.scss'],
})

export class AddUpdateProduitPage implements OnInit {
  alertOption: any = {
    color : 'danger'
  };
  prod: Produit;


  fournisseur;
  catProduit: CategorieProduit[] = [];
  price: number;
  chosenFournisseurs: Fournisseur[] = [];
  fournisseursList: Fournisseur[] = [];
  chosenFournisseur: Fournisseur[] = [];

  casiers: Casier[] = [];
  produitForm : FormGroup;

  public errorMessages = {
    nom : [
      {type : 'required', message : 'Ce champ est requis'},
    ],
    prixA : [
      {type : 'required', message : 'Ce champ est requis'},
      {type : 'min', message : 'valeur minimal 0'}
    ],
    prixV : [
      {type : 'required', message : 'Ce champ est requis'},
      {type : 'min', message : 'valeur minimal 0'}
    ],
    ristourne : [
      {type : 'required', message : 'Ce champ est requis'},
      {type : 'min', message : 'valeur minimal 0'}
    ],
    stoCaInit : [
      {type : 'required', message : 'Ce champ est requis'},
      {type : 'min', message : 'valeur minimal 0'}
    ],
    stoBoInit : [
      {type : 'required', message : 'Ce champ est requis'},
      {type : 'min', message : 'valeur minimal 0'}
    ],
    categorie : [
      {type : 'required', message : 'Ce champ est requis'}
    ],
    casier : [
      {type : 'required', message : 'Ce champ est requis'}
    ],
    upload : [
      {type : 'required', message : 'Ce champ est requis'}
    ],
    imgLink : [
      {type : 'required', message : 'Ce champ est requis'}
    ],
    fournisseurs : [
      {type : 'required', message : 'Ce champ est requis'}
    ]
  };

  activateRouteParams: {action: string, id: number};

  constructor(
    public formBuilder: FormBuilder,
    public crudSvc: CrudService,
    public navCtl: NavController,
    public activatedRoute: ActivatedRoute)
    {
      Object.keys(this.errorMessages).forEach(element => {
      this.errorMessages[`${element}`].forEach(element2 => {
        const type = element2.type;
        element2.message += ErrorMsg[type];
      });
    });
  }



  ngOnInit() {
    let state = history.state;

    delete state.navigationId;
    
    this.prod = state;

    console.log(this.prod.fournisseurs);

  }


   ionViewWillEnter(){
    
    const CATPRODUIT_PROMESSE = this.crudSvc.read('categorieproduit');
    const FOURNISSEUR_PROMESSE = this.crudSvc.read('fournisseur');
    const CASIER_PROMESSE = this.crudSvc.read('casier');

    Promise.all([CATPRODUIT_PROMESSE, FOURNISSEUR_PROMESSE, CASIER_PROMESSE]).then((values) => {

      const filteredValues =  values.map(value => (value)?value.filter(Boolean):[]);
      
      this.catProduit = filteredValues[0];
      console.log(this.catProduit);
      this.fournisseursList = filteredValues[1];
      this.casiers = filteredValues[2];
      console.log(this.casiers);
      
      const state = history.state;
      delete state.navigationId;

      this.prod = state;
      this.chosenFournisseurs = this.prod.fournisseurs;
      this.chosenFournisseurs = (this.chosenFournisseurs)?this.chosenFournisseurs.filter(Boolean):[];
      console.log(this.chosenFournisseurs);
      this.loadForm(this.prod);
    });
    
  }

  logForm(){
    // console.log(this.prod.constructor.name); return;
    if(markFormGroupTouched(this.produitForm)){
      if(this.produitForm.valid){

        let produit = new Produit();

        produit.nom =  this.produitForm.value.nom;
        produit.prixA =  parseInt(this.produitForm.value.prixA);
        produit.prixV =  parseInt(this.produitForm.value.prixV);
        produit.ristourne =  parseInt(this.produitForm.value.ristourne);
        produit.categorie =  this.produitForm.value.categorie;
        produit.casier = this.produitForm.value.casier;
        produit.fournisseurs = this.produitForm.value.fournisseurs;
        produit.hasCasier = this.produitForm.value.hasCasier;
        // console.log(this.produitForm.value.fournisseurs);

        if (!this.prod.id) {

          this.crudSvc.create(produit).then((val)=>{
            showToast("Produit enregistré")
            this.navCtl.navigateForward('/produit');
          }, (e)=> showToast(ErrorMsg.create));

        }else{

          produit.id  =  this.prod.id;
          this.crudSvc.update(produit).then((p)=>{
            console.log(p);
            this.navCtl.navigateForward('/produit')
            showToast("Produit mise à jour")
          }, (e) => showToast(ErrorMsg.update));
        }
      } else{
        showToast("Veuillez remplir tous les champs");
      }
    }
  }

  compareWith(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

/*
*
*  // form init
*
*/
loadForm(produit: any){

  if(produit.id){  
    
    this.produitForm = this.formBuilder.group({
      id :           [produit.id],
      nom :          [produit.nom, [Validators.required]],
      prixA :        [produit.prixA, [Validators.required, Validators.min(0)]],
      prixV :        [produit.prixV, [Validators.required, Validators.min(0)]],
      ristourne :    [produit.ristourne, [Validators.required, Validators.min(0)]],
      stoBoInit :    [produit.stoBoInit],
      stoCaInit :    [produit.stoCaInit],
      hasCasier :    [produit.hasCasier],
      categorie :    [produit.categorie, [Validators.required]],
      casier :       [produit.casier, [Validators.required]],
      fournisseurs : [produit.fournisseurs, [Validators.required]],
      upload :       [null],
      imgLink :      [null],
    });

  }else{

    this.produitForm = this.formBuilder.group({
      id :           [null],
      nom :          ['' , [Validators.required]],
      prixA :        ['', [Validators.required, Validators.min(0)]],
      prixV :        ['', [Validators.required, Validators.min(0)]],
      ristourne :    ['0', [Validators.required, Validators.min(0)]],
      stoBoInit :    ['', [ Validators.min(0)]],
      stoCaInit :    ['', [Validators.min(0)]],
      hasCasier :    [produit.hasCasier],
      categorie :    ['',[Validators.required]],
      casier :       ['',[Validators.required]],
      fournisseurs : ['',[Validators.required]],
      upload :       [null],
      imgLink :      [null],
    });

  }
}


  get nom(){
    return this.produitForm.get('nom');
  }

  get prixA(){
    return this.produitForm.get('prixA');
  }

  get prixV(){
    return this.produitForm.get('prixV');
  }

  get ristourne(){
    return this.produitForm.get('ristourne');
  }

  get stoCaInit(){
    return this.produitForm.get('stoCaInit');
  }

  get stoBoInit(){
    return this.produitForm.get('stoBoInit');
  }

  get categorie(){
    return this.produitForm.get('categorie');
  }

  get casier(){
    return this.produitForm.get('casier');
  }

  get emballage(){
    return this.produitForm.get('emballage');
  }

  get imgLink(){
    return this.produitForm.get('imgLink');
  }

  get upload(){
    return this.produitForm.get('upload');
  }

  get fournisseurs(){
    return this.produitForm.get('fournisseurs');
  }

  hasCasier($event){
    this.prod.hasCasier = !this.prod.hasCasier;
  }


compareFn(o1, o2) {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((u) => u.id === o1.id);
  }

  return o1.id === o2.id;
}
}
