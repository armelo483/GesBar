
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { format } from "date-fns";
import { ErrorMsg } from "./globalVar";

/*
* for displaying alert message
* @params text: string message to display
*/
// Message par defaut pour les erreurs avant soumission
export async function showToast(text:string = "Il y a eu des erreurs lors du remplissage, veuillez les résoudre svp "){
  let toastController = new ToastController();
  const toast = await toastController.create({
    message: text,
    duration: 2000,
    mode: 'ios',
    position: 'top',
    cssClass: 'white-background'
  });
  toast.present();
}

export function asc(arr: [], prop:string){
  if(arr.length != 0 && arr != undefined){
    return arr.sort((a,b) => {
      if( prop in a){
        return b[prop] - a[prop]
      }
      console.log(prop + "n'est pas une propriété du tableau")
    });
  }else{
    return [];
  }
}
export function desc(arr: [], prop:string){
  if(arr.length != 0 && arr != undefined){
    return arr.sort((a,b) => {
      if( prop in a){
        return  a[prop] - b[prop];
      }
      console.log(prop + "n'est pas une propriété du tableau")
    });
  }else{
    return [];
  }
}

export function compareDate(date1: number, operateur: '==' | '<' | '>' | '<=' | '>=', date2: number): boolean | string{

  if( isNaN(date1) || isNaN(date2) ){ return 'error'}
  switch(operateur){
    case '==': return date1 == date2; break;
    case '<': return date1 < date2; break;
    case '>': return date1 > date2; break;
    case '<=': return date1 <= date2; break;
    case '>=': return date1 >= date2; break;
    default: return 'error'
  }

}

/*
*
*
*For converting Date to timesTamp
*
*
*/

export function toTimeStamp(date: string, ignoreSecondHour = true){
  //On ignore les heures, on convertit juste les jours en secondes
  let dateObject =  (new Date(date));
  let timeStampDate = dateObject.getTime();
  if (ignoreSecondHour){
    timeStampDate = dateObject.setHours(0,0,0,0)
  }
  return timeStampDate;
}

/*
*
* for getting activated route
* @url The argument of url to get
* @activatedRoute: ActivatedRoute The instance of activated route
*/
export function getUrlParams(url:string, activatedRoute: ActivatedRoute){
    return activatedRoute.snapshot.paramMap.get(url)
}

/*
*
* for casting object
* @in_obj: any The argument of url to get
* @out_obj: any The instance of activated route
* @return: any
*
*/
export function castObject(in_obj:any, out_obj: any){
  for(let i in in_obj){
    out_obj[i] = in_obj[i];
  }
  return out_obj;
}



export function generateRefFromId(idOfElement:number,prefix:string):string{

    let upperPrefix = prefix.toUpperCase();
    let id = idOfElement+1;
    let ref:string;

    if(id < 10){
        ref = upperPrefix + "00000"+id;
    }else if(id < 100){
        ref = upperPrefix + "0000"+id;
    }else if(id < 1000){
        ref = upperPrefix + "000"+id;
    }else if(id < 10000){
        ref = upperPrefix + "00"+id;
    }else if(id < 100000){
        ref = upperPrefix + "0"+id;
    }else if(id < 1000000){
        ref = upperPrefix +id;
    }else{
        ref = upperPrefix + new Date().getTime();
    }
    return ref;
}


export function markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

    return formGroup.valid;
  }

  export async function presentModal(modalCtrl, pageInstance, args: Object | false = false){
  const modal = await modalCtrl.create({
    component: pageInstance,
    mode: 'ios',
    cssClass: 'my-custom-class',
    arguments: args,
    canDismiss: true,
    initialBreakpoint: 0.8,
    breakpoints: [0, 0.8, 1]
  });

  await modal.present();
  return modal;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function unFormatPrice(price: any){
  price = price.toString();
  return parseInt(price.replace(/[\D]+/g, '').trim(), 10);
}


  export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    let string_date = date.toString().padStart(2, '0');
    var time =  year+ '-' + month + '-' + string_date ;
    return time;
  }

  export function initializeErrorMessages(errorMessages: {}){

    Object.keys(errorMessages).forEach(element => {

      errorMessages[`${element}`].forEach(element2 => {

        var type = element2.type;console.log(ErrorMsg);
        if (ErrorMsg[type])
          element2.message += ErrorMsg[type];
      });

    });

  }

  export function showPreloader(){
    var $preloader = document.getElementById("preloader");

    if(typeof($preloader) != 'undefined' && $preloader != null){
      $preloader.style.display = "block";
    }
  }

  export function hidePreloader(){

    setTimeout(_hidePreloader, 600);

  }

  function _hidePreloader(){
    var $preloader = document.getElementById("preloader");

    if(typeof($preloader) != 'undefined' && $preloader != null){
      $preloader.style.display = "none";
    }
  }

  export function toDisplayDate(date:string | number | Date): string{
    let returnValue: string = null;
    console.log(typeof date);
    
    if( typeof date == 'string'){
      returnValue = format(new Date(date).getTime(), 'dd/MM/yy');
    }

    if( typeof date == 'number'){
      returnValue = format(date, 'dd/MM/yy');
    }
    return returnValue;
  }

  // cette fonction est utilisée pour convertir les timestamps en format de date pour les composant <ion-datime>
  export function convertForDateTime(date: number){
    return format(date, 'yyyy-MM-dd');
  }


  // export function createGestureDetector(className) {
  //   const gesture = createGesture({
  //     el: document.querySelector('.rectangle'),
  //     onMove: (detail) => { onMove(detail); }
  //   })
  // }
