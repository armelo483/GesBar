import { Daddy } from "./daddyObj";

export class CategorieProduit extends Daddy{

    constructor(
        public id: number = 1,
        public nom:string = null,
        public description:string = null,
        public visibilite:number = 1,
    ){ 
        super();
    }

}