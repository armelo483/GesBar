import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getUrlParams, initializeErrorMessages, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { Daddy } from 'src/app/models/daddyObj';
import { PointVente } from 'src/app/models/PointVente';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-point-vente',
  templateUrl: './add-update-point-vente.page.html',
  styleUrls: ['./add-update-point-vente.page.scss'],
})
export class AddUpdatePointVentePage implements OnInit {

  
  pointVenteForm;
  id : number;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private storageSvc : CrudService,
    private router: Router
    ) { 
      this.initForm();
      
      // this.id = getUrlParams('id', this.activatedRoute);
      // console.log(this.id)
  }


  ionViewWillEnter(){
    initializeErrorMessages(this.errorMessages);
  }

  initForm(){

    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    console.log(this.id);
    this.pointVenteForm = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      description: [''],
      adresse: ['', []]
    })
    if(!this.id){
    }else{
      let pointVente = new PointVente(null,"","","");
      this.storageSvc.getById(pointVente,this.id).then((pointVente:PointVente) => {
        this.pointVenteForm = this.formBuilder.group({
          nom: [pointVente.nom, [Validators.required, Validators.minLength(3)]],
          description: [pointVente.description],
          adresse: [pointVente.adresse, []]
        })
      })
    }

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

  public errorMessages = {
    nom : [
      {type : 'minlength', message : '3 '}
    ]
  };

  get nom(){
    return this.pointVenteForm.get('nom');
  }

  get description(){
    return this.pointVenteForm.get('description');
  }

  get adresse(){
    return this.pointVenteForm.get('adresse');
  }

  ngOnInit() {
  }

  

  logForm(){
    if(markFormGroupTouched(this.pointVenteForm)){

      if(!this.id){
        let pointVente : PointVente = new PointVente(
          null,
          this.pointVenteForm.value.nom,
          this.pointVenteForm.value.description,
          this.pointVenteForm.value.adresse,
        )
        // the action is addElement
        
        this.storageSvc.create(pointVente).then(val =>{
          // this.router.navigateByUrl("/point-vente");
          this.router.navigateByUrl("/point-vente");
          console.log(val)
          showToast("Point de vente créée");
        
        },(e) => {
          console.log(e);
          showToast(ErrorMsg.create);
        });
  
      }else{
        let pointVente : PointVente = new PointVente(
          this.id,
          this.pointVenteForm.value.nom,
          this.pointVenteForm.value.description,
          this.pointVenteForm.value.adresse,
        )
        // the action is UpdateElement
        console.log(pointVente);
        
        this.storageSvc.update(pointVente).then(val =>{
          showToast("Modification reussie");
          this.router.navigateByUrl("/point-vente");
        }).catch(e => {
          console.log(e);
          showToast(ErrorMsg.update)
        });
      }
    }else{showToast()}
    
  }

}
