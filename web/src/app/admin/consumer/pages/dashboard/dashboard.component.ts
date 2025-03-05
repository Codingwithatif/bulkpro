import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../../shared/inventory.service';
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
  lowStockProducts: Product[] = [];
  restockQuantities: { [productId: string]: number } = {}; 
  selectedCompanies: { [productId: string]: string } = {}; 
  restockRequests: { [productId: string]: string } = {}; // ✅ Stores request confirmation message
  companies: { id: string; name: string }[] = []; 
  martId: string = ''; // 🔥 Fetch dynamically instead of hardcoding

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.fetchMartId(); // 🔥 Fetch mart ID dynamically
    this.fetchLowStockProducts();
    this.getCompanies(); 
  }

  // ✅ Fetch the mart ID from authentication
  fetchMartId(): void {
    // Assuming you have an auth service, replace this with the actual method
    this.martId = 'FETCH_FROM_AUTH_SERVICE';
  }

  // ✅ Fetch low-stock products
  fetchLowStockProducts(): void {
    this.inventoryService.getInventory().subscribe((products: Product[]) => {
      this.lowStockProducts = products.filter(p => p.quantity <= p.thresholdLimit);
    });
  }

  // ✅ Fetch companies where role === 'company' in the users collection
  getCompanies(): void {
    this.inventoryService.getCompanies().subscribe((companies) => {
      this.companies = companies;
    });
  }

  // ✅ Update restock quantity for a product
  updateRestockQuantity(productId: string, quantity: number): void {
    this.restockQuantities[productId] = quantity;
  }

  // ✅ Update selected company for a product
  updateSelectedCompany(productId: string, companyId: string): void {
    this.selectedCompanies[productId] = companyId;
  }

  // ✅ Send restock request with error handling & confirmation message
  sendRestockRequest(product: Product): void {
    const quantityRequested = this.restockQuantities[product.id] || 0;
    const companyId = this.selectedCompanies[product.id];

    if (!companyId) {
      console.error(`🚨 Error: Please select a company for ${product.productName}.`);
      return;
    }

    if (quantityRequested <= 0) {
      console.error(`🚨 Error: Quantity for ${product.productName} must be greater than 0.`);
      return;
    }

    if (!this.martId) {
      console.error(`🚨 Error: Mart ID is missing!`);
      return;
    }

    const selectedCompany = this.companies.find(c => c.id === companyId);

    this.inventoryService.sendRestockRequest(product, this.martId, companyId, quantityRequested)
      .then(() => {
        this.restockRequests[product.id] = selectedCompany?.name || 'Unknown Company'; // ✅ Show confirmation message

        // ✅ Remove message after 5 seconds
        setTimeout(() => {
          delete this.restockRequests[product.id];
        }, 5000);
      })
      .catch(error => console.error('🚨 Error sending restock request:', error));
  }
}