import { Router} from '@angular/router';
/* eslint-disable no-underscore-dangle */
import { LigneDepense } from './../../../models/ligne_depense';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { PointVente } from '../../../models/PointVente';
import { Depense } from './../../../models/depense';
import { CrudService } from './../../../services/crud.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TypeDepensePage } from 'src/app/modal/type-depense/type-depense.page';
import { markFormGroupTouched, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';

@Component({
  selector: 'app-add-edit-depense',
  templateUrl: './add-edit-depense.page.html',
  styleUrls: ['./add-edit-depense.page.scss'],
})
export class AddEditDepensePage implements OnInit {

  allPointVentes: PointVente[] = [];
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  @ViewChild(IonModal) modal: IonModal;
  allDepenses: Depense[] = [];
  action = 'Ajouter';
  id: number ;
  ligneDepenseForm: FormGroup;
  ptVente: PointVente = null;
  currentDepense: Depense = null;
  currentLigneDepense: LigneDepense;

  public errorMessages = {
    motif : [
      {type : 'required', message : ''},
    ],
    nom : [
      {type : 'required', message : ''},
    ],
    pointVente : [
      {type : 'required', message : ''},
    ],
    montant : [
      {type : 'required', message : ''},
    ]
  };
   constructor(
    private formBuilder: FormBuilder,
    private currentRoute: ActivatedRoute,
    private crudService: CrudService,
    public modalController: ModalController,
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

    // const currentLigneDepenseObj =
    // this.currentLigneDepense = history.state;
    const currentLigneDepenseObj = history.state;
    this.currentLigneDepense = new LigneDepense(1,undefined,undefined, undefined);

    const currentLigneDepenseKeys = Object.keys(currentLigneDepenseObj).filter(key => (key !== 'navigationId' ));
    currentLigneDepenseKeys.forEach(key => this.currentLigneDepense[`${key}`] = currentLigneDepenseObj[`${key}`]);

    this.ptVente = this.currentLigneDepense.pointVente??null;
    this.currentDepense = this.currentLigneDepense.nom??null;

    this.initForm(this.currentLigneDepense);

  }

   async ionViewWillEnter(){

      // eslint-disable-next-line no-underscore-dangle
      this._getSelectedPtVente();
      this._getSelectedDepense();

  }

  async presentModal(event: Event) {
    event.preventDefault();
    const modal = await this.modalController.create({
      component: TypeDepensePage,
      mode: 'ios',
      cssClass: ''
    });
    return await modal.present();
  }

  goToTypeDepense(){
    this.router.navigate(['/type-depense']);
  }

  initForm(data){
    let motif = '';
    let pointVente: any= '';
    let montant = 0;
    let nom = '';
    let date = new Date().toISOString();

    if(Object.values(data).filter(Boolean).length > 2) {
      this.action = 'Modifier';
      [motif, nom, pointVente, montant, date] = [data.motif, data.nom, '', data.montant, data.date];
    }

    this.ligneDepenseForm  = this.formBuilder.group({
      motif : [motif , [Validators.required]],
      nom: [nom, [Validators.required]],
      montant : [montant , [Validators.required, Validators.min(0)]],
      // pointVente:  [pointVente , [Validators.required]]
      pointVente:  [pointVente , [Validators.required]],
      date:  [date , [Validators.required]],
    });
  }

  submitForm() {


    if(markFormGroupTouched(this.ligneDepenseForm)){

      if(this.action === 'Ajouter') {

        const ligneDepense = new LigneDepense(
          1,
          this.ligneDepenseForm.value.montant,
          this.ptVente,
          this.currentDepense,
          this.ligneDepenseForm.value.motif
        );
        this.crudService.create(ligneDepense).then((_v) => {console.log('Enregistrement réussi !');this.router.navigate(['/ligne-depenses']);}, (_e) => {
          console.log(_e);
          showToast(ErrorMsg.create);
          this.router.navigate(['/ligne-depenses']);
        });
      }else {

        Object.keys(this.ligneDepenseForm.value).filter(key => (key !== 'depense')).forEach(key => {
          console.log(`${key}`);
          this.currentLigneDepense[`${key}`] = this.ligneDepenseForm.value[`${key}`];
        });

        this.crudService.update(this.currentLigneDepense).then((_v) => {console.log('Enregistrement réussi !');
        this.router.navigate(['/ligne-depenses']);
      }, (_e) => {
        showToast(ErrorMsg.update);});
     }

    }else {
      showToast();
    }

  }

  get motif(){
    return this.ligneDepenseForm.get('motif');
  }

  get pointVente(){
    return this.ligneDepenseForm.get('pointVente');
  }

  get nom(){
    return this.ligneDepenseForm.get('nom');
  }

  get description(){
    return this.ligneDepenseForm.get('description');
  }

  get montant(){
    return this.ligneDepenseForm.get('montant');
  }

  compareWith(o1: PointVente, o2: PointVente) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  private async _getSelectedPtVente()
  {
    this.allPointVentes = await this.crudService.read('pointvente');
    this.allPointVentes = this.allPointVentes??[];
    this.allPointVentes = this.allPointVentes.filter(Boolean);

    const ID_COLUMN_ARR = this.allPointVentes.reduce((columnArr: string[], currentLineObj: PointVente) => {
      columnArr.push(`${currentLineObj.id}`);
      return columnArr;
    }, []);

    const CURRENT_ITEM_IDX = (this.ptVente)?(ID_COLUMN_ARR.indexOf(`${this.ptVente.id}`)):0;
  console.log(this.ptVente);
    this.ptVente = this.allPointVentes[CURRENT_ITEM_IDX];
  }

  //allDepenses

  private async _getSelectedDepense()
  {
    this.allDepenses = await this.crudService.read('depense');
    this.allDepenses = this.allDepenses??[];
    this.allDepenses = this.allDepenses.filter(Boolean);

    const ID_COLUMN_ARR = this.allDepenses.reduce((columnArr: string[], currentLineObj: Depense) => {
      columnArr.push(`${currentLineObj.id}`);
      return columnArr;
    }, []);

    const CURRENT_ITEM_IDX = (this.currentDepense)?(ID_COLUMN_ARR.indexOf(`${this.currentDepense.id}`)):0;
    this.currentDepense = this.allDepenses[CURRENT_ITEM_IDX];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}


