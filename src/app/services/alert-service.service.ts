import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastCtl : ToastController) { }

  showToast(message : string , bg_color : string){
    this.toastCtl.create({
      message : message,
      duration : 2000,
      cssClass : 'toastcss',
      position : "middle",
      color : bg_color
    }).then((toast)=>{
      console.log(toast);
      toast.present();
    })
  }
}
