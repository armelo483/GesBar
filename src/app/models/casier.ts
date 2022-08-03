import { Daddy } from "./daddyObj";

export class Casier extends Daddy{

    constructor(
        public id: number = 1,
        public nbreBtleParCasier:number = 0, // number of bottle per locker
        public nom:string = null,
        public description:string = null,
        public visibilite:number = 1,
    ){ 
        super();
    }

}