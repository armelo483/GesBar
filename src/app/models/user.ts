import { Daddy } from "./daddyObj";

export class User extends Daddy{

    constructor(
        public nom:string = null,
        public prenom:string = null,
        public mail:string = null,
        public adresse:string = null,
        public cni:string = null
    ){ 
        super();
    }

}