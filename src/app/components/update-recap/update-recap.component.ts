import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { isThisMinute } from 'date-fns';


// for manage update of all string or number var
const TYPESIMPLE: number = 1;
// for manage update of all Array and Object
const TypeArray = 2;
const TYPEDATE = 3;
const TYPESELECT = 4;

@Component({
  selector: 'app-update-recap',
  templateUrl: './update-recap.component.html',
  styleUrls: ['./update-recap.component.scss'],
})
export class UpdateRecapComponent implements OnInit {

  @Input() value : any; 
  groupObject: any = {};
  variable = '';
  
  modalForm: FormGroup;
  // type of input value
  typeOfValue
  constructor(private modalCtrl: ModalController,
    private formBuilder: FormBuilder) { 
      this.modalForm = this.formBuilder.group({
        recap_variable: new FormControl('toto')
      })
      // this.modalForm  = this.formBuilder.group({
      //   recap_variable: ['Frsss', []],
      // });
    }

  ngOnInit() {
    
    // console.log(this.modalForm.get('recap_variable'));
     // this.depenseForm  = this.formBuilder.group({
    //   nom: [nom, [Validators.required]],
    //   description : [description, []]
    // });
    if (this.value.element == 'num_facture') {
      this.groupObject.variable = [this.value.text];
    }
    this.groupObject.variable = [this.value.text];
    console.log(this.value.element);
    console.log(this.groupObject);
    
    // this.modalForm.get('variable').setValue('teest');
    // this.modalForm  = this.formBuilder.group(this.groupObject);
    // console.log(this.value, this.modalForm);
  }

  // ionViewDidEnter() {
  //   this.modalForm  = this.formBuilder.group({
  //     recap_variable: ['Frsss', []],
  //   });
  // }

  dismiss(){
    this.modalCtrl.dismiss({nom: "Fotso"},'facture');
  }

}
 