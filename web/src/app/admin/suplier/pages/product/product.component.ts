import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompanyProductService } from '../../../../shared/company-product.service'; // Import the service
import { Category } from '../../../../models/category.model'; // Import the category model
import { Product } from '../../../../models/product.model'; // Import the product model
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productForm!: FormGroup;
  categories$!: Observable<Category[]>; // Observable for categories

  constructor(
    private fb: FormBuilder,
    private companyProductService: CompanyProductService
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.categories$ = this.companyProductService.getCategories(); // Get categories using the service
  }

  // Initialize the product form
  initProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required]
    });
  }

  // Method to handle product addition
  onAddProduct() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      // Add product to category using the CompanyProductService
      this.companyProductService.addProductToCategory(product.categoryId, product)
        .then(() => {
          console.log('Product added successfully!');
          this.productForm.reset(); // Reset form after adding product
        })
        .catch((error: any) => console.error('Error adding product: ', error));
    } else {
      console.error('Product Form is invalid');
    }
  }

  // Handle form submission
  onSubmit() {
    this.onAddProduct(); // Call the method to add the product
  }
}
