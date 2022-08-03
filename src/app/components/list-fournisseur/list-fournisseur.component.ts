import { Fournisseur } from 'src/app/models/fournisseur';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss'],
})
export class ListFournisseurComponent implements OnInit {
  
  @Output() alertChoiceEvent = new EventEmitter(null);
  fournisseurs:Fournisseur[];
  constructor(
    public alertController: AlertController,
    public router: Router,
    public navCtrl: NavController,
    public crudSvc: CrudService,
    public ravitaillementSvc: RavitaillementService
  ) { 
    console.log('je suis la');
    
  }

  ngOnInit() {
    
    this.crudSvc.read(new Fournisseur().constructor.name.toLowerCase().trim())
      .then((fournisseurs:Fournisseur[]) => {
        console.log(fournisseurs)
        if(fournisseurs){
          this.fournisseurs = fournisseurs.filter(Boolean);
        }
    })
  }

  async presentAlertConfirm(f:Fournisseur) {
    const alert = await this.alertController.create({
      cssClass: 'alert-photo',
      header: 'Ajouter une photo?',
      message: '<note>Vous pouvez ajouter une facture</note>',
      buttons: [
        {
          text: 'NON',
          cssClass: 'photo-secondary',
          handler: (blah) => {
            this.ravitaillementSvc.getProduitRavitailler().fournisseur = {id: f.id, nom: f.nom};
            this.alertChoiceEvent.emit({fournisseur : f, state: false});
          }
        },
        {
          text: 'OUI',
          handler: () => {
            this.ravitaillementSvc.getProduitRavitailler().fournisseur = {id: f.id, nom: f.nom};
            console.log(this.ravitaillementSvc.getProduitRavitailler());
            this.alertChoiceEvent.emit({prod:f, state: true});
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  goto(p:Fournisseur){
    // this.router.navigateByUrl("list_produit_ravitailler", {state: p})
    this.navCtrl.navigateForward("list_produit_ravitailler", {state: p})
  }

}
