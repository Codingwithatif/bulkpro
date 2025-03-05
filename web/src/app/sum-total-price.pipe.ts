import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumTotalPrice'  // The name you will use in your templates
})
export class SumTotalPricePipe implements PipeTransform {
  transform(sales: any[]): number {
    if (!sales || sales.length === 0) {
      return 0;  // Return 0 if there are no sales
    }
    return sales.reduce((acc, sale) => acc + (sale.totalPrice || 0), 0);
  }
}
