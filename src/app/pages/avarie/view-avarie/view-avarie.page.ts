import { Route } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Avarie } from 'src/app/models/avarie';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-view-avarie',
  templateUrl: './view-avarie.page.html',
  styleUrls: ['./view-avarie.page.scss'],
})
export class ViewAvariePage implements OnInit {

  avarie: Avarie;
  constructor(
    private router: Router) { }

  ngOnInit() {
    let state = history.state;
    delete state.navigationId;
    this.avarie = state;
  }

  updateItem(item: Avarie){
    this.router.navigateByUrl("avarie/update",{state:item});
  }
}
