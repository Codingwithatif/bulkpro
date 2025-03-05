import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, updateDoc, addDoc } from '@angular/fire/firestore';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class SellProductComponent implements OnInit {
  barcodeValue: string = '';
  result: string | null = null;
  codeReader: BrowserMultiFormatReader;
  loading: boolean = false;
  isScanning: boolean = false; // Scanning lock to avoid multiple triggers

  constructor(private firestore: Firestore) {
    this.codeReader = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {
    this.startScanning();
  }

  startScanning(): void {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          this.codeReader.decodeFromVideoDevice(videoDevices[0].deviceId, 'video', async (result, err) => {
            if (result && !this.isScanning) {
              this.isScanning = true;
              this.result = result.getText().trim();
              console.log('Scanned result:', this.result);

              if (this.result) {
                this.loading = true;
                await this.fetchProductData(this.result);
                this.codeReader.reset();
              }

              // Unlock scanner after a short delay
              setTimeout(() => (this.isScanning = false), 1000);
            }
            if (err && !(err instanceof NotFoundException)) {
              console.error('Error during barcode scanning:', err);
            }
          });
        } else {
          console.error('No video devices found.');
          this.result = 'No video devices found.';
        }
      })
      .catch(err => {
        console.error('Error accessing media devices:', err);
        this.result = 'Error accessing media devices.';
      });
  }

  async fetchProductData(barcode: string): Promise<void> {
    try {
      const productsCollection = collection(this.firestore, 'products');
      const q = query(productsCollection, where('barcode', '==', barcode));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No matching products found.');
        this.result = 'No matching products found.';
        return;
      }

      const docSnap = querySnapshot.docs[0];
      const productData = docSnap.data();
      const productId = docSnap.id;

      if (productData['quantity'] > 0) {
        await this.sellProduct(productId, productData['quantity'], productData['price']);
      } else {
        this.result = 'Product is out of stock.';
        console.log('Product is out of stock.');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
      this.result = 'Error fetching product data.';
    } finally {
      this.loading = false; // Ensure loading is reset
    }
  }

  async sellProduct(productId: string, currentQuantity: number, price: number): Promise<void> {
    const updatedQuantity = currentQuantity - 1;
    const productRef = doc(this.firestore, 'products', productId);
    const salesRef = collection(this.firestore, 'sales');

    try {
      if (updatedQuantity >= 0) {
        // Update product quantity
        await updateDoc(productRef, { quantity: updatedQuantity });

        // Record the sale in the 'sales' collection
        const saleData = {
          productId,
          quantity: 1, // Selling one product at a time
          totalPrice: price,
          date: new Date().toISOString(),
        };
        await addDoc(salesRef, saleData);

        this.result = `Product sold. New quantity: ${updatedQuantity}`;
        console.log('Product sold successfully. New quantity:', updatedQuantity);
      } else {
        this.result = 'Product is out of stock.';
        console.log('Product is out of stock.');
      }
    } catch (error) {
      console.error('Error updating product quantity or recording sale:', error);
      this.result = 'Error updating product or recording sale.';
    }
  }

  resetScanner(): void {
    this.result = null;
    this.startScanning(); // Restart scanning process
  }
}
