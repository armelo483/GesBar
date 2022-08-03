import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUrlParams } from 'src/app/lib/FonctionUsuelle';
import { Depense } from 'src/app/models/depense';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-view-categorie-depense',
  templateUrl: './view-categorie-depense.page.html',
  styleUrls: ['./view-categorie-depense.page.scss'],
})
export class ViewCategorieDepensePage implements OnInit {

  id:number;
  categorieDepense: Depense

  constructor(
    public crudSvc: CrudService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    this.crudSvc.getById(new Depense(null,null), this.id).then((val:Depense) =>{
      this.categorieDepense = val;
    },(e)=>console.log(e));
  }

}
