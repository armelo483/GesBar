import { Daddy } from "./daddyObj";

export class Employe extends Daddy{

    constructor(
        public id: number = 1,
        public nom: Employe = null,
        public adresse:string = null,
        public phone1:string = null,
        public phone2:string = null,
        public cni: boolean = null,
        public photo:number = 1,
    ){ 
        super();
    }

}

