import { Inventaire } from './../../../models/inventaire';
import { Component, OnInit } from '@angular/core';
import { InventaireService } from 'src/app/services/inventaire.service';
import { showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-inventaire',
  templateUrl: './list-inventaire.page.html',
  styleUrls: ['./list-inventaire.page.scss'],
})
export class ListInventairePage implements OnInit {

  inventaire:Inventaire[];
  constructor(
    public inventaireSvc: InventaireService,
    public router: Router
  ) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.inventaireSvc.getAll().then((val:Inventaire[]) =>{
      if(val){ this.inventaire = val.filter(Boolean) }
    },(e)=> {showToast(ErrorMsg.loading+'inventaires')});
  }

  gotoDetail(i){
    this.router.navigateByUrl("/inventaire/view-inventaire", {state: i});
  }

}
