import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/categories'; // Update if needed

  constructor(private http: HttpClient) {}

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, category);
  }

  getCategories(): Observable<Category[]> {
    
    let data: any = localStorage.getItem('user');
    data = data ?  JSON.parse(data) : null;
    
    return this.http.get<Category[]>(`http://localhost:3000/categories/getAllCategories/?user=${data?.email}` );
  }
}
