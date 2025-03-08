import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  private apiUrl = 'http://localhost:3000/categories';// Ensure this matches your backend API base URL

  constructor(private http: HttpClient) {}
  async addCategory(categoryData: Category): Promise<void> {
    try {
      await lastValueFrom(
        this.http.post<void>(`${this.apiUrl}/createCategory`, categoryData).pipe(
          catchError(this.handleError)
        )
      );
      console.log('Category added successfully.');
    } catch (error) {
      this.logError('adding category', error);
    }
  }

  // ✅ Update Category
  async updateCategory(martId: number, categoryId: number, categoryData: Category): Promise<void> {
    try {
      await lastValueFrom(
        this.http.put<void>(`${this.apiUrl}/marts/${martId}/categories/${categoryId}`, categoryData).pipe(
          catchError(this.handleError)
        )
      );
      console.log('Category updated successfully.');
    } catch (error) {
      this.logError('updating category', error);
    }
  }

  // ✅ Delete Category
  async deleteCategory(martId: number, categoryId: number): Promise<void> {
    try {
      await lastValueFrom(
        this.http.delete<void>(`${this.apiUrl}/marts/${martId}/categories/${categoryId}`).pipe(
          catchError(this.handleError)
        )
      );
      console.log('Category deleted successfully.');
    } catch (error) {
      this.logError('deleting category', error);
    }
  }

  // ✅ Get All Categories for a Mart
  getCategories(martId: number): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/marts/${martId}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Add Product to a Specific Category
  async addProductToCategory(martId: number, categoryId: number, product: Product): Promise<void> {
    try {
      await lastValueFrom(
        this.http.post<void>(`${this.apiUrl}/marts/${martId}/categories/${categoryId}/products`, product).pipe(
          catchError(this.handleError)
        )
      );
      console.log('Product added to category successfully.');
    } catch (error) {
      this.logError('adding product to category', error);
    }
  }

  // 🔹 Global Error Handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Something went wrong!'));
  }

  // 🔹 Log Errors for Debugging
  private logError(action: string, error: any): void {
    console.error(`Error ${action}:`, error?.message || error);
  }
}
