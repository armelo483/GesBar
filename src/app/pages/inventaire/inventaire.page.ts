import { DATE_FORMAT } from './../../lib/globalVar';
import { format } from 'date-fns';
import { RacapInventaireComponent } from './../../components/racap-inventaire/racap-inventaire.component';
import { IonDatetime, ModalController } from '@ionic/angular';
import { convertForDateTime, generateRefFromId, hidePreloader, showPreloader, showToast, toDisplayDate, toTimeStamp } from 'src/app/lib/FonctionUsuelle';
import { Daddy } from 'src/app/models/daddyObj';
import { Ravitaillement } from './../../models/ravitaillement';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { dateConfig } from './../../models/dateConfig';
import { Inventaire, InventaireProduit } from './../../models/inventaire';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { InventaireService } from 'src/app/services/inventaire.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { ErrorMsg } from 'src/app/lib/globalVar';


const ID_PREMIER_ELEMENT = 0;

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.page.html',
  styleUrls: ['./inventaire.page.scss'],
})
export class InventairePage implements OnInit {
  @ViewChild(IonDatetime) ionDateTime: IonDatetime;

  dateConfig = dateConfig;
  // juste pour fixer la date courante comme date max du champ date
  today: number = new Date().getTime();
  // la date de fin du ravitaillement
  dateFin: number =  new Date().getTime();
  // variable courante des inventaires
  inventaire : Inventaire;

  loading:boolean = false;
  constructor(
    public ravitaillementSvc: RavitaillementService,
    public modalCtrl: ModalController,
    public AlertSvc: AlertService,
    public inventaireSvc: InventaireService,
    public crudSvc: CrudService) {
   }

   ionViewWillEnter(){
     hidePreloader();
   }

  ngOnInit() {
    showPreloader();

    let prod: InventaireProduit;
    this.inventaireSvc.getInventaire().restes = [];
    this.crudSvc.read("produit").then((val:Produit[])=>{
      if(val){
        let v = val.filter(Boolean);
        v.forEach(elt => {
            prod = {
              id : elt.id,
              nom: elt.nom,
              prixA: elt.prixA,
              prixV: elt.prixV,
              ristourne: elt.ristourne,
              nbreBtleParCasier: elt.casier.nbreBtleParCasier,
              qte: 0
            }
            this.inventaireSvc.getInventaire().restes.push(prod);
        });
      }
      console.log(this.inventaireSvc.getInventaire());
      
    },(e)=> showToast(ErrorMsg.loading+'inventaires'))
  }

  resetQuantite(tab:Array<InventaireProduit>){
    let v = tab.filter(Boolean);
    let prod : InventaireProduit;
    this.inventaireSvc.getInventaire().restes = [];
    v.forEach(elt => {
        prod = {
          id : elt.id,
          nom: elt.nom,
          prixA: elt.prixA,
          prixV: elt.prixV,
          ristourne: elt.ristourne,
          nbreBtleParCasier: elt.nbreBtleParCasier,
          qte: 0
        }
        this.inventaireSvc.getInventaire().restes.push(prod);
    });
    this.inventaireSvc.getInventaire().versement = 0;
  }

  keypress(val){
    if(isNaN(val.value)) return
    else if(val.value == "0" || val.value == 0) val.value="" ;
  }

  async addReste(){

    if(this.inventaireSvc.getInventaire().restes.length == 0){
      this.AlertSvc.showToast('Aucun produit configuré',"danger");
      return;
    }
    
    if(this.inventaireSvc.getInventaire().ventes.length != 0){
      this.inventaireSvc.getInventaire().ventes = [];
    }
    
    //Debut des inventaire
    let dateDebut :number;
    // tous les ravitaillement fait dans un interval de temps
    let ravitaillements: Ravitaillement[];
    // les reste tapé par l'utilisateur
    let restes: InventaireProduit[];
    // Reste ou stock restant lors du dernier inventaire
    let stock:InventaireProduit[]
    // liste des produits
    let produits: Daddy[];
    // montant total des ventes
    let total_vente: number = 0;
    //montant versé
    let versement: number ;

    // initialisation des variable lastDate et stock
    let lastInventaire = await this.getLastInventaire();


    if(lastInventaire){
      dateDebut = lastInventaire.dateFin;
      stock = lastInventaire.restes;
      this.inventaireSvc.getInventaire().reference = generateRefFromId(lastInventaire.id,"INV");
    }else{
      // si les inventaires n'existent pas on initialise la plus petite date qui est 0 
      dateDebut = null;
      stock = null;
      this.inventaireSvc.getInventaire().reference = generateRefFromId(ID_PREMIER_ELEMENT,"INV");
    }

    restes = this.inventaireSvc.getInventaire().restes;
    
    /// la variable produit doit être du type Produit mais parceque que l'expression suivante génère une 
    /// erreur nous l'avons mis du type Daddy (classe parente de Produit)
    produits = await this.crudSvc.read('produit');
    
    ravitaillements = await this.ravitaillementSvc.getRavitaillement(dateDebut, this.dateFin);
    
    console.log(ravitaillements);
    
    if(ravitaillements == undefined){
      showToast('Aucun ravitaillement trouvé');
      return;
    }
 
    console.log(produits);

    if(ravitaillements.length !== 0){
      produits.forEach((p:Produit,i) => {

        let som = 0;
        if(stock){
          let sto = stock.filter(prod => prod.id == p.id);
          if(sto.length != 0){
            som = sto[0].qte;
          }
        }
        ravitaillements.forEach(r =>{
          let rav = r.produits.filter(val => val.id == p.id);
          if(rav.length != 0){
            // console.log(rav);
            som += rav[0].qte
          }
          return;
        });
        let res = restes.filter(prod => prod.id == p.id);
        let v: InventaireProduit  =  {
          id : p.id,
          nom: p.nom,
          prixA: p.prixA,
          prixV: p.prixV,
          ristourne: p.ristourne,
          nbreBtleParCasier: p.casier.nbreBtleParCasier,
          qte: som - res[0].qte
        }
        total_vente += Math.ceil(v.qte * v.prixV / v.nbreBtleParCasier);
        this.inventaireSvc.getInventaire().ventes.push(v);  
      });

      // ajouter les ravitaillements concernés dans l'inventaire
      for(let rav of ravitaillements){
        this.inventaireSvc.getInventaire().ids_ravitaillement.push(rav.id);
      }
      this.inventaireSvc.getInventaire().total_vente = total_vente;
      this.inventaireSvc.getInventaire().dateFin = this.dateFin;
      this.inventaireSvc.getInventaire().dateDebut = dateDebut;

      console.log("la vente est :");
      
      console.log(this.inventaireSvc.getInventaire());

      this.openRecapInventaire();
    }else{
      this.AlertSvc.showToast('Pas de ravitaillement en cours',"danger");
      this.resetQuantite(restes);
    } 
  }

   // what i need 
  // 1- i need get ravitaillement by interval of date or by date
  // 
  // 2- I need product list
  // 3- I need vente list
  // 4- I need stock list name here by ravitaillement.reste
  // 5- I need reste take from form
  // 
  // I want to return vente array
  getLastInventaire(): Promise<Inventaire | null>{
    return this.crudSvc.read("inventaire").then((val:Inventaire[]) =>{
      if(val){
        let lastInventaire = val.pop();
        if(lastInventaire == undefined || lastInventaire == null){
            return null
        }
        return lastInventaire;
      }
      return null;
    })
 }

  async openRecapInventaire(){
      const modal = await this.modalCtrl.create({
        component : RacapInventaireComponent
      });

      return await modal.present();
  }
  addDepense(){}

  toTextDate(date:string){
    return toDisplayDate(date);
  }

  dateChanged(value){
      this.dateFin = toTimeStamp(value);
  }

  confirmDate(){
    this.ionDateTime.confirm(true);
  }

  closeDate(){
    this.ionDateTime.cancel(true);
  }

  toDatetimeFormat(date: number){
    return convertForDateTime(date);
  }


}