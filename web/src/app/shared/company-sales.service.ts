import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanySalesService {

  constructor(private firestore: Firestore) { }

  // Add a new sale to Firebase and update product quantity in inventory
  async addSale(saleData: any, productId: string, currentQuantity: number): Promise<any> {
    const salesCollection = collection(this.firestore, 'company-sales');
    const productRef = doc(this.firestore, 'company-products', productId);

    // Update product quantity after sale
    const updatedQuantity = currentQuantity - saleData.quantity;

    if (updatedQuantity <= 0) {
      // If the quantity is 0 or less, delete the product
      await deleteDoc(productRef);
    } else {
      // Otherwise, just update the quantity
      await updateDoc(productRef, { quantity: updatedQuantity });
    }

    // Add the sale to the sales collection
    return addDoc(salesCollection, saleData);
  }
}
