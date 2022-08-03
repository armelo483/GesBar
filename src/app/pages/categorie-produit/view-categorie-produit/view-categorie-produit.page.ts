import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-categorie-produit',
  templateUrl: './view-categorie-produit.page.html',
  styleUrls: ['./view-categorie-produit.page.scss'],
})
export class ViewCategorieProduitPage implements OnInit {

  categorieProduit: CategorieProduit;
  constructor(
    private router: Router) { }

  ngOnInit() {
    let state = history.state;
    delete state.navigationId;
    this.categorieProduit = state;
    console.log(this.categorieProduit)
  }

  updateItem(item: CategorieProduit){
    this.router.navigateByUrl("categorie-produit/add-update-categorie-produit",{state:item});
  }

}