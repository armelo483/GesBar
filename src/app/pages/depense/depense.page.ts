import { Daddy } from './../../models/daddyObj';
import { LigneDepense } from './../../models/ligne_depense';
import { Router, ActivatedRoute } from '@angular/router';
import { Depense } from './../../models/depense';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeDepensePage } from 'src/app/modal/type-depense/type-depense.page';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.page.html',
  styleUrls: ['./depense.page.scss'],
})
export class DepensePage implements OnInit {

  item: any;
  allDepenses: Depense[] = [];
  ligneDepenses: LigneDepense[] = [];
  errorMessage: string;
  
  constructor(
    private crudService: CrudService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    public modalController: ModalController) { }

  ngOnInit() {
    showPreloader();
  }

  async ionViewWillEnter(){
    hidePreloader();
    this.crudService.readAndUpdatePropertiesObject('lignedepense').then(ligneDepenses => {
      // this.ligneDepenses = ligneDepenses.filter(Boolean).reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
      this.ligneDepenses = ligneDepenses;
    }
   );

   this.allDepenses = await this.crudService.read('depense');
  }

  updateItem(ligneDepense: LigneDepense) {
    this.router.navigateByUrl('ligne-depense/update', { state: ligneDepense });
  }

  unread(event: Event, ligneDepense: LigneDepense){
    event.stopPropagation();
    ligneDepense.constructor = LigneDepense;
    this.crudService.delete(ligneDepense);

  }

  async presentModalOrNot(){
    this.allDepenses = this.allDepenses??[];
    if(this.allDepenses.length){
     this.router.navigate(['/ligne-depense/add']);
    }else {
     this._presentModal();
    }
  }


  async _presentModal() {
    const modal = await this.modalController.create({
      component: TypeDepensePage,
      mode: 'ios',
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }


  load(){
    let tableName = 'lignedepense';
    this.crudService.readAndUpdatePropertiesObject(tableName)
      .then((ligneDepenses: LigneDepense[]) => {
        this.ligneDepenses = ligneDepenses?ligneDepenses.filter(Boolean):[];  
    },(e)=> {showToast(ErrorMsg.loading+' dépenses')});
  }

  deleteItem(item: LigneDepense){
    // for casting item var to type Fournisseur
    let itemCast = castObject(item,new LigneDepense(null))
    this.crudService.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }, (e)=> {console.log(e); showToast(ErrorMsg.delete)})
  }

  viewItem(item: LigneDepense){
    this.router.navigateByUrl("ligne-depense/view", {state:item});
  }

}
