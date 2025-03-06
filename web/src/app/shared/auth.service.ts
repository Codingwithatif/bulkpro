import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   *
   */
  constructor(
    private http: HttpClient
  ) {
    
  }

  register(user: any) {
    return this.http.post('http://localhost:3000/user/create', user);
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post('http://localhost:3000/user/login', { email, password });
  // }




  
}