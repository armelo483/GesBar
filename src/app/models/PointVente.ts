import { Daddy } from "./daddyObj";

export class PointVente extends Daddy{

    constructor(
        public id: number = 1,
        public nom:string,
        public description:string,
        public adresse:string,
        public visibilite:number = 1,
    ){ 
        super();
    }

}