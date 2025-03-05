import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore'; // Modular SDK imports
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private firestore: Firestore) { }

  // Get all sales from Firebase collection
  getSales(): Observable<any[]> {
    const salesCollection = collection(this.firestore, 'sales');
    console.log("Fetching sales data..."); // Debugging
    return collectionData(salesCollection, { idField: 'id' }) as Observable<any[]>;
  }

  // Add a new sale to Firebase and update product quantity in inventory
  async addSale(saleData: any, productId: string): Promise<any> {
    const salesCollection = collection(this.firestore, 'sales');
    const productRef = doc(this.firestore, 'products', productId);
    
    // Get current product details
    const productSnapshot = await getDoc(productRef);
    if (!productSnapshot.exists()) {
      throw new Error('Product not found.');
    }

    const productData = productSnapshot.data();
    const currentQuantity = productData['quantity'];
    const thresholdLimit = productData['threshold']; // Fetch threshold limit

    if (saleData.quantity > currentQuantity) {
      throw new Error("Insufficient stock for sale.");
    }

    const updatedQuantity = currentQuantity - saleData.quantity;

    // Update product stock in Firestore
    await updateDoc(productRef, { quantity: updatedQuantity });

    // Add sale record to Firestore
    await addDoc(salesCollection, saleData);

    // ✅ Check if stock is below threshold, and generate a notification
    if (updatedQuantity <= thresholdLimit) {
      await this.notifyLowStock(productId, productData['productName'], updatedQuantity);
    }
  }

  // Function to add a notification for low stock
  private async notifyLowStock(productId: string, productName: string, remainingStock: number): Promise<void> {
    const notificationsCollection = collection(this.firestore, 'notifications');
    await addDoc(notificationsCollection, {
      message: `⚠️ Low stock alert: ${productName} has only ${remainingStock} left!`,
      productId,
      date: new Date().toISOString(),
      status: 'unread'
    });
    console.log(`Notification added for ${productName} - Remaining stock: ${remainingStock}`);
  }
}