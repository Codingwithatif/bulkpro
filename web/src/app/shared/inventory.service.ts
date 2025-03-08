// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';
// import { Category } from '../models/category.model';
// import { RestockRequest } from '../models/restock-request.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class InventoryService {
//   private products: Product[] = [];
//   private categories: Category[] = [];
//   private restockRequests: RestockRequest[] = [];
//   private companies: { id: string; name: string; role: string }[] = [];

//   constructor() {}

//   // ✅ Fetch all inventory products
//   getInventory(): Product[] {
//     return this.products;
//   }

//   // ✅ Fetch all categories
//   getCategories(): Category[] {
//     return this.categories;
//   }

//   // ✅ Fetch all companies
//   getCompanies(): { id: string; name: string }[] {
//     return this.companies.filter((company) => company.role === 'company');
//   }

//   // ✅ Get a product by its ID
//   getProductById(productId: string): Product | undefined {
//     return this.products.find((product) => product.id === productId);
//   }

//   // ✅ Delete a product
//   deleteProduct(id: string): void {
//     const productIndex = this.products.findIndex((product) => product.id === id);
//     if (productIndex !== -1) {
//       this.products.splice(productIndex, 1);
//       console.log(`✅ Product with ID ${id} deleted successfully.`);
//     } else {
//       console.error(`❌ Product with ID ${id} not found.`);
//     }
//   }

//   // ✅ Update product details
//   updateProduct(product: Product): void {
//     const existingProduct = this.getProductById(product.id);
//     if (existingProduct) {
//       Object.assign(existingProduct, product);
//       console.log(`✅ Product ${product.id} updated successfully.`);
//     } else {
//       console.error(`❌ Error updating product (ID: ${product.id}): Product not found.`);
//     }
//   }

//   // ✅ Fetch Low Stock Products
//   getLowStockProducts(): Product[] {
//     return this.products.filter((p) => p.quantity <= p.thresholdLimit);
//   }

//   // ✅ Fetch All Restock Requests
//   getRestockRequests(): RestockRequest[] {
//     return this.restockRequests;
//   }

//   // ✅ Send Restock Request
//   sendRestockRequest(product: Product, martId: string, companyId: string, quantityRequested: number): void {
//     if (!companyId) {
//       console.error(`❌ Error: No company assigned for ${product.productName}.`);
//       return;
//     }

//     if (quantityRequested <= 0) {
//       console.warn(`⚠️ Invalid quantity (${quantityRequested}) for ${product.productName}. Request not sent.`);
//       return;
//     }

//     const newRequest: RestockRequest = {
//       productId: product.id,
//       productName: product.productName,
//       quantityRequested,
//       status: 'Pending',
//       timestamp: Date.now(),
//       martId,
//       companyId,
//     };

//     this.restockRequests.push(newRequest);
//     console.log(`✅ Restock request sent for ${product.productName} (Qty: ${quantityRequested}) to company ${companyId}`);
//   }

//   // ✅ Update Restock Request Status
//   updateRestockStatus(requestId: string, status: 'Pending' | 'Approved' | 'Delivered'): void {
//     const request = this.restockRequests.find((req) => req.productId === requestId);
//     if (request) {
//       request.status = status;
//       console.log(`✅ Restock request ${requestId} updated to ${status}`);
//     } else {
//       console.error(`❌ Restock request ${requestId} not found.`);
//     }
//   }

//   // ✅ Add a new product
//   createProduct(product: Product): void {
//     this.products.push(product);
//     console.log(`✅ Product ${product.productName} added successfully.`);
//   }

//   // ✅ Add a new category
//   createCategory(category: Category): void {
//     this.categories.push(category);
//     console.log(`✅ Category ${category.name} added successfully.`);
//   }

//   // ✅ Add a new company
//   createCompany(company: { id: string; name: string; role: string }): void {
//     this.companies.push(company);
//     console.log(`✅ Company ${company.name} added successfully.`);
//   }
// }
