import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, DocumentData, Query } from '@angular/fire/firestore';

interface SaleData {
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string; 
  month: string; 
}

@Component({
  selector: 'app-daily-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-reports.component.html',
  styleUrls: ['./daily-reports.component.scss'],
})
export class DailyReportsComponent implements OnInit {
  salesData: SaleData[] = [];
  isLoading = true;
  viewType: 'daily' | 'monthly' = 'daily'; // Current view type
  totalSales = 0; // Total sales amount for the selected view

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.loadSalesData();
  }

  // Load sales data based on the selected view type
  async loadSalesData(): Promise<void> {
    this.isLoading = true;
    this.salesData = [];

    try {
      const queryRef =
        this.viewType === 'daily'
          ? query(collection(this.firestore, 'sales'), where('date', '==', this.getTodayDate()))
          : query(collection(this.firestore, 'sales'), where('month', '==', this.getCurrentMonth()));

      this.salesData = await this.fetchSales(queryRef);
      this.calculateTotalSales();
    } catch (error) {
      console.error('Error loading sales data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Fetch sales data using the provided query
  private async fetchSales(query: Query<DocumentData>): Promise<SaleData[]> {
    const sales: SaleData[] = [];
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as SaleData;
      sales.push(data);
    });
    return sales;
  }

  // Calculate total sales for the current view
  private calculateTotalSales(): void {
    this.totalSales = this.salesData.reduce((sum, sale) => sum + sale.totalPrice, 0);
  }

  // Get today's date in 'yyyy-mm-dd' format
  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Get the current month in 'yyyy-mm' format
  private getCurrentMonth(): string {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  // Toggle between daily and monthly views and reload data
  toggleView(type: 'daily' | 'monthly'): void {
    if (this.viewType !== type) {
      this.viewType = type;
      this.loadSalesData();
    }
  }
}
