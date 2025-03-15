import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { CategoryService } from '../../../shared/category.service';
import { ProductService } from '../../../shared/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  categories: any[] = [];
  message = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(1)]],
      quantity: [null, [Validators.required, Validators.min(1)]],
      thresholdLimit: [null, [Validators.required, Validators.min(1)]],
      barcode: [{ value: this.generateBarcode(), disabled: true }],
      categoryId: [null, Validators.required],
    });

    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        console.log('Fetched categories:', response); // Debugging
  
        // Ensure we extract categories from the `data` field
        if (response?.data && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.error('Unexpected category response format:', response);
          this.message = 'Error loading categories!';
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.message = 'Failed to load categories!';
      }
    });
  }
  
  

  addProduct() {
    if (this.productForm.invalid) {
      this.message = 'Please fill in all required fields!';
      return;
    }

    const productData = this.productForm.getRawValue();

    console.log('Submitting Product:', productData);

    this.productService.createProduct(productData).subscribe({
      next: (response) => {
        console.log('Product added:', response);
        this.message = 'Product added successfully!';
        this.productForm.reset();
        this.productForm.patchValue({ barcode: this.generateBarcode() }); // Reset barcode
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.message = 'Failed to add product!';
      }
    });
  }

  private generateBarcode(): string {
    return 'BC' + Math.floor(Math.random() * 1000000).toString();
  }
}
