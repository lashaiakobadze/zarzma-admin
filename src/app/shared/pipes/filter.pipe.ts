import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterData: string): any[] {
    if(!items) return [];
    if(!filterData) return items;
      filterData = filterData.toString().toLowerCase();
      return items.filter( item => {
      return item.title.toLowerCase().includes(filterData);
    });
  }
}

