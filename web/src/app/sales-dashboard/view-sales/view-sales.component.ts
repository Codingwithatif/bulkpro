import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.scss']
})
export class ViewSalesComponent implements OnInit {
  sales: any[] = []; // Array to store sales records
  loading: boolean = false; // Loading indicator
  error: string | null = null; // Error message
  totalDailySales: number = 0; // Total sales for the day
  totalSales: number = 0; // Total sales overall

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  async fetchSales(): Promise<void> {
    this.loading = true; // Start loading
    this.error = null; // Clear previous errors
    this.totalDailySales = 0; // Reset daily sales total
    this.totalSales = 0; // Reset overall sales total

    try {
      const salesCollection = collection(this.firestore, 'sales');
      const querySnapshot = await getDocs(salesCollection);

      const today = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

      this.sales = querySnapshot.docs.map(doc => {
        const data = doc.data() as { productId: string; quantity: number; totalPrice: number; date: string }; // Explicit typing
        const saleDate = data.date ? data.date.split('T')[0] : null;

        this.totalSales += data.totalPrice; // Accumulate total sales

        if (saleDate === today) {
          this.totalDailySales += data.totalPrice; // Accumulate daily sales
        }

        return { id: doc.id, ...data };
      });

      console.log('Sales records fetched:', this.sales);
      console.log('Total daily sales:', this.totalDailySales);
      console.log('Total sales overall:', this.totalSales);
    } catch (error) {
      console.error('Error fetching sales records:', error);
      this.error = 'Failed to fetch sales records. Please try again later.';
    } finally {
      this.loading = false; // Stop loading
    }
  }
}
