import { showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from 'src/app/services/crud.service';
import { AlertService } from './../../../services/alert-service.service';
import { Component, OnInit } from '@angular/core';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { Casier } from 'src/app/models/casier';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BouteilleSuplementaire } from 'src/app/models/ravitaillement';
import { notEmpty } from 'src/app/inc/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-entree-sortie-casier',
  templateUrl: './add-edit-entree-sortie-casier.page.html',
  styleUrls: ['./add-edit-entree-sortie-casier.page.scss'],
})
export class AddEditEntreeSortieCasierPage implements OnInit {

  

  activeCustom: boolean = false;
  bouteilleSuplementaireEntree: Array<BouteilleSuplementaire> = [];
  bouteilleSuplementaireSortie: Array<BouteilleSuplementaire> = [];
  allCasiers = [];
  mouvementCasier : FormGroup;
  somme_total : number;

  constructor(
    private ravitaillementSvc: RavitaillementService,
    private router: Router,
    private crudSvc: CrudService,
    private formBuilder: FormBuilder,
    private alertSvc: AlertService,
  ) { }

  ionViewWillEnter(){
    this.somme_total = this.ravitaillementSvc.totalMontant();
  }

  ngOnInit() {
    console.log("add-edit-entree-sortie-casier.page.ts");
    console.log(this.ravitaillementSvc.totalCasier());
    let tableName =  new Casier().constructor.name.toLowerCase().trim();
    console.log(tableName);
    this.crudSvc.read(tableName)
      .then((casier: Casier[]) =>{
        console.log(casier);
        if(casier) {this.allCasiers = casier.filter(n => n); }
        console.log(this.allCasiers);
         
      }
      ,(e)=> console.log(e));

      this.mouvementCasier = this.formBuilder.group({
        num_facture : ["", [Validators.required]],
        montant_verse : [0,[Validators.required, Validators.min(0)]],
        nbreCasierPleinSortie : [0, [ Validators.min(0)]],
        nbreCasierSuppSortie : [0, [Validators.min(0)]],
        bouteilleSupSortie : [this.bouteilleSuplementaireSortie],
        nbreCasierSuppEntree : [0, [Validators.min(0)]],
        nbreCasierPleinEntree : [this.ravitaillementSvc.totalCasier(), [Validators.min(0)]],
        bouteilleSupEntree : [this.bouteilleSuplementaireEntree],
    });

      if(this.ravitaillementSvc.isCustomCommand()){ 
        this.activeCustom = true ;
      }
  }

  get nbreCasierPleinEntree(){
    return this.mouvementCasier.get('nbreCasierPleinEntree');
  }

  get num_facture(){
    return this.mouvementCasier.get('num_facture');
  }

  get montant_verse(){
    return this.mouvementCasier.get('montant_verse');
  }

  get nbreCasierSuppEntree(){
    return this.mouvementCasier.get('nbreCasierSuppEntree');
  }

  get bouteilleSupEntree(){
    return this.mouvementCasier.get('bouteilleSupEntree');
  }

  get nbreCasierPleinSortie(){
    return this.mouvementCasier.get('nbreCasierPleinSortie');
  }

  get nbreCasierSuppSortie(){
    return this.mouvementCasier.get('nbreCasierSuppSortie');
  }

  get bouteilleSupSortie(){
    return this.mouvementCasier.get('bouteilleSupSortie');
  }

  public errorMessages = {
    nbreCasierPleinEntree : [
      {type : 'min', message : 'valeur trop petite'},
    ],
    nbreCasierSuppEntree : [
      {type : 'min', message : 'valeur trop petite'},
    ],
    nbreCasierPleinSortie : [
      {type : 'min', message : 'valeur trop petite'},
    ],
    nbreCasierSuppSortie : [
      {type : 'min', message : 'valeur trop petite'},
    ],
    num_facture : [
      {type : 'required', message : 'veuillez remplir ce champ'},
    ],
    montant_verse : [
      {type : 'min', message : 'valeur trop petite'},
      {type : 'required', message : 'veuillez remplir ce champ'},
    ]
  };

  activecustomForm(){
    this.activeCustom = !this.activeCustom;
  }

  comparewith(o1,o2){
    return o1 && o2 ? o1.nom == o2.nom : o1 == o2
  }
  
  
  // nbre sert a re-initialiser le champ input
  // @role have the only to reset input after tigger
  // @inputType : know if is entree or sortie whom is fire
  addBouteilleSuplementaire(bout:BouteilleSuplementaire,inputType: "entree" | "sortie", nbre){
    console.log(bout);
    console.log(inputType);
    console.log(nbre);

    let clone:any;

    if(nbre.value == 0 || nbre.value == null || nbre.value == undefined){
      showToast("Nombre d'element incorrect");
      return;
    }

    if(nbre.value < 0){
      showToast("Nombre d'element incorrect");
      nbre.value = "";
      return;
    }

    if(nbre.value > (bout.casier.nbreBtleParCasier -1 )){
      showToast("Nombre d'element incorrect. Ce nombre ne doit pas dépasser la capacité du casier");
      nbre.value = "";
      return;
    }

    if(inputType === "entree"){
        clone = this.bouteilleSuplementaireEntree.slice();
    }else if(inputType === "sortie"){
        clone = this.bouteilleSuplementaireSortie.slice();
    }

    console.log(clone);
    
    let index = clone.findIndex(elt => elt.casier == bout.casier);
    console.log(index);
    
    if(index == -1){
      switch(inputType){
        case 'entree': this.bouteilleSuplementaireEntree.push(bout); break;
        case 'sortie': this.bouteilleSuplementaireSortie.push(bout); break;
      }
    }else{

      switch (inputType){
        case 'entree' : this.bouteilleSuplementaireEntree[index] = bout;  break;
        case 'sortie' : this.bouteilleSuplementaireSortie[index] = bout; break;
      }
      
    }
    // reinitialisation du champ input
    nbre.value="";
    
  }
  removeBouteilleSuplementaire(bout:BouteilleSuplementaire,inputType: "entree" | "sortie"){
    switch(inputType){
      case "entree": {
        let clone = this.bouteilleSuplementaireEntree.slice();
        let tab = clone.filter(elt => elt.casier != bout.casier);
        this.bouteilleSuplementaireEntree = tab;
        break;
      }
      case 'sortie': {
        let clone = this.bouteilleSuplementaireSortie.slice();
        let tab = clone.filter(elt => elt.casier != bout.casier);
        this.bouteilleSuplementaireSortie = tab;
        break;
      }
    }
  }

  logForm(){

    console.log(this.mouvementCasier.value);
    

    if(this.mouvementCasier.invalid){
      this.alertSvc.showToast('Veuillez remplir les cases rouges',"danger");
      return;
    }
    
    if(!this.num_facture){
      showToast("Veuillez renseigner le numero de facture")
    }
    if(!this.montant_verse){
      showToast("Veuillez renseigner le montant versé")
    }

    let errors : Array<string> = []

    if(!this.mouvementCasier.value.nbreCasierPleinEntree && this.mouvementCasier.value.nbreCasierPleinEntree != 0){
        errors.push("Veuillez indiquer la quantité de casiers Entrée");
        // this.alertSvc.showToast('Veuillez indiquer la quantité',"danger");
    }

    if(!this.mouvementCasier.value.nbreCasierPleinSortie && this.mouvementCasier.value.nbreCasierPleinEntree != 0){
      errors.push("Veuillez indiquer la quantité de casiers Sortie");
      // this.alertSvc.showToast('Veuillez indiquer la quantité',"danger");
    }
    
    
    // si il y'a des erreur afficher une alerte en indiquant quoi faire
    if(errors.length != 0){
      let text = "<h2>Quelques actions sont requises</h2>";
      let num = 0;
      for(let i = 0; i< errors.length; i++){
        num = i +1;
        text += num + " - " + errors[i]+"</br>"
      }
      this.alertSvc.showToast(text,"danger")
    }

    // Si il n'y a aucune erreur on soumet le formulaire
    if(errors.length == 0 && this.mouvementCasier.valid){
        this.ravitaillementSvc.getProduitRavitailler().num_facture = this.mouvementCasier.value.num_facture;
        this.ravitaillementSvc.getProduitRavitailler().montant_verse = this.mouvementCasier.value.montant_verse;
        this.ravitaillementSvc.getProduitRavitailler().nbre_casier_plein_entree = notEmpty(this.mouvementCasier.value.nbreCasierPleinEntree);
        this.ravitaillementSvc.getProduitRavitailler().nbre_casier_plein_sortie = notEmpty(this.mouvementCasier.value.nbreCasierPleinSortie);

        
        this.ravitaillementSvc.getProduitRavitailler().nbre_casier_sup_sortie = notEmpty(this.mouvementCasier.value.nbreCasierSuppSortie);

        // if casier supp is check => casier supp equal to 1
        this.ravitaillementSvc.getProduitRavitailler().nbre_casier_sup_entree = notEmpty(this.mouvementCasier.value.nbreCasierSuppEntree);

        this.ravitaillementSvc.getProduitRavitailler().nbre_bouteille_sup_entree = this.bouteilleSuplementaireEntree;
        this.ravitaillementSvc.getProduitRavitailler().nbre_bouteille_sup_sortie = this.bouteilleSuplementaireSortie;

        this.router.navigateByUrl("/ravitaillement/recapitulatif")
    }

    console.log(this.ravitaillementSvc.getProduitRavitailler());
  }

}


