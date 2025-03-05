import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, getDoc, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { RestockRequest } from '../models/restock-request.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private firestore: Firestore) {}

  // ✅ Fetch all inventory products
  getInventory(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  // ✅ Fetch all categories
  getCategories(): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, 'categories');
    return collectionData(categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

 // ✅ Fetch all companies from users collection where role is 'company'
getCompanies(): Observable<{
  role: string; id: string; name: string 
}[]> {
  const usersCollection = collection(this.firestore, 'users');
  
  return collectionData(usersCollection, { idField: 'id' }).pipe(
    map((users: any[]) =>
      users
        .filter(user => user.role === 'company') // 🔥 Filter only companies
        .map(user => ({ id: user.id, name: user.name })) // Return only id & name
    )
  );
}

  // ✅ Get a product by its ID
  getProductById(productId: string): Observable<Product> {
    const productDocRef = doc(this.firestore, `products/${productId}`);
    return from(getDoc(productDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Product;
          return { ...data, id: docSnap.id }; // Ensuring no duplicate 'id' field
        } else {
          throw new Error(`❌ Product with ID ${productId} not found.`);
        }
      })
    );
  }

  // ✅ Delete a product
  async deleteProduct(id: string): Promise<void> {
    try {
      const productDocRef = doc(this.firestore, `products/${id}`);
      await deleteDoc(productDocRef);
      console.log(`✅ Product with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error(`❌ Error deleting product (ID: ${id}):`, error);
    }
  }

  // ✅ Update product details
  async updateProduct(product: Product): Promise<void> {
    try {
      const { id, ...productData } = product;
      const productDocRef = doc(this.firestore, `products/${id}`);
      await updateDoc(productDocRef, productData);
      console.log(`✅ Product ${id} updated successfully.`);
    } catch (error) {
      console.error(`❌ Error updating product (ID: ${product.id}):`, error);
    }
  }

  // ✅ Fetch Low Stock Products
  getLowStockProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'products');
    return collectionData(productsCollection, { idField: 'id' }).pipe(
      map((products: Product[]) => products.filter(p => p.quantity <= p.thresholdLimit))
    );
  }

  // ✅ Fetch All Restock Requests
  getRestockRequests(): Observable<RestockRequest[]> {
    const restockRequestsCollection = collection(this.firestore, 'restockRequests');
    return collectionData(restockRequestsCollection, { idField: 'id' }) as Observable<RestockRequest[]>;
  }

  // ✅ Send Restock Request (with proper validation)
  async sendRestockRequest(product: Product, martId: string, companyId: string, quantityRequested: number): Promise<void> {
    try {
      if (!companyId) {
        console.error(`❌ Error: No company assigned for ${product.productName}.`);
        return;
      }

      if (quantityRequested <= 0) {
        console.warn(`⚠️ Invalid quantity (${quantityRequested}) for ${product.productName}. Request not sent.`);
        return;
      }

      const restockRequestCollection = collection(this.firestore, 'restockRequests');
      await addDoc(restockRequestCollection, {
        productId: product.id,
        productName: product.productName,
        quantityRequested,
        status: 'Pending',
        timestamp: Date.now(),
        martId,
        companyId
      });

      console.log(`✅ Restock request sent for ${product.productName} (Qty: ${quantityRequested}) to company ${companyId}`);
    } catch (error) {
      console.error('❌ Error sending restock request:', error);
    }
  }

  // ✅ Update Restock Request Status
  async updateRestockStatus(requestId: string, status: 'Pending' | 'Approved' | 'Delivered'): Promise<void> {
    try {
      const requestDocRef = doc(this.firestore, `restockRequests/${requestId}`);
      await updateDoc(requestDocRef, { status });
      console.log(`✅ Restock request ${requestId} updated to ${status}`);
    } catch (error) {
      console.error('❌ Error updating restock status:', error);
    }
  }
}
