import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigneDepense } from 'src/app/models/ligne_depense';

@Component({
  selector: 'app-view-depense',
  templateUrl: './view-depense.page.html',
  styleUrls: ['./view-depense.page.scss'],
})
export class ViewDepensePage implements OnInit {

  ligneDepense: LigneDepense;
  constructor(
    private router: Router) { }

  ngOnInit() {
    let state = history.state;
    delete state.navigationId;
    this.ligneDepense = state;
  }

  updateItem(item: LigneDepense){
    this.router.navigateByUrl("ligne-depense/update",{state:item});
  }
}
