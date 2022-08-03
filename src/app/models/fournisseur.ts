import { Daddy } from "./daddyObj";

export class Fournisseur extends Daddy{

    constructor(
        public id: number = null,
        public nom:string = null,
        public adresse:string = null,
        public phone1:string = null,
        public phone2:string = null,
        public collecte_ristourne: boolean = null,
        public visibilite:number = 1,
    ){ 
        super();
    }

}