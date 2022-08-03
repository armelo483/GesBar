import { getUrlParams } from 'src/app/lib/FonctionUsuelle';
import { Casier } from './../../../models/casier';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-casier',
  templateUrl: './view-casier.page.html',
  styleUrls: ['./view-casier.page.scss'],
})
export class ViewCasierPage implements OnInit {

  id:number;
  casier: Casier
  constructor(
    public crudSvc: CrudService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    this.crudSvc.getById(new Casier(null,null,'',''), this.id).then((val:Casier) =>{
      this.casier = val;
    },(e)=>console.log(e));
  }

}
