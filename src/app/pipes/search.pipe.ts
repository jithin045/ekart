import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], key: any): any {
    if (!products) return []
    if (!key) return products

    key = key.toLowerCase().trim()
    products = products.filter((item: any) => item.title.toLowerCase().trim().includes(key))
    return products
  }

}
