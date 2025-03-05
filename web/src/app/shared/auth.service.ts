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
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  /**
   * Registers a user with Firebase Authentication and stores additional info in Firestore
   * @param email User's email
   * @param username User's mart/company name (used as username)
   * @param password User's password
   * @param role Role of the user (either "mart" or "company")
   * @returns Observable<void>
   */
  register(
    email: string,
    username: string,
    password: string,
    role: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (response) => {
        // Update the user's profile with the mart/company name
        await updateProfile(response.user, { displayName: username });

        // Use the user's UID as the Document ID
        const userRef = doc(this.firestore, `users/${response.user.uid}`);
        await setDoc(userRef, {
          uid: response.user.uid,
          email: email,
          username: username,
          role: role,
          createdAt: new Date().toISOString(), // Optional: to track when the user was created
        });
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        return Promise.reject(error); // Propagate the error
      });

    return from(promise);
  }

  /**
   * Logs in a user with Firebase Authentication and retrieves their role from Firestore
   * @param email User's email
   * @param password User's password
   * @returns Observable<any> (the user's Firestore data including role)
   */
  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (response) => {
        // Fetch the user's document from Firestore after successful login
        const userRef = doc(this.firestore, `users/${response.user.uid}`);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          return userDoc.data(); // Return the user data (including role)
        } else {
          throw new Error('User data not found in Firestore');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return Promise.reject(error); // Propagate the error
      });

    return from(promise);
  }
}