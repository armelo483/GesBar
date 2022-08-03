import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Depense } from 'src/app/models/depense';
import { getUrlParams, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { CrudService } from 'src/app/services/crud.service';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-add-update-categorie-depense',
  templateUrl: './add-update-categorie-depense.page.html',
  styleUrls: ['./add-update-categorie-depense.page.scss'],
})
export class AddUpdateCategorieDepensePage implements OnInit {


  ngOnInit() {
  }


  categorieDepenseForm;
  id : number;

  public errorMessages = {
    nom : [
      {type : 'minlength', message : '3 '},
      {type : 'required', message : ''},
    ],
    adresse : [
      {type : 'email', message : ''},
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
    this.categorieDepenseForm = this.formBuilder.group({
      nom: ["", [Validators.required]],
      description: [''],
    });

    if(this.id){
      let nullCategorieDepense = new Depense(null,null);
      this.storageSvc.getById(nullCategorieDepense,this.id).then((categorieDepense:Depense) => {
        this.categorieDepenseForm = this.formBuilder.group({
          nom: [categorieDepense.nom, [Validators.required, Validators.minLength(3)]],
          description: [categorieDepense.description]
        })
      })
    }

  }

  resetForm(){
    this.categorieDepenseForm = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      description: [""]
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
    return this.categorieDepenseForm.get('nom');
  }

  get description(){
    return this.categorieDepenseForm.get('description');
  }
  

  logForm(){
    
    if(markFormGroupTouched(this.categorieDepenseForm)){

    const categorieDepense : Depense = new Depense(
      this.categorieDepenseForm.value.nom,
      this.categorieDepenseForm.value.description,
    );

    if(!this.id){
      
      // the action is addElement
      
      this.storageSvc.create(categorieDepense).then(val =>{
        // this.router.navigateByUrl("/point-vente");
        this.router.navigateByUrl("/categorie-depense");
        console.log(val);
        this.resetForm();
        showToast("Point de vente créer");
      
      },(e) => {
        console.log(e);
        showToast(ErrorMsg.create);
      });

    }else{

      categorieDepense.id = this.id;
      // the action is UpdateElement
      console.log(categorieDepense);
      
      this.storageSvc.update(categorieDepense).then(val =>{
        showToast("Modification reussie");
        this.router.navigateByUrl("/categorie-depense");
        this.resetForm();

      },(e) => {
        console.log(e);
        showToast(ErrorMsg.update);
      });
    }
  }else{
    showToast();
  }
 }
}
