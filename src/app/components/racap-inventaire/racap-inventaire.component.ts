import { Router } from '@angular/router';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { Inventaire, InventaireProduit } from './../../models/inventaire';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { InventaireService } from 'src/app/services/inventaire.service';
import { Ravitaillement } from 'src/app/models/ravitaillement';

@Component({
  selector: 'app-racap-inventaire',
  templateUrl: './racap-inventaire.component.html',
  styleUrls: ['./racap-inventaire.component.scss'],
})
export class RacapInventaireComponent implements OnInit {

  inventaire: Inventaire;
  constructor(
    public modalCtrl: ModalController,
    public router: Router,
    public inventaireSvc: InventaireService,
    public ravitaillementSvc: RavitaillementService) { }

  ngOnInit() {
    this.inventaire = this.inventaireSvc.getInventaire();
  }

  sommeLigneInventaire(inventaire:InventaireProduit){
    return Math.ceil(inventaire.qte * inventaire.prixV / inventaire.nbreBtleParCasier)
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async addReste(){
    if(this.inventaireSvc.getInventaire().restes.length != 0 && this.inventaireSvc.getInventaire().ventes.length != 0){
        // setTimeout(()=>{
          this.inventaireSvc.addInventaire();
        // },2000)
        console.log('add inventaire');

        let beginDate: number = this.inventaireSvc.getInventaire().dateDebut;
        let endDate: number = this.inventaireSvc.getInventaire().dateFin;
        let ravitaillements: Ravitaillement[] = await this.ravitaillementSvc.getRavitaillement(beginDate,endDate);

        ravitaillements = ravitaillements.filter(Boolean);
        console.log(ravitaillements);
        
        if(ravitaillements.length != 0){

          for(const rav of ravitaillements){

            await this.ravitaillementSvc.lockLigneRavitaillement(rav); 
            
          }
          this.dismiss();
          this.router.navigateByUrl("/inventaire/list-inventaire");

          // ravitaillements.forEach((rav)=>{
          //   this.ravitaillementSvc.lockLigneRavitaillement(rav).then((r)=>console.log(r));
            
          //   this.dismiss();
          //   this.router.navigateByUrl("/inventaire/list-inventaire");
              

          // })

        }
        
      }
  }

}
