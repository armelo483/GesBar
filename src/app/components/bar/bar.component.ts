import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit {
  @Input() DisableAppBar: Boolean;


  bar = ["TKC bar","les maltes"];
  constructor(
    public alertController: AlertController
  ) { }

  ngOnInit() {

  }

  getLocalStorageBar(){
    let bar = window.localStorage.getItem('bar');
    console.log(bar)
  }

  openModal(list) {
    console.log(list);
    list.click();
  }

  buildInput(){
    var input = ["les angés","combo 128 $é"];
    let output = [];
    input.forEach(element => {
        output.push({
          type: 'radio',
          label: element,
          value: element,
          checked: false,
          handler: (cl)=>{
            console.log(cl)
          }
        })
    });
    return output;
  }

}
