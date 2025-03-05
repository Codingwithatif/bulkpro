import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, doc, updateDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentsWithFormsModule } from '../../../../components/components-with-forms.module';
import { CompanySalesService } from '../../../../shared/company-sales.service'; // Import the updated CompanySalesService
import { CompanyProductService } from '../../../../shared/company-product.service'; // Import CompanyProductService
import { CompanySale } from '../../../../models/company-sales.model';


@Component({
  selector: 'app-sell-products',
  standalone: true,
  imports: [ComponentsWithFormsModule],
  templateUrl: './sell-products.component.html',
  styleUrls: ['./sell-products.component.scss']
})
export class SellProductsComponent implements OnInit {
  sellForm: FormGroup;
  products: any[] = [];
  selectedProduct: any;
  totalPrice: number = 0;

  // Inject the services
  private companySalesService = inject(CompanySalesService);
  private companyProductService = inject(CompanyProductService);

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) {
    this.sellForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      deliveryLocation: ['', Validators.required],
      totalPrice: [{ value: 0, disabled: true }, Validators.required]
    });
  }

  // Fetch products when the component is initialized
  ngOnInit(): void {
    this.loadProducts();
  }

  // Fetch products from Firestore
  async loadProducts() {
    try {
      const productCollection = collection(this.firestore, 'company-products');
      const productSnapshot = await getDocs(productCollection);
      this.products = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (this.products.length === 0) {
        alert('No products available.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products from Firestore.');
    }
  }

  // Update selected product details when a product is chosen
  onProductChange(productId: string) {
    this.selectedProduct = this.products.find(p => p.id === productId);
    if (this.selectedProduct) {
      this.updateTotalPrice();
    }
  }

  // Update the total price based on selected product and quantity
  onQuantityChange() {
    this.updateTotalPrice();
  }

  // Calculate the total price based on quantity and product price
  updateTotalPrice() {
    const quantity = this.sellForm.get('quantity')?.value;
    if (this.selectedProduct && quantity) {
      this.totalPrice = this.selectedProduct.price * quantity;
      this.sellForm.patchValue({ totalPrice: this.totalPrice });
    }
  }

  // Handle the product sale logic
  async sellProduct() {
    if (this.sellForm.valid) {
      const { productId, quantity, deliveryLocation } = this.sellForm.value;

      // Get the product data to check stock
      const productRef = doc(this.firestore, `company-products/${productId}`);
      const productSnapshot = await getDoc(productRef);

      if (!productSnapshot.exists()) {
        alert('Product not found!');
        return;
      }

      const productData = productSnapshot.data();
      const currentQuantity = productData ? Number(productData['quantity']) : 0; // Ensure quantity is a number

      console.log('Current Quantity:', currentQuantity); // Log the quantity to ensure it's correct

      if (currentQuantity === undefined || currentQuantity < quantity) {
        alert('Not enough quantity available!');
        return;
      }

      const saleData: CompanySale = {
        productId,
        quantity,
        totalPrice: this.totalPrice,
        deliveryLocation
      };

      try {
        // Add the sale using CompanySalesService and update product quantity
        await this.companySalesService.addSale(saleData, productId, currentQuantity);

        alert('Product sold successfully!');
        this.sellForm.reset();
        this.loadProducts(); // Refresh product list to reflect quantity change

      } catch (error) {
        console.error('Error processing sale:', error);
        alert('Error processing sale!');
      }
    }
  }
}
