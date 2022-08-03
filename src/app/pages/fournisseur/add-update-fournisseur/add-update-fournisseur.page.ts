import { Fournisseur } from 'src/app/models/fournisseur';
import { getUrlParams, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-add-update-fournisseur',
  templateUrl: './add-update-fournisseur.page.html',
  styleUrls: ['./add-update-fournisseur.page.scss'],
})
export class AddUpdateFournisseurPage implements OnInit {

  fournisseurForm;
  fournisseur;
  id : number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storageSvc : CrudService,
    private router: Router
    ) { 
      this.initForm();
      
      Object.keys(this.errorMessages).forEach(element => {

        this.errorMessages[`${element}`].forEach(element2 => {

          var type = element2.type;console.log(ErrorMsg);
          element2.message += ErrorMsg[type];
        });
        
      });
  }

  ionViewWillEnter(){
    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    console.log(this.id)
    let fournisseur = new Fournisseur();
    if(this.id){
      this.storageSvc.getById(fournisseur,this.id).then((fournisseur:Fournisseur) => {
        if(fournisseur){
          this.fournisseur = fournisseur;
          console.log(this.fournisseur);
        }
        this.initForm();
      })
    }
  }



  initForm(){
   
    if(this.id){
      
      this.fournisseurForm = this.formBuilder.group({
        nom: [this.fournisseur.nom, [Validators.required, Validators.minLength(3)]],
        adresse: [this.fournisseur.adresse],
        phone1: [this.fournisseur.phone1, []],
        collecte_ristourne: [this.fournisseur.collecte_ristourne],
        phone2: [this.fournisseur.phone2, []]
      })
    }else{
      this.fournisseurForm = this.formBuilder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        adresse: ['',],
        phone1: [''],
        collecte_ristourne: [false],
        phone2: [''],
      })
    }
    
  }

  resetForm(){
    this.fournisseurForm = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      adresse: ['',],
      phone1: [''],
      collecte_ristourne: [true],
      phone2: [''],
    })
  }
  

  public errorMessages = {
    nom : [
      {type : 'minlength', message : '3 '},
      {type : 'required', message : ''},
    ]
  };

  get nom(){
    return this.fournisseurForm.get('nom');
  }

  get adresse(){
    return this.fournisseurForm.get('adresse');
  }

  get phone1(){
    return this.fournisseurForm.get('phone1');
  }

  get phone2(){
    return this.fournisseurForm.get('phone2');
  }

  get collecte_ristourne(){
    return this.fournisseurForm.get('collecte_ristourne');
  }

  ngOnInit() {
  }

  

  logForm(){
    

    if(markFormGroupTouched(this.fournisseurForm)){
      if(!this.id){
        let fournisseur : Fournisseur = new Fournisseur(
          null,
          this.fournisseurForm.value.nom,
          this.fournisseurForm.value.adresse,
          this.fournisseurForm.value.phone1,
          this.fournisseurForm.value.phone2,
          this.fournisseurForm.value.collecte_ristourne,
        )
        // the action is addElement
        
        this.storageSvc.create(fournisseur).then(val =>{
          // this.router.navigateByUrl("/point-vente");
          this.router.navigateByUrl("/fournisseur");
          console.log(val);
          this.resetForm();
          showToast("Fournisseur créer");
        
        },(e) => {
          console.log(e);
          showToast(ErrorMsg.create);
        });
  
      }else{
        let fournisseur : Fournisseur = new Fournisseur(
          this.id,
          this.fournisseurForm.value.nom,
          this.fournisseurForm.value.adresse,
          this.fournisseurForm.value.phone1,
          this.fournisseurForm.value.phone2,
          this.fournisseurForm.value.collecte_ristourne,
        )
        // the action is UpdateElement
        console.log(fournisseur);
        
        this.storageSvc.update(fournisseur).then(val =>{
          showToast("Modification reussie");
          this.router.navigateByUrl("/fournisseur");
          this.resetForm();
  
        },(e) => {
          console.log(e);
          showToast(ErrorMsg.update);
        });
      }
    }else {
      showToast();
    }

  }

}
