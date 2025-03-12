import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../models/category.model'; // Import the category model
import { Product } from '../../../../models/product.model'; // Import the product model
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { ProductService } from '../../../../shared/product.service';
import { IUser } from '../../../../models/auth.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  productForm: FormGroup;
  message = '';
  categories: string[] = []; // Array to hold categories for product

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // You can call a method here to load categories or other data if needed
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.message = 'All fields are required!';
      return;
    }

    const product: Product = {
      ...this.productForm.value,
      user: 'company@gmail.com'
    };

    this.productService.createProduct(product).subscribe({
      next: (response: { message: string; }) => {
        this.message = response.message;
        this.productForm.reset(); // Reset form after submission
      },
      error: (err: { error: { message: string; }; }) => {
        this.message = 'Error: ' + err.error.message;
      },
    });
  }
}
