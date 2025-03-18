import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../components/components-with-forms.module';
import { CategoryService } from '../../../shared/category.service';
import { ProductService } from '../../../shared/product.service';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('barcodeCanvas', { static: false }) barcodeCanvas!: ElementRef;

  productForm!: FormGroup;
  categories: any[] = [];
  message = '';
  barcode = '';
isSubmitting: boolean | undefined;

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
      code: ['', Validators.required], // Added product code input
      categoryId: [null, Validators.required],
    });

    this.loadCategories();
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        if (response?.data && Array.isArray(response.data)) {
          this.categories = response.data;
          console.log('Fetched categories:', this.categories);
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

  generateBarcode() {
    const code = this.productForm.get('code')?.value;
    if (code) {
      this.barcode = code; // Store the barcode text
      setTimeout(() => {
        JsBarcode(this.barcodeCanvas.nativeElement, code, {
          format: 'CODE128',
          displayValue: true,
          lineColor: '#000',
          width: 2,
          height: 50,
        });
      });
    }
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
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.message = 'Failed to add product!';
      }
    });
  }
}
