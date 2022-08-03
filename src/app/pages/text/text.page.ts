import { Component, OnInit, ViewChild } from '@angular/core';
import { Master, StorageService } from 'src/app/services/storage.service';
import { Platform,  ToastController } from '@ionic/angular';
import { castObject } from 'src/app/lib/FonctionUsuelle';

@Component({
  selector: 'app-text',
  templateUrl: './text.page.html',
  styleUrls: ['./text.page.scss'],
})
export class TextPage implements OnInit {
  
  items: Array<Master> = [];
  
  newItem : Master;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) { 
    this.plt.ready().then(()=>{
      this.load();
    });
    this.newItem = new Master();
  }

  ngOnInit() {
  }

  load(){
    let item = new Master();
    this.storageService.getItems(item).then((items: Master[]) =>{
      this.items = items;
    })
  }

  addItems(){
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = new Master();
      this.showToast('item added');
      this.load();
    })
  }



  updateItem(elt: Master){

    let item = new Master();

    item = castObject(elt, item);

    console.log(item.constructor.name);
    
    // item.title = `UPDATE: ${item.title}`
    // item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast("item updated");
      this.load();
    });
  }

  deleteItem(elt: Master){

    let item = new Master();
    item = castObject(elt,item);

    this.storageService.deleteItem(item).then(item => {
      this.showToast("item remove");
      this.load();
    });
  }

  async showToast(text:string){
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
