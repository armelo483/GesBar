import { NavigationEnd, NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { Depense } from './../../models/depense';
import { CrudService } from './../../services/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-type-depense',
  templateUrl: './type-depense.page.html',
  styleUrls: ['./type-depense.page.scss'],
})
export class TypeDepensePage implements OnInit {

  depenseForm: FormGroup;
  weAreOnModal = true;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private modalController: ModalController,
    private router: Router
    ) {

      if(this.router.getCurrentNavigation()){
        this.weAreOnModal = (this.router.getCurrentNavigation()
        .previousNavigation
        .finalUrl
        .toString() === '/ligne-depenses');
      }

  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){

    const description = '';
    const nom = '';

    this.depenseForm  = this.formBuilder.group({
      nom: [nom, [Validators.required]],
      description : [description, []]
    });
  }

  ionViewWillEnter(){
    
  }

  dismissOrNotIfModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    if(this.weAreOnModal) {
      this.modalController.dismiss({
        dismissed: true
      });
    }else {
      this.router.navigate(['ligne-depense/add']);
    }

  }

  submitForm() {
    const depense = new Depense(this.depenseForm.value.nom, this.depenseForm.value.description);

    //@todo: A modifier pour mettre des vrais message d'erreur ou de succès et non desconsole logs
    this.crudService.create(depense).then((_v) => {
      if(this.weAreOnModal){
        this.modalController.dismiss({
          dismissed: true
        });
      }

      this.router.navigate(['ligne-depense/add']);
    }, (_e) => {
      console.log(_e);
    });
  }

}
