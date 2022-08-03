import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skipempty'
})
export class SkipemptyPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    
    return (value) ? value.filter(item => (item.id != undefined && item.id !=null && item.id!=false)):null;
  }

}
