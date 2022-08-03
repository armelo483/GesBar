import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: string): string {

    let tab = value.split('/');
    if(tab.length != 3) { return null}
    tab = tab.reverse();
    let returnValue : string = tab.join('-')
    return returnValue;
  }

}
