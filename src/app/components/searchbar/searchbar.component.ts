import { CrudService } from 'src/app/services/crud.service';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Produit } from 'src/app/models/produit';
// import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  
  @Input() placeholder: string;
  @Input() isOpen: boolean; 
  @Output() searchEvent: EventEmitter<string|boolean> = new EventEmitter<string|boolean>(); 


  constructor(
    public crudSvc: CrudService
  ) { }

  private keyPressed(f:string){
    this.searchEvent.emit(f);
  }

  private toogleSearchView(f){
    console.log(this.isOpen);

    this.isOpen = !this.isOpen;
    this.searchEvent.emit(!this.isOpen);
    console.log("in toogleView searchbar function");
    f.value = "";
    this.searchEvent.emit(f.value);

    console.log(this.isOpen);
  }

  ngOnInit() {}

}
