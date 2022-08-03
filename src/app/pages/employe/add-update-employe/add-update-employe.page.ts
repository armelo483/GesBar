import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getUrlParams, markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Employe } from 'src/app/models/employe';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-update-employe',
  templateUrl: './add-update-employe.page.html',
  styleUrls: ['./add-update-employe.page.scss'],
})
export class AddUpdateEmployePage implements OnInit {

   errorMessages = {
    nom : [
      {type : 'minlength', message : '3 '},
      {type : 'required', message : ''},
    ],
    cni : [
      {type : 'required', message : ''},
    ],
    phone1 : [
      {type : 'required', message : ''},
    ],
    adresse : [
      {type : 'email', message : ''},
    ]
  };
    ngOnInit() {
    }
  
    //   public adresse?: string,
    //   public phone1?: string,
    //   public cni?: string,
    //   public photo?: string,
  
    employeForm;
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
  
            var type = element2.type;
            element2.message += ErrorMsg[type];
          });
          
        });

    }
  
  
  
    initForm(){
  
      this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
      this.employeForm = this.formBuilder.group({
        nom: ["", [Validators.required]],
        cni: ["", [Validators.required]],
        phone1: ["", [Validators.required]],
        adresse: ["", [Validators.required]],
      });
  
      if(this.id){
        let nullEmploye = new Employe(null, null,null,null);
        this.storageSvc.getById(nullEmploye,this.id).then((employe: Employe) => {
          this.employeForm = this.formBuilder.group({
            nom: [employe.nom, [Validators.required]],
            cni: [employe.cni, [Validators.required]],
            phone1: [employe.phone1, [Validators.required]],
            adresse: [employe.adresse, [Validators.required]]
          })
        })
      }
  
    }
  
    resetForm(){
      this.employeForm = this.formBuilder.group({
        nom: ["", [Validators.required, Validators.minLength(3)]],
        cni: ["", [Validators.required]],
        phone1: ["", [Validators.required]],
        adresse: ["", [Validators.required]]
      });
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
  

  
    get adresse(){
      return this.employeForm.get('adresse');
    }
    get phone1(){
      return this.employeForm.get('phone1');
    }
    get nom(){
      return this.employeForm.get('nom');
    }
  
    get cni(){
      return this.employeForm.get('cni');
    }
    
  
    logForm(){
      
      if(markFormGroupTouched(this.employeForm)){
  
      const employe : Employe = new Employe(
        this.employeForm.value.nom,
        this.employeForm.value.cni,
        this.employeForm.value.adresse,
        this.employeForm.value.phone1,
      );
  
      if(!this.id){
        
        // the action is addElement
        
        this.storageSvc.create(employe).then(val =>{
          // this.router.navigateByUrl("/point-vente");
          this.router.navigateByUrl("/employe");
          console.log(val);
          this.resetForm();
          showToast("Employé ajouté avec succès");
        
        },(e) => {
          console.log(e);
          showToast(ErrorMsg.create);
        });
  
      }else{
  
        employe.id = this.id;
        
        this.storageSvc.update(employe).then(val =>{
          showToast("Modification reussie");
          this.router.navigateByUrl("/employe");
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
  

