import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {

  transform(str1: string): string {
    return str1 + 'Fcfa';
  }

  insert(str, index, value){
    return str.substr(0, index) + value + str.substr(index);
  }

}
