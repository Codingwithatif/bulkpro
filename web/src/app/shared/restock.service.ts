// import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';

// export interface RestockRequest {
//   id?: string; // Auto-generated
//   martId: string;
//   productId: string;
//   productName: string;
//   quantityRequested: number;
//   status: 'Pending' | 'Approved' | 'Delivered';
//   companyId: string;
//   timestamp: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class RestockService {
//   private restockCollection = this.firestore.collection<RestockRequest>('restockRequests');

//   constructor(private firestore: AngularFirestore) {}

//   /** ✅ Add a new restock request */
//   requestRestock(request: RestockRequest): Promise<void> {
//     const id = this.firestore.createId(); // Generate unique Firestore ID
//     return this.restockCollection.doc(id).set({ ...request, id });
//   }

//   /** ✅ Get all pending restock requests */
//   getPendingRequests(): Observable<RestockRequest[]> {
//     return this.firestore
//       .collection<RestockRequest>('restockRequests', ref => ref.where('status', '==', 'Pending'))
//       .valueChanges();
//   }

//   /** ✅ Update restock request status */
//   updateRestockStatus(requestId: string, status: 'Approved' | 'Delivered'): Promise<void> {
//     return this.restockCollection.doc(requestId).update({ status });
//   }
// }
