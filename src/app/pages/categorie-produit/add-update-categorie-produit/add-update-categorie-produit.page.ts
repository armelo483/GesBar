import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from './../../../services/crud.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-add-update-categorie-produit',
  templateUrl: './add-update-categorie-produit.page.html',
  styleUrls: ['./add-update-categorie-produit.page.scss'],
})
export class AddUpdateCategorieProduitPage implements OnInit {
  
  categorieProduitForm;
  categorieProduit : any;
  action: string;
  errorMessages = {
    nom : [
      {type : 'minlength', message : `Au moins 3 `},
      {type : 'required', message : ``},
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private storageSvc : CrudService,
    private router: Router
    ) { 

      Object.keys(this.errorMessages).forEach(element => {

        this.errorMessages[`${element}`].forEach(element2 => {

          var type = element2.type;console.log(ErrorMsg);
          element2.message += ErrorMsg[type];
        });
        
      });
  }

  ngOnInit() {
    
    let state = history.state;
    
    let toto: CategorieProduit = state;
    
    delete state.navigationId;
    console.log(state);
    this.categorieProduit = state;
    // console.log(this.categorieProduit)
    this.loadForm(this.categorieProduit);

  }


  logForm(){

    if(markFormGroupTouched(this.categorieProduitForm)){

      if(!this.categorieProduit.id){
        console.log('je suis add');
        let _categorieProduit : CategorieProduit = new CategorieProduit(
          null,
          this.categorieProduitForm.value.nom,
          this.categorieProduitForm.value.description,
        )
        // the action is addElement
        
        this.storageSvc.create(_categorieProduit).then(val =>{
          // this.router.navigateByUrl("/point-vente");
          this.router.navigateByUrl("/categorie-produit");
          console.log(val)
          showToast("Catégorie produit créé");
          this.loadForm(this.categorieProduit);
        },(e) => {
          console.log(e);
          showToast(ErrorMsg.create);
        });
  
      }else{
        console.log('je suis update');
        
        let _categorieProduit : CategorieProduit = new CategorieProduit(
          this.categorieProduit.id,
          this.categorieProduitForm.value.nom,
          this.categorieProduitForm.value.description
        )
        // the action is UpdateElement
        console.log(_categorieProduit);
        
      //   p.then((valeur) => {
      //     // Promesse tenue
      //   }, (raison) => {
      //     // Rejet de la promesse
      // });


        this.storageSvc.update(_categorieProduit).then(val =>{
          showToast("Modification reussie");
          console.log(val);
          this.router.navigateByUrl("/categorie-produit");
          this.loadForm(this.categorieProduit);
        }).catch(e => {
          console.log(e);
          showToast("La modification a echoué!")
        });
      }
    }else {
      showToast();
    }
    
  }


  get nom(){
    return this.categorieProduitForm.get('nom');
  }

  get description(){
    return this.categorieProduitForm.get('description');
  }

  loadForm(categorieProduit: any){
    if(categorieProduit.id){
      this.action = "modifier";

      this.categorieProduitForm = this.formBuilder.group({
        nom: [categorieProduit.nom, [Validators.required, Validators.minLength(3)]],
        description: [categorieProduit.description],
      })
    }else{
      this.action = "ajouter";

      this.categorieProduitForm = this.formBuilder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        description: [''],
      })
    }
  }
}
