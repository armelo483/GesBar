import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Avarie } from 'src/app/models/avarie';
import { Produit } from 'src/app/models/produit';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-add-update-avarie',
  templateUrl: './add-update-avarie.page.html',
  styleUrls: ['./add-update-avarie.page.scss'],
})
export class AddUpdateAvariePage implements OnInit {
  avarieForm;
  avarie : any;
  action: string;
  product: any;
  produits: Produit[];

  public errorMessages = {
    qte : [
      {type : 'required', message : ``},
    ],
    produit : [
      {type : 'required', message : ``},
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private crudSvc : CrudService,
    private router: Router
    ) { 
      Object.keys(this.errorMessages).forEach(element => {

        this.errorMessages[`${element}`].forEach(element2 => {

          var type = element2.type;
          element2.message += ErrorMsg[type];
        });
        
      });
  }

  ngOnInit() {

    let state = history.state;
    
    delete state.navigationId;
    this.avarie = state;
    console.log("this.avarie");
    console.log(this.avarie);
    this.loadForm(this.avarie);

  }


  logForm(){


   if(markFormGroupTouched(this.avarieForm)){
    if(!this.avarie.id){
      let _avarie : Avarie = new Avarie(
        this.avarieForm.value.qte,
        this.avarieForm.value.description,  
        this.avarieForm.value.produit,
      )
      // the action is addElement
      
      this.crudSvc.create(_avarie).then(val =>{
        // this.router.navigateByUrl("/point-vente");
        this.router.navigateByUrl("/avarie");
        console.log(val)
        showToast("Avarie créé");
        // this.loadForm(this.avarie);
      },(e) => {
        console.log(e);
        showToast(ErrorMsg.create);
      });

    }else{
      
      let _avarie : Avarie = new Avarie(
        this.avarie.qte,
        this.avarieForm.value.description,
        this.avarieForm.value.produit
      )
       console.log(this.avarie);
      _avarie.id = this.avarie.id;
      this.crudSvc.update(_avarie).then(val =>{
        showToast("Modification reussie");
        console.log(val);
        this.router.navigateByUrl("/avarie");
        // this.loadForm(this.avarie);
      }).catch(e => {
        console.log(e);
        showToast(ErrorMsg.update)
      });
    }
   }else {
     showToast();
   }
  }

  get qte(){
    return this.avarieForm.get('qte');
  }

  get description(){
    return this.avarieForm.get('description');
  }

  loadForm(avarie: any){
    // public qte: number = null,
    //   public description: string = null,
    //   public produit: Produit = null,
    //   public date?: Date
    if(avarie.id){
      this.action = "modifier";
      this.product = avarie.produit;
      this.avarieForm = this.formBuilder.group({
        qte: [avarie.qte, [Validators.required, Validators.min(0)]],
        produit: [avarie.produit, [Validators.required]],
        description: [avarie.description],
      })
    }else{
      this.action = "ajouter";

      this.avarieForm = this.formBuilder.group({
        qte: ["", [Validators.required, Validators.min(0)]],
        produit: [avarie.produit, [Validators.required]],
        description: [''],
      })
    }
  }


  ionViewWillEnter(){
    
    this.crudSvc.read('produit').then((val:Produit[])=>{
      if(val){
        this.produits = val.filter(Boolean);
        this._getSelectedProduct(this.produits);
      }
    });
  }

  compareWith(o1: Produit, o2: Produit) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  private async _getSelectedProduct(allProducts)
  {
    const ID_COLUMN_ARR = allProducts.reduce((columnArr: string[], currentLineObj: Produit) => {
      columnArr.push(`${currentLineObj.id}`);
      return columnArr;
    }, []);

    const CURRENT_ITEM_IDX = (this.product)?(ID_COLUMN_ARR.indexOf(`${this.product.id}`)):0;

    this.product = allProducts[CURRENT_ITEM_IDX];
  }
  
}
