import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  
  @Input('magasin') magasin : string;

  // @Output()
  // PercentChange: EventEmitter<number> = new EventEmitter<number>();

  // when handle event, *this.PercentChange.emit(this.PercentComplete);
  
  constructor() { }

  ngOnInit() {}

}
