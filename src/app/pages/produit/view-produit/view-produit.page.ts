import { Produit } from 'src/app/models/produit';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-produit',
  templateUrl: './view-produit.page.html',
  styleUrls: ['./view-produit.page.scss'],
})
export class ViewProduitPage implements OnInit {

  produit : Produit;
  constructor(public router: Router) { }

  ngOnInit() {
    let state = history.state;
    delete state.navigationId.id;
    this.produit = state;
  }

  updateItem(item: Produit){
    this.router.navigateByUrl("produit/update",{state:item});
  }

}
