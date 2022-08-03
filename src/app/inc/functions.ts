export function notEmpty(val:string | number):number{

    if( typeof val == "number"){
        return val ? val : 0;
    }
    return val ? parseInt(val, 10) : 0;

}