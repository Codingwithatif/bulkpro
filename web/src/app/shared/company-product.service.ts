import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompanyProductService {
  updateCategory(categoryData: Category) {
    throw new Error('Method not implemented.');
  }
  constructor(private firestore: Firestore) {}

  // Add a new company category
  async addCategory(category: Category): Promise<void> {
    const categoriesCollection = collection(this.firestore, 'company-categories');
    const categoryId = doc(categoriesCollection).id; // Generate a new document ID
    await setDoc(doc(categoriesCollection, categoryId), { ...category, id: categoryId }); // Add category with ID
  }

  // Add a new product to a specific company category
  async addProductToCategory(categoryId: string, productData: Product): Promise<void> {
    const productsCollection = collection(this.firestore, 'company-products');
    const productId = doc(productsCollection).id; // Generate a new document ID
    await setDoc(doc(productsCollection, productId), { ...productData, id: productId, categoryId }); // Add product with category ID
  }

  // Get all company categories
  getCategories(): Observable<Category[]> {
    const categoriesCollection = collection(this.firestore, 'company-categories');
    return collectionData(categoriesCollection, { idField: 'id' }) as Observable<Category[]>; // Include ID field in results
  }

  // Get all products for a specific company category
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    const productsCollection = collection(this.firestore, 'company-products');
    const productsByCategoryQuery = query(productsCollection, where('categoryId', '==', categoryId)); // Query for products by category
    return collectionData(productsByCategoryQuery, { idField: 'id' }) as Observable<Product[]>; // Include ID field in results
  }

  // Delete a company category
  async deleteCategory(categoryId: string): Promise<void> {
    const categoryDoc = doc(this.firestore, 'company-categories', categoryId);
    await deleteDoc(categoryDoc); // Delete the category document
  }

  // Delete a company product
  async deleteProduct(productId: string): Promise<void> {
    try {
      const productDoc = doc(this.firestore, 'company-products', productId);
      await deleteDoc(productDoc); // Delete the product document
      console.log(`Product with ID: ${productId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }
}
