
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc, addDoc, getDoc } from '@angular/fire/firestore';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { SaleData } from '../models/sales.model';
import { Observable } from 'rxjs';
import { arrayUnion } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  constructor(private firestore: Firestore) {}

  async addCategory(martId: string, category: Category): Promise<void> {
    const categoriesCollection = collection(this.firestore, `marts/${martId}/categories`);
    const categoryId = doc(categoriesCollection).id;
    await setDoc(doc(categoriesCollection, categoryId), { ...category, id: categoryId, martId });
  }

  async updateCategory(martId: string, categoryId: string, categoryData: Partial<Category>): Promise<void> {
    const categoryDoc = doc(this.firestore, `marts/${martId}/categories/${categoryId}`);
    await updateDoc(categoryDoc, categoryData as { [key: string]: any });
  }

  async deleteCategory(martId: string, categoryId: string): Promise<void> {
    const categoryDoc = doc(this.firestore, `marts/${martId}/categories/${categoryId}`);
    await deleteDoc(categoryDoc);
  }

  getCategories(martId: string): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, `marts/${martId}/categories`);
    return collectionData(categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  async addProductToCategory(martId: string, categoryId: string, productData: Product): Promise<void> {
    const productsCollection = collection(this.firestore, `marts/${martId}/categories/${categoryId}/products`);
    const productId = doc(productsCollection).id;
    await setDoc(doc(productsCollection, productId), { ...productData, id: productId, categoryId, martId });

    const categoryDoc = doc(this.firestore, `marts/${martId}/categories/${categoryId}`);
    await updateDoc(categoryDoc, {
      products: arrayUnion(productId)
    });
  }

  async recordSale(martId: string, categoryId: string, productId: string, productName: string, price: number, quantity: number): Promise<void> {
    const salesCollection = collection(this.firestore, `marts/${martId}/sales`);
    const productRef = doc(this.firestore, `marts/${martId}/categories/${categoryId}/products/${productId}`);

    const productSnapshot = await getDoc(productRef);
    if (!productSnapshot.exists()) {
      throw new Error('🚨 Product not found.');
    }

    const productData = productSnapshot.data();
    const currentQuantity = productData['quantity'] || 0;
    const thresholdLimit = productData['threshold'] || 0;

    if (quantity > currentQuantity) {
      throw new Error('🚨 Insufficient stock for sale.');
    }

    const updatedQuantity = currentQuantity - quantity;
    await updateDoc(productRef, { quantity: updatedQuantity });

    const saleData: SaleData = {
      productId,
      productName,
      quantity,
      totalPrice: price * quantity,
      date: this.getTodayDate(),
      month: this.getCurrentMonth()
    };
    await addDoc(salesCollection, saleData);

    if (updatedQuantity <= thresholdLimit) {
      await this.notifyLowStock(martId, productId, productName, updatedQuantity);
    }
  }

  private async notifyLowStock(martId: string, productId: string, productName: string, remainingStock: number): Promise<void> {
    const notificationsCollection = collection(this.firestore, `marts/${martId}/notifications`);
    await addDoc(notificationsCollection, {
      message: `⚠️ Low stock alert: ${productName} has only ${remainingStock} left!`,
      productId,
      date: new Date().toISOString(),
      status: 'unread'
    });
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getCurrentMonth(): string {
    const today = new Date();
    return `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
  }
}