import { Component, OnInit } from '@angular/core';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Depense } from 'src/app/models/depense';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-categorie-depense',
  templateUrl: './categorie-depense.page.html',
  styleUrls: ['./categorie-depense.page.scss'],
})
export class CategorieDepensePage implements OnInit {


  allCategorieDepenses: Depense[];
  constructor(
    public storageSvc: CrudService
  ) { }

  ngOnInit() {
    showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    this.storageSvc.read('depense')
      .then((allCategorieDepenses: Depense[]) =>{
        if(allCategorieDepenses){
          console.log(allCategorieDepenses)
          this.allCategorieDepenses = allCategorieDepenses.filter(n => n);  
        }
    },(e)=> {console.log(e); showToast(ErrorMsg.loading+ 'catégories de dépense')});
  }

  deleteItem(item:Depense){
    // for casting item var to type Casier
    let itemCast = castObject(item,new Depense(null,null))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    }).catch(e => {
      console.log(e);
      showToast(ErrorMsg.delete);
    });
  }


}
