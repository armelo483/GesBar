import { Daddy } from "./daddyObj";

export class HiddenEntries extends Daddy{

    constructor(
        public id_entry:number = 1,
        public tableName:string = null,
    ){ 
        super();
    }
    

}