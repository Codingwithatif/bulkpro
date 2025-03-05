import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs'; // Added `from` import
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyInventoryService {
  constructor(private firestore: Firestore) {}

  // Get all products in the company-products collection
  getInventory(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'company-products');
    return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  // Get all categories in the company-categories collection
  getCategories(): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, 'company-categories');
    return collectionData(categoriesCollection, { idField: 'id' }) as Observable<Category[]>;
  }

  // Delete a product by its ID from the company-products collection
  deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(this.firestore, `company-products/${id}`);
    return deleteDoc(productDocRef);
  }

  // Update an existing product in the company-products collection
  updateProduct(product: Product): Promise<void> {
    const productDocRef = doc(this.firestore, `company-products/${product.id}`);
    return updateDoc(productDocRef, { ...product });
  }

  // Get a single product by ID from the company-products collection
  getProductById(productId: string): Observable<Product> {
    const productDocRef = doc(this.firestore, `company-products/${productId}`);
    return from(getDoc(productDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        return docSnap.data() as Product;
      } else {
        throw new Error('Product not found');
      }
    }));
  }

  // Add a new category to the company-categories collection
  async addCategory(category: Category): Promise<void> {
    const categoriesCollection = collection(this.firestore, 'company-categories');
    const categoryId = doc(categoriesCollection).id; // Generate a new document ID
    await updateDoc(doc(categoriesCollection, categoryId), { ...category, id: categoryId });
  }

  // Add a new product to the company-products collection under a specific category
  async addProductToCategory(categoryId: string, productData: Product): Promise<void> {
    const productsCollection = collection(this.firestore, 'company-products');
    const productId = doc(productsCollection).id; // Generate a new document ID
    await updateDoc(doc(productsCollection, productId), { ...productData, id: productId, categoryId });
  }
}
