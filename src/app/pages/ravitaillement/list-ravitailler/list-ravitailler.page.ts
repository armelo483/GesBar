import { RavitaillementService } from 'src/app/services/ravitaillement.service';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { GestureController, IonItemSliding, ModalController, ToastController } from '@ionic/angular';
import { asc, castObject, desc, hidePreloader, showPreloader, showToast, toTimeStamp } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { CrudService } from 'src/app/services/crud.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-list-ravitailler',
  templateUrl: './list-ravitailler.page.html',
  styleUrls: ['./list-ravitailler.page.scss'],
})
export class ListRavitaillerPage implements OnInit {
  
  @ViewChildren(IonItemSliding, {read: ElementRef}) itemSlidings: QueryList<ElementRef>;

  // public get modalController(): ModalController {
  //   return this._modalController;
  // }
  // public set modalController(value: ModalController) {
  //   this._modalController = value;
  // }

  
  listeRavitaillements;
  todaytimestamp;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ravitaillementSvc: RavitaillementService,
    private _modalController: ModalController,
    private gestureCtrl: GestureController,
    public crudService: CrudService) { }

    ngOnInit(): void {
      this.cdr.detectChanges() ;
      console.log("list-ravitailler.page.ts");
      
    }

    ionViewWillEnter(){
      this.load();
    }

    deleteItem(item: Ravitaillement){
      // for casting item var to type Fournisseur
      let itemCast = castObject(item,new Ravitaillement())
      this.crudService.delete(itemCast).then((val) =>{
        this.load();
        showToast("Suppression effectuée")
      }, (e)=> {console.log(e); showToast(ErrorMsg.delete)})
    }

    load(){
      this.crudService.readAndUpdatePropertiesObject('ravitaillement').then(listeRavitaillements => {
        if(listeRavitaillements){
          let inter = listeRavitaillements.filter(Boolean);
          this.listeRavitaillements = asc(inter, 'id');
          console.log(this.listeRavitaillements);
          // this._updateRavitaillementStatus();
        }
      },(e)=> {showToast(ErrorMsg.loading+' ravitaillements')});
    }

    detailRavitaillement(ravitaillement){
      this.router.navigateByUrl('/ravitaillement/recapitulatif', {state: {ravitaillement: ravitaillement, action: "view"}});
    }
  
    updateRavitaillement(ravitaillement: Ravitaillement) {
      let canUpdate = true;
      if(canUpdate){
        this.router.navigateByUrl('ravitaillement/recapitulatif', {state: {ravitaillement: ravitaillement, action: "update"}});
      }
    }
  
    getRavitaillementTotal(produit: any){
      if( produit != undefined && produit.length != 0){
        return this.ravitaillementSvc.totalMontant(produit);
      }
      return 0;
    }

    formatDateString(date:string){
      return format(new Date(date).getTime(),"dd/MM/yy")
    }

  // ngAfterViewInit() {
  //   let itemSlidingArr = [];
  //   this.itemSlidings
  //     .changes
  //     .subscribe(a => {
  //       a.forEach((b, i) => 
  //       {itemSlidingArr[i] = b;});
  //       console.log(itemSlidingArr);
  //       this.useSwipe(itemSlidingArr);
  //     });     
  // }

  // useSwipe(itemSlidingArr){
    
  //   for (let i = 0; i<itemSlidingArr.length; i++){

  //     const itemSliding = itemSlidingArr[i];
  //     const gesture = this.gestureCtrl.create({
  //       el: itemSliding.nativeElement,
  //       gestureName: 'swipe',
  //       threshold: 0,
  //       onMove: (detail) => {},
  //       onStart: (detail) => {},
  //       onEnd: (detail) => { 
  //         if (this.listeRavitaillements[i].save){
  //           if (detail.deltaX < 0) {
  //             showToast("Désolé vous ne pouvez plus modifier cet element en raison du delai des 24 heures passées :(");
  //           }else if(detail.deltaX > 0) {      
  //             showToast("Désolé vous ne pouvez plus supprimer cet element en raison du delai des 24 heures passées :(");
  //           }
  //         }
  //        }
  
  //     });

  //     if (this.listeRavitaillements[i].save){
  //       gesture.enable(true);
  //     }
  //   }

  // }

  
  // private onSwipe(detail) {
  //   const type = detail.type;
  //   const currentX = detail.currentX;
  //   const deltaX = detail.deltaX;
  //   const velocityX = detail.velocityX;
  //   console.log('details');
  //   console.log(detail);
  // }

  // async ionViewWillEnter(){

  //   this.todaytimestamp = (this.todaytimestamp)??toTimeStamp(new Date().toUTCString(), false); 
  //   hidePreloader();
  //   this.load();
  // }

 


 


  // dismissModal() {
  //   this.modalController.dismiss({
  //     dismissed: true
  //   });
  // }

  // _updateRavitaillementStatus(){ 

  //   this.listeRavitaillements.forEach(
  //     ravitaillement => {
  //       if(!ravitaillement.save && (this.todaytimestamp - ravitaillement.date)>=86400){
  //         ravitaillement.save = true;
  //         ravitaillement =  castObject(ravitaillement,new Ravitaillement());
  //         this.crudService.update(ravitaillement);
  //       }
  //     }
  //   );
  // }

}
