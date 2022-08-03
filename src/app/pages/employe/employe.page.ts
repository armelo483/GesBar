import { Component, OnInit } from '@angular/core';
import { castObject, hidePreloader, showPreloader, showToast } from 'src/app/lib/FonctionUsuelle';
import { ErrorMsg } from 'src/app/lib/globalVar';
import { Employe } from 'src/app/models/employe';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.page.html',
  styleUrls: ['./employe.page.scss'],
})
export class EmployePage implements OnInit {


  allEmployes: Employe[];
  constructor(
    public storageSvc: CrudService
  ) { }

  ngOnInit() {
    showPreloader();
  }

  ionViewWillEnter(){
    hidePreloader();
    this.load();
  }

  load(){
    this.storageSvc.read('employe')
      .then((allEmployes: Employe[]) =>{
        if(allEmployes){
          allEmployes = allEmployes??[];
          this.allEmployes = allEmployes.filter(n => n);
        }  
    },(e)=> {showToast(ErrorMsg.loading)});
  }

  deleteItem(item: Employe){
    // for casting item var to type Casier
    let itemCast = castObject(item,new Employe(null,null, null, null))
    this.storageSvc.delete(itemCast).then((val) =>{
      this.load();
      showToast("Suppression effectuée")
    },(e)=> {showToast(ErrorMsg.delete)})
  }

}
