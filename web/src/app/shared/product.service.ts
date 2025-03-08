import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';  // Import Product model

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products'; // Update with your API URL

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
