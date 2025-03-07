import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../../models/category.model';
import { Product } from '../../../../models/product.model';
import { InventoryService } from '../../../../shared/inventory.service';

@Component({
  selector: 'app-inventory-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
})
export class InventoryManagementComponent {
  products: Product[] = [];
  categories: Category[] = [];
  loading: boolean = true;
  selectedProductId: string | null = null;
  editForm: FormGroup;

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      barcode: ['', [Validators.required]],
      thresholdLimit: [0, [Validators.required, Validators.min(1)]],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadInventory();
    this.loadCategories();
  }

  loadInventory(): void {
    this.loading = true;
    this.inventoryService.getInventory().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching inventory data', error);
        this.loading = false;
      }
    );
  }

  loadCategories(): void {
    this.inventoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  getCategoryName(categoryId: string | number | undefined): string {
    if (!categoryId) return 'Unknown';
  
    const category = this.categories.find((cat) => String(cat.id) === String(categoryId));
    return category ? category.name : 'Unknown';
  }

  editProduct(product: Product): void {
    this.selectedProductId = product.id || null;
    this.editForm.patchValue({
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      barcode: product.barcode,
      thresholdLimit: product.thresholdLimit,
      categoryId: product.categoryId,
    });
  }

  updateProduct(): void {
    if (this.editForm.invalid || !this.selectedProductId) return;

    const updatedProduct: Product = {
      id: this.selectedProductId,
      ...this.editForm.value,
    };

    this.inventoryService.updateProduct(updatedProduct).then(() => {
      // Update the local list for UI feedback
      const index = this.products.findIndex((p) => p.id === this.selectedProductId);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
      this.selectedProductId = null; // Reset selection
      this.editForm.reset(); // Clear the form
      alert('Product updated successfully!');
    }).catch((error) => {
      console.error('Error updating product', error);
      alert('Failed to update the product!');
    });
  }

  deleteProduct(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this product?')) {
      this.inventoryService.deleteProduct(id).then(() => {
        this.products = this.products.filter((product) => product.id !== id);
      });
    }
  }
}
