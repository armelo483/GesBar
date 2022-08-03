import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.scss'],
})
export class ShopModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  handleModal(event){
    console.log(event);
    event.stopPropagation();
  }

}
