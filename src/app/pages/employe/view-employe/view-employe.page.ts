import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUrlParams } from 'src/app/lib/FonctionUsuelle';
import { Employe } from 'src/app/models/employe';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-view-employe',
  templateUrl: './view-employe.page.html',
  styleUrls: ['./view-employe.page.scss'],
})
export class ViewEmployePage implements OnInit {

  id:number;
  employe: Employe

  constructor(
    public crudSvc: CrudService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
    this.id = (getUrlParams('id', this.activatedRoute))? parseInt(getUrlParams('id', this.activatedRoute)):null;
    this.crudSvc.getById(new Employe(null,null, null, null), this.id).then((val:Employe) =>{
      this.employe = val;
      console.log(this.employe);
    },(e)=>console.log(e));
  }

}
