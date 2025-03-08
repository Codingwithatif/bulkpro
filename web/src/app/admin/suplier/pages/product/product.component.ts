import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompanyProductService } from '../../../../shared/company-product.service'; // Import the service
import { Category } from '../../../../models/category.model'; // Import the category model
import { Product } from '../../../../models/product.model'; // Import the product model
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { ProductService } from '../../../../shared/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product: Product = { name: '', description: '', price: 0, category: '', quantity: 0 }; // Define initial product object
   message = '';
   categories: string[] = []; // Array to hold categories for product
 
   constructor(private productService: ProductService) {}
 
   ngOnInit(): void {
     // You can call a method here to load categories or other data if needed
   }
 
   addProduct() {
     if (!this.product.name || !this.product.price || !this.product.category) {
       this.message = 'All fields are required!';
       return;
     }
 
     this.productService.createProduct(this.product).subscribe({
       next: (response: { message: string; }) => {
         this.message = response.message;
         this.product = { name: '', description: '', price: 0, category: '', quantity: 0 }; // Reset form
       },
       error: (err: { error: { message: string; }; }) => {
         this.message = 'Error: ' + err.error.message;
       },
     });
   }
 }
 