import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch',
  standalone: true
})
export class FilterSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return (
        item.fecha.toLowerCase().includes(searchText) ||
        item.fuente.toLowerCase().includes(searchText) ||
        item.articulo.toLowerCase().includes(searchText) ||
        item.minimo.toString().includes(searchText) ||
        item.maximo.toString().includes(searchText) ||
        item.promedio.toString().includes(searchText)
      );
    });
  }
}
