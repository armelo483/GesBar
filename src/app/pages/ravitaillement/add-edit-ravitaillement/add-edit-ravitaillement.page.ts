import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UpdateRecapComponent } from 'src/app/components/update-recap/update-recap.component';
import { Ravitaillement } from 'src/app/models/ravitaillement';
import { CrudService } from 'src/app/services/crud.service';
import { RavitaillementService } from 'src/app/services/ravitaillement.service';

@Component({
  selector: 'app-add-edit-ravitaillement',
  templateUrl: './add-edit-ravitaillement.page.html',
  styleUrls: ['./add-edit-ravitaillement.page.scss'],
})
export class AddEditRavitaillementPage implements OnInit {

  recapitulatifForm: FormGroup;
  ravitaillement: Ravitaillement;
  selectedDate: String;

  constructor(
    private ravitaillementSvc: RavitaillementService,
    public modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {
    
   }

  ngOnInit() {

    this.ravitaillement = window.history.state.customData;
    this.selectedDate = new Date(this.ravitaillement.date).toISOString();
    // this.init();
    
  }

}
