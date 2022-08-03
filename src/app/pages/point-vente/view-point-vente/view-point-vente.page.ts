import { getUrlParams } from 'src/app/lib/FonctionUsuelle';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { PointVente } from 'src/app/models/PointVente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-point-vente',
  templateUrl: './view-point-vente.page.html',
  styleUrls: ['./view-point-vente.page.scss'],
})
export class ViewPointVentePage implements OnInit {
  id:number;
  pointvente: PointVente
  constructor(
    public crudSvc: CrudService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(
  ) {
    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    this.crudSvc.getById(new PointVente(null,'','',''), this.id).then((val:PointVente) =>{
      this.pointvente = val;
    },(e)=>console.log(e));
  }

}
