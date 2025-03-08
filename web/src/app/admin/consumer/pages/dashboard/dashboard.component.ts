import { Component, OnInit } from '@angular/core';

import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { Product } from '../../../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ComponentsWithFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  lowStockProducts: Product[] = [];
  restockQuantities: { [productId: string]: number } = {}; 
  selectedCompanies: { [productId: string]: string } = {}; 
  restockRequests: { [productId: string]: string } = {}; // ✅ Stores request confirmation message
  companies: { id: string; name: string }[] = []; 
  martId: string = ''; // 🔥 Fetch dynamically instead of hardcoding



  // ✅ Fetch the mart ID from authentication
  fetchMartId(): void {
    // Assuming you have an auth service, replace this with the actual method
    this.martId = 'FETCH_FROM_AUTH_SERVICE';
  }


}