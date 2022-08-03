import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { hidePreloader, showPreloader } from 'src/app/lib/FonctionUsuelle';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  magasin : string = "Logbaba";
  disableAppBar : boolean = false;
  openModal : boolean = false;
  delayInMilliseconds: number = 1;

  constructor(private menuCtrl: MenuController) { }

  ngOnInit() {
    showPreloader();
  }

  ngAfterViewInit(){
    this.animateItem();
  }

  ionViewWillEnter(){
    hidePreloader();
  }

  handleCloseModal(){
    this.openModal = false;
  }
  handleOpenModal(){
    this.openModal = true;
  }


  animateItem() {
    
    var elements = document.getElementsByClassName("stat_item");
    var home_buttons = document.getElementsByClassName("home_button");
    var to_animates = document.getElementsByClassName("to_animate");

    Array.from(to_animates).forEach(to_animate => {
  
      setTimeout(function() {
        to_animate.classList.add("horizontal_fadeIn");
      }, this.delayInMilliseconds);
          
          this.delayInMilliseconds+=190;
      
      });


    //horizontal_fadeIn
    Array.from(elements).forEach(element => {
  
  setTimeout(function() {
    element.classList.add("horizontal_fadeIn");
  }, this.delayInMilliseconds);
      
      this.delayInMilliseconds+=10;
  
                                });
  
   //Vertical fadeIn 
   Array.from(home_buttons).forEach(home_button => {
                                 
  
  
  setTimeout(function() {
    home_button.classList.add("vertical_fadeIn");
  }, this.delayInMilliseconds);
      
      this.delayInMilliseconds+=69;
  
  });

  
  }

  openMenu() {
    this.menuCtrl.open();
  }


}
