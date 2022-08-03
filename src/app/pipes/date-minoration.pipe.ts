import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateMinoration'
})
export class DateMinorationPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
