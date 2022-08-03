import { Router } from '@angular/router';
import { CategorieProduit } from 'src/app/models/CategorieProduit';
import { CrudService } from 'src/app/services/crud.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Produit } from 'src/app/models/produit';
import { castObject, showToast } from 'src/app/lib/FonctionUsuelle';
import { ViewController } from '@ionic/core';


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],
})
export class ProduitsComponent implements OnInit{

  @Input() produits: Produit[];
  @Output() loadEvent = new EventEmitter<string>();
  categorieProduit: CategorieProduit[];
  state = false;

  closeFab(){
    this.state = false;
  }

  constructor(public crudSvc: CrudService,public router: Router) {
    
  }

  haveProduct(id: number){
    let result = this.produits.filter(e =>e?.categorie.id == id)
    return result.length ? true : false;
  }

  ngOnInit(){
    this.crudSvc.read(new CategorieProduit().constructor.name.toLowerCase().trim())
      .then((val:CategorieProduit[])=>{
        if(val){
          this.categorieProduit = val.filter(Boolean);
          // console.log(this.categorieProduit)
        }
    });
  }

  delete(item:Produit){
    // for casting item var to type Casier
    let itemCast = castObject(item,new Produit())
    this.crudSvc.delete(itemCast).then((val) =>{
      showToast("Suppression effectuée")
      this.loadEvent.emit('load');
    })
  }

  view(item: Produit){
    this.router.navigateByUrl("/produit/view",{state:item});
  }
  update(item: Produit){
    console.log(item);
    
    this.router.navigateByUrl("/produit/update",{state:item});
  }

 

}
