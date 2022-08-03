import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isThisMinute } from 'date-fns';


// for manage update of all string or number var
const TYPESIMPLE: number = 1;
// for manage update of all Array and Object
const TypeArray = 2;
@Component({
  selector: 'app-update-recap',
  templateUrl: './update-recap.component.html',
  styleUrls: ['./update-recap.component.scss'],
})
export class UpdateRecapComponent implements OnInit {

  @Input() value : any; 

  // type of input value
  typeOfValue
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    
    this.typeOfValue = this.value.type;
    console.log(TYPESIMPLE);
  }

  dismiss(){
    this.modalCtrl.dismiss({nom: "Fotso"},'facture');
  }

}
