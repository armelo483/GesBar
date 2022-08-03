import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMajoration'
})
export class DateMajorationPipe implements PipeTransform {

  transform(value: string): string {
    let temps = new Date('06/01/2022').getTime() + 604800 * 1000;
    return null;
  }

}
