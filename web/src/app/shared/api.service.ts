import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "mart" | "company";
}

interface Category {
  name: string;
  description?: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    email: string;
    role: "mart" | "company";
  };
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private readonly baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user
   * @param user - User data object
   * @returns Observable with server response
   */
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in a user
   * @param email - User email
   * @param password - User password
   * @returns Observable with login response
   */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Adds a new category
   * @param category - Category data object
   * @returns Observable with server response
   */
  addCategory(category: Category): Observable<any> {
    return this.http.post(`${this.baseUrl}/marts/categories`, category).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors
   * @param error - The error response object
   * @returns Observable throwing an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = "An unknown error occurred!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      if (error.status === 401) {
        errorMessage = "Unauthorized: Invalid email or password.";
      } else if (error.status === 403) {
        errorMessage = "Forbidden: You do not have access.";
      } else if (error.status === 500) {
        errorMessage = "Server Error: Please try again later.";
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
