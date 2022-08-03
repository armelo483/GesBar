import { Daddy } from "./daddyObj";

export class Env extends Daddy{

    constructor(
        public id: number = null,
        // variable utilisé pour sauvegarder la derniere date de ristourne
        public last_ristourne_date: number = null, // valeur Thu Jan 06 2022 14:03:25 GMT+0100 (heure normale d’Afrique de l’Ouest)
    ){ 
        super();
    }

}