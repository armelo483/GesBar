import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produit } from 'src/app/models/produit';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})

export class ListPageComponent implements OnInit {
  
  @Input() produits: Produit[];
  
  constructor() { 
    
  }

  ngOnInit() {
   
  }

}
