import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import JsBarcode from 'jsbarcode';
import { Category } from '../../../../../models/category.model';
import { Product } from '../../../../../models/product.model';
import { CategoryProductService } from '../../../../../shared/category-product.service';
import { ComponentsWithFormsModule } from '../../../../../components/components-with-forms.module';

@Component({
  selector: 'app-add-product',
  standalone: true,
   imports: [ComponentsWithFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  productForm!: FormGroup;
  categories$!: Observable<Category[]>;
  martId = 'your-mart-id'; // Replace with dynamic mart ID

  constructor(
    private fb: FormBuilder,
    private categoryProductService: CategoryProductService
  ) {}

  ngOnInit(): void {
    this.initProductForm();
    this.categories$ = this.categoryProductService.getCategories(this.martId);
  }

  initProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      thresholdLimit: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      quantity: ['', [Validators.required]],
      barcode: [''] // Barcode is optional initially
    });
  }

  generateBarcode() {
    const barcodeValue = this.productForm.get('productName')?.value; // Generate barcode based on product name
    if (barcodeValue) {
      this.productForm.patchValue({ barcode: barcodeValue });
      JsBarcode('#barcode', barcodeValue, {
        format: 'CODE128',
        width: 2,
        height: 100,
        displayValue: true
      });
    } else {
      console.error('Please enter a product name before generating the barcode.');
    }
  }

  async onAddProduct() {
    if (this.productForm.valid) {
      const product: Product = { ...this.productForm.value };
      
      try {
        await this.categoryProductService.addProductToCategory(this.martId, product.categoryId, product);
        console.log('✅ Product added successfully!');
        this.productForm.reset();
      } catch (error) {
        console.error('❌ Error adding product:', error);
      }
    } else {
      console.error('❌ Product Form is invalid');
    }
  }

  onSubmit() {
    this.onAddProduct();
  }
}
