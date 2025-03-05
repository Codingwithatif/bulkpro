import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SalesService } from '../../../../shared/sales.service';
import { InventoryService } from '../../../../shared/inventory.service';

@Component({
  selector: 'app-sales-tracking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-tracking.component.html',
  styleUrls: ['./sales-tracking.component.scss']
})
export class SalesTrackingComponent implements OnInit {
  sales$: Observable<any[]> | undefined;
  sales: any[] = [];
  totalsoldProduct: number = 0;
  totalRevenue: number = 0;

  constructor(private salesService: SalesService, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.sales$ = this.salesService.getSales().pipe(
      switchMap(salesData => {
        console.log('Raw sales data from Firestore:', salesData); // Debugging
        const salesWithDetails = salesData.map(sale =>
          this.inventoryService.getProductById(sale.productId).pipe(
            map(product => ({
              ...sale,
              productName: product.productName || 'Unknown',
              price: product.price || 0
            }))
          )
        );
        return forkJoin(salesWithDetails);
      }),
      map(salesWithDetails => {
        this.sales = salesWithDetails;
        console.log('Processed sales with product details:', this.sales); // Debugging
        this.countSoldProducts();
        this.calculateTotalRevenue();
        return this.sales;
      })
    );
  }

  countSoldProducts(): void {
    this.totalsoldProduct = this.sales.reduce((acc, sale) => acc + (sale.quantity || 0), 0);
    console.log('Total sold products:', this.totalsoldProduct); // Debugging
  }

  calculateTotalRevenue(): void {
    this.totalRevenue = this.sales.reduce(
      (acc, sale) => acc + (sale.price || 0) * (sale.quantity || 0),
      0
    );
    console.log('Total revenue:', this.totalRevenue); // Debugging
  }
}
