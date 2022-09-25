import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return '';

    const limit = args || 10;
    return (value.length <= limit) ? value : value.substr(0, limit) + '...';
  }
}
