import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth'; 
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

// Firebase configuration details
const firebaseConfig = {
  apiKey: 'AIzaSyB2iyF--dJfjj9_if8rcJZH3ylKA4XeIPg',
  authDomain: 'web-bulkpro.firebaseapp.com',
  projectId: 'web-bulkpro',
  storageBucket: 'web-bulkpro.appspot.com',
  messagingSenderId: '1089457189565',
  appId: '1:1089457189565:web:fef546977b6004c00bbdd4',
  measurementId: 'G-JJBH69YLZZ',
};

// App configuration with necessary providers
export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient() ,
    provideRouter(routes), // Route provider
    provideHttpClient(),   // HttpClient provider

    // Firebase app initialization and Firebase services providers
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()), // Correct Firestore provider
  ],
};
