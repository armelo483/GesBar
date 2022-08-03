import { Casier } from './../../../models/casier';
import { getUrlParams, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-add-update-casier',
  templateUrl: './add-update-casier.page.html',
  styleUrls: ['./add-update-casier.page.scss'],
})
export class AddUpdateCasierPage implements OnInit {

  casierForm;
  id : number;
  errorMessages = {
    nom : [
      {type : 'minlength', message : `Au moins 3 `},
      {type : 'required', message : ``},
    ]
  };

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
      // this.id = getUrlParams('id', this.activatedRoute);
      // console.log(this.id)
  }


  initForm(){

    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    console.log(this.id);
    this.casierForm = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      nbreBtleParCasier: ['',Validators.min(0)],
      description: [''],
    })
    if(!this.id){
    }else{
      let casier = new Casier(null,null,"","");
      this.storageSvc.getById(casier,this.id).then((casier:Casier) => {
        this.casierForm = this.formBuilder.group({
          nom: [casier.nom, [Validators.required, Validators.minLength(3)]],
          description: [casier.description],
          nbreBtleParCasier: [casier.nbreBtleParCasier, []]
        })
      })
    }

  }

  resetForm(){
    this.casierForm = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      nbreBtleParCasier: ["", []]
    })
  }

  // load(){
  //   const id = getUrlParams('id', this.activatedRoute);
  //   this.storageSvc.getItemById(new PointVente("","",""), id).then((pointvente: PointVente) =>{
  //     this.pointVenteForm = this.formBuilder.group({
  //       nom: [pointvente.nom, [Validators.required, Validators.minLength(3)]],
  //       description: [pointvente.description],
  //       adresse: [pointvente.adresse, [Validators.email]]
  //     })
  //   })
  // }


  get nom(){
    return this.casierForm.get('nom');
  }

  get description(){
    return this.casierForm.get('description');
  }

  get nbreBtleParCasier(){
    return this.casierForm.get('nbreBtleParCasier');
  }

  ngOnInit() {
  }

  

  logForm(){
    
    if(markFormGroupTouched(this.casierForm)){
    
    if(!this.id){
      let pointVente : Casier = new Casier(
        null,
        this.casierForm.value.nbreBtleParCasier,
        this.casierForm.value.nom,
        this.casierForm.value.description,
      )
      // the action is addElement
      
      this.storageSvc.create(pointVente).then(val =>{
        // this.router.navigateByUrl("/point-vente");
        this.router.navigateByUrl("/casier");
        console.log(val);
        this.resetForm();
        showToast("Point de vente crée");
      
      },(e) => {
        console.log(e);
        showToast(ErrorMsg.create);
      });

    }else{
      let pointVente : Casier = new Casier(
        this.id,
        this.casierForm.value.nbreBtleParCasier,
        this.casierForm.value.nom,
        this.casierForm.value.description,
      )
      // the action is UpdateElement
      console.log(pointVente);
      
      this.storageSvc.update(pointVente).then(val =>{
        showToast("Modification reussie");
        this.router.navigateByUrl("/casier");
        this.resetForm();

      },(e) => {
        console.log(e);
        showToast(ErrorMsg.update);
      });
    }}else{
      showToast();
    }
  }

}
